import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button , TextInput} from 'react-native-paper';
import { useUser } from '../UserContext';
import axios from 'axios';
import { useState } from 'react';
import PerfilScreen from './PerfilScreen';
import OcorrenciasScreen from './OcorrenciasScreen';  

import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Estilos/Estilos';
import ConteudoDrawer from '../ConteudoDrawer';

const Drawer = createDrawerNavigator();


function HomeDrawer({ navigation, route}) {
  const { user, setUser } = useUser()

  async function sair()  {
    setUser({
      id: '', // Atribui o id retornado na resposta.  
      nome: '', // Atribui o nome retornado na resposta.
      email:  '',
      telefone:  '',
      cpf:  '',
      dataNascimento:  '',
    });
    navigation.navigate('Login');
  }

  
  return (

    <Drawer.Navigator
    useLegacyImplementation={false}
    initialRouteName="Home"
    drawerContent={(props) => <ConteudoDrawer {...props} />}
    >
      <Drawer.Screen name="HomeTela" component={HomeTela} options={styles.appBar}     />
      <Drawer.Screen name="Perfil" component={PerfilScreen} options={styles.appBar}  />
      <Drawer.Screen name="Ocorrencias" component={OcorrenciasScreen} options={styles.appBar}  />
      
      
    </Drawer.Navigator>

  );
}




function HomeTela({ navigation }) {


  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Abrir Menu"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
}






export default HomeDrawer;