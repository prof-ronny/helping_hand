import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, VirtualizedList } from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';

import { useUser } from '../UserContext';

function OcorrenciasScreen({ navigation, route}) {
  const [ocorrencias, setOcorrencias] = useState([]);
  const { user } = useUser();

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  descricao: {
    fontWeight: 'bold'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default OcorrenciasScreen;
