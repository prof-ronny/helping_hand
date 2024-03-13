import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, VirtualizedList } from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';
import styles from '../Estilos/Estilos';
import { useIsFocused } from '@react-navigation/native';

import { useUser } from '../UserContext';

function OcorrenciasScreen({ navigation, route}) {
  const [ocorrencias, setOcorrencias] = useState([]);
  const { user } = useUser();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Carregar ou atualizar dados
      buscarOcorrencias();
    }
  }, [isFocused]);

  async function buscarOcorrencias() {
    try {
      const response = await axios.get(`https://servicosronny.azurewebsites.net/api/Formulario/PessoaFisica/${user.id}`);
      setOcorrencias(response.data);
    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
    }
  }

  useEffect(() => {
    buscarOcorrencias();
  }, []);

  return (
    
    <View style={styles.container}>
      <FlatList
        data={ocorrencias}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.descricao}>{item.tipoOcorrencia}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text>Data: {new Date(item.dataCadastro).toLocaleDateString()}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus" // Ícone do FAB
        onPress={() => navigation.navigate('CadastroOcorrenciaScreen')}
      />
      
    </View>
    
  );
}



export default OcorrenciasScreen;
