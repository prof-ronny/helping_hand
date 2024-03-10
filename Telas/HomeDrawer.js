import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button , TextInput} from 'react-native-paper';
import { useUser } from '../UserContext';
import axios from 'axios';
import { useState } from 'react';
import PerfilScreen from './PerfilScreen';
import OcorrenciasScreen from './OcorrenciasScreen';  

import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

function HomeDrawer({ navigation, route}) {
  
  return (

    <Drawer.Navigator
    useLegacyImplementation={false}
    initialRouteName="Home">
      <Drawer.Screen name="HomeTela" component={HomeTela} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Ocorrencias" component={OcorrenciasScreen} />
    </Drawer.Navigator>

  );
}




function HomeTela({ navigation }) {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Abrir Menu"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
}






export default HomeDrawer;