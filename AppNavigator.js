import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Telas/LoginScreen';
import CadastroScreen from './Telas/CadastroScreen';

import HomeDrawer from './Telas/HomeDrawer';
import CadastroOcorrenciaScreen from './Telas/CadastroOcorrencia';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroOcorrenciaScreen" component={CadastroOcorrenciaScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
