import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Импортируем компоненты экранов
import HLTVApp from './HLTVApp'; // Экран со списком матчей
import MatchDetails from './MatchDetails'; // Экран с деталями матча

// Создаем стек навигации
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HLTVApp">
        {/* Экран с матчами */}
        <Stack.Screen name="HLTVApp" component={HLTVApp} options={{ title: 'Предстоящие матчи' }} />
        
        {/* Экран с деталями матча */}
        <Stack.Screen
          name="MatchDetails"
          component={MatchDetails}
          options={{ title: 'Подробности матча' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C34',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});
