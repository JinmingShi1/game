import React, {useState} from 'react';
import Login from '../app/login/index';
import Register from '../app/register/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />      
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
export default AuthStack;
