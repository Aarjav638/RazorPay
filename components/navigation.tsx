import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Payment from '../screens/Payment';
import App from '../App';

export type RootStackParamList = {
  Home: undefined;
  Payment: {amount: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
