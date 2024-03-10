import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

// Biblioteca para obter a localização

function CadastroOcorrenciaScreen() {
    const [descricao, setDescricao] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [fotos, setFotos] = useState([]);
    const [status, setStatus] = useState('Pendente');
  
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Desculpe, precisamos de permissões da câmera para fazer isso funcionar!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setFotos([...fotos, result.uri]);
      }
    };
  
    const obterLocalizacaoAtual = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar a localização foi negada');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    };
  
    const enviarOcorrencia = () => {
      // Lógica para enviar ocorrência
      console.log({ descricao, latitude, longitude, localizacao, fotos, status });
      // Implementar chamada à API aqui
    };
  
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setDescricao}
          value={descricao}
          placeholder="Descrição"
        />
        <TextInput
          style={styles.input}
          onChangeText={setLatitude}
          value={latitude}
          placeholder="Latitude"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setLongitude}
          value={longitude}
          placeholder="Longitude"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setLocalizacao}
          value={localizacao}
          placeholder="Localização"
        />
        <Button title="Escolher Foto" onPress={pickImage} />
        {fotos.map((foto, index) => (
          <Image key={index} source={{ uri: foto }} style={{ width: 200, height: 200 }} />
        ))}
        <Button title="Obter Localização Atual" onPress={obterLocalizacaoAtual} />
        <Button title="Enviar Ocorrência" onPress={enviarOcorrencia} />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 10,
    },
  });





const pickImage = async () => {
    // Pedir permissão para acessar a galeria
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Se sua API suportar múltiplas imagens
      // outras opções
    });
  
    if (!result.cancelled) {
      // Adicionar a foto selecionada ao estado 'fotos'
      setFotos([...fotos, result.uri]);
    }
  };
  const obterLocalizacaoAtual = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permissão de acesso à localização negada');
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  
    // Para obter a descrição da localização, você pode usar reverse geocoding
  };

  async function enviarFoto(uri) {
    let formData = new FormData();
    formData.append('foto', {
      uri: uri,
      type: 'image/jpeg', // Ajuste o tipo conforme necessário
      name: 'foto.jpg', // O nome do arquivo pode ser ajustado conforme necessário
    });
  
    try {
      const response = await fetch('https://sua-api.com/endpoint/foto', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Falha no envio da foto');
      // Trate a resposta como necessário
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
    }
  }
  
  async function enviarDadosOcorrencia(dadosOcorrencia) {
    try {
      const response = await axios.post('https://sua-api.com/endpoint/ocorrencia', dadosOcorrencia);
      // Trate a resposta como necessário
      // response.data contém os dados retornados pela sua API
    } catch (error) {
      console.error('Erro ao enviar dados da ocorrência:', error.response ? error.response.data : error.message);
    }
  }
  
  const handleSubmit = async () => {
    // Primeiro, envie as fotos
    for (let foto of fotos) {
      await enviarFoto(foto);
    }
  
    // Depois, envie os outros dados da ocorrência
    const dadosOcorrencia = {
      descricao: descricao,
      latitude: latitude,
      longitude: longitude,
      localizacao: localizacao,
      status: status,
      dataCadastro: new Date().toISOString(), // ou a data que você deseja enviar
    };
  
    await enviarDadosOcorrencia(dadosOcorrencia);
  };











export default CadastroOcorrenciaScreen;


