import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button , TextInput} from 'react-native-paper';
import { useUser } from '../../UserContext';
import axios from 'axios';
import { useState } from 'react';
import PerfilEntidadeScreen from './PerfilEntidadeScreen';
import OcorrenciasEntidadeScreen from './OcorrenciasEntidade';

import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../Estilos/Estilos';
import ConteudoDrawer from '../../ConteudoDrawer';
import logo from '../../images/logo.jpg'

const Drawer = createDrawerNavigator();


function HomeDrawer({ navigation, route}) {
  const { user, setUser } = useUser()

  async function sair()  {
    setUser({
      id: '', // Atribui o id retornado na resposta.  
      nome: '', // Atribui o nome retornado na resposta.
      email:  '',
      telefone:  '',
      endereco:  '',
      cnpj:  '',
    });
    navigation.navigate('Login');
  }

  
  return (

    <Drawer.Navigator
    useLegacyImplementation={false}
    initialRouteName="Inicio"
    drawerContent={(props) => <ConteudoDrawer {...props} />}
    >
      <Drawer.Screen name="Inicio" component={HomeTela} options={styles.appBar}     />
      <Drawer.Screen name="Perfil Entidade" component={PerfilEntidadeScreen} options={styles.appBar}  />
      <Drawer.Screen name="Ocorrencias" component={OcorrenciasEntidadeScreen} options={styles.appBar}  />
      
      
    </Drawer.Navigator>

  );
}




function HomeTela({ navigation }) {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entidade</Text>
      <View style={{height: 200}} >
      <Image source={logo} style={styles.image} />
      </View>
    </View>
  );
}






export default HomeDrawer;