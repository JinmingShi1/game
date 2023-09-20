import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {AuthContext} from '../context/AuthContext';
import Game from '../app/game/index';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  console.log('userToken', userToken ==  '');
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== '' ? <Game /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
