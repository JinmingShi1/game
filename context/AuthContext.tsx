import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logIn, registerUser} from '../utils/api';
import User from '../types/User';

interface AuthContextType {
  isLoading: boolean;
  userToken: string;
  register: (userData: User) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const defaultValue: AuthContextType = {
  isLoading: false,
  userToken: '',
  login: () => {},
  logout: () => {},
  register: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export function AuthProvider({children}: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('');

  const register = (params: any) => {
    setIsLoading(true);
    registerUser(params)
      .then((res: any) => {
        const token = res.data.token;
        setUserToken(token);
        AsyncStorage.setItem('userToken', token);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        Alert.alert(JSON.stringify(err));
      });
  };

  const login = (params: any) => {
    logIn(params)
      .then((res: any) => {
        const token = res.data.token;
        console.log('token', token);
        setUserToken(token);
        AsyncStorage.setItem('userToken', token);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log('err', err);
        setIsLoading(false);
        Alert.alert(JSON.stringify(err));
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken('');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let tmpUserToken = await AsyncStorage.getItem('userToken');
      if (tmpUserToken) {
        setUserToken(tmpUserToken);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn err ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{register, login, logout, isLoading, userToken}}>
      {children}
    </AuthContext.Provider>
  );
};
