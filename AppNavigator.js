import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Telas/LoginScreen';
import CadastroScreen from './Telas/CadastroScreen';
import OcorrenciaTela from './Telas/Ocorrencia';  
import HomeEntidade from './Telas/Entidade/HomeEntidade';

import HomeDrawer from './Telas/HomeDrawer';
import CadastroOcorrenciaScreen from './Telas/CadastroOcorrencia';
import AtendeOcorrenciaTela from './Telas/Entidade/AtendeOcorrencia';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="HomeEntidade" component={HomeEntidade} options={{ headerShown: false }} />
        <Stack.Screen name="AtendeOcorrencia" component={AtendeOcorrenciaTela } />  

        <Stack.Screen name="CadastroOcorrenciaScreen" component={CadastroOcorrenciaScreen } />
        <Stack.Screen name="Ocorrencia" component={OcorrenciaTela}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
