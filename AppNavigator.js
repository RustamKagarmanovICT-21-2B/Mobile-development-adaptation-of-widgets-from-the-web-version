import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HLTVApp from './HLTVApp';  // Экран списка матчей
import MatchDetails from './MatchDetails';  // Экран с подробной информацией о матче

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HLTVApp">
        <Stack.Screen name="HLTVApp" component={HLTVApp} />
        <Stack.Screen name="MatchDetails" component={MatchDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
