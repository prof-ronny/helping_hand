import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';

// Biblioteca para obter a localização

function CadastroOcorrenciaScreen() {
    const [descricao, setDescricao] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [fotos, setFotos] = useState([]);
    const [status, setStatus] = useState('Pendente');
    const [tipoOcorrencia, setTipoOcorrencia] = useState([]);
    const [tipoOcorrenciaSelecionada, setTipoOcorrenciaSelecionada] = useState(null);
    const { user } = useUser();
  
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


    useEffect(() => {
        const fetchTipoOcorrencia = async () => {
          try {
            const response = await axios.get('https://servicosronny.azurewebsites.net/api/TiposOcorrencias');
            setTipoOcorrencia(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Erro ao buscar tipos de ocorrências:', error);
          }
        };
    
        fetchTipoOcorrencia();
      }, []);

  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setFotos([...fotos, result.assets[0].uri]);
        console.log(result);
        console.log('selecionou foto');
      }
      else{
        console.log('Cancelou');
      }
    };
  
    const obterLocalizacaoAtual = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar a localização foi negada');
        return;
      }

      
  
      let location = await Location.getCurrentPositionAsync({});
      let endereco ;

      try {
        let resultado = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        if (resultado.length > 0) {
            endereco = resultado[0]; // Pode conter mais de um endereço, retornamos o primeiro
            console.log(endereco);
            setLocalizacao(endereco.formattedAddress  );

        }
      } catch (error) {
        console.error(error);
      }
      
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    };
  
 


    async function enviarFoto(uri) {
        let formData = new FormData();
        formData.append('Photo', {
          uri: uri,
          type: 'image/jpeg', // Ajuste o tipo conforme necessário
          name: 'foto.jpg', // O nome do arquivo pode ser ajustado conforme necessário
        });
      
        try {
          const response = await fetch('https://servicosronny.azurewebsites.net/api/FotoUpload/photo', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          });
          console.log(response);
          console.log(response.json);
          if (!response.ok) throw new Error('Falha no envio da foto');
          return await response.json();
          // Trate a resposta como necessário
        } catch (error) {
          console.error('Erro ao enviar foto:', error);
        }
      }
      
      async function enviarDadosOcorrencia(dadosOcorrencia) {
        console.log(dadosOcorrencia);  
        try {

          
          const response = await axios.post('https://servicosronny.azurewebsites.net/api/Formulario', dadosOcorrencia);
          // Trate a resposta como necessário
          // response.data contém os dados retornados pela sua API
        } catch (error) {
          console.error('Erro ao enviar dados da ocorrência:', error.response ? error.response.data : error.message);
        }
      }
      
      const handleSubmit = async () => {
        // Primeiro, envie as fotos
        let listaFotos=[];
        for (let foto of fotos) {
          let dadoFoto= await enviarFoto(foto);
            
          listaFotos.push(dadoFoto);
        }
      
        // Depois, envie os outros dados da ocorrência
        const dadosOcorrencia = {
          descricao: descricao,
          latitude: latitude,
          longitude: longitude,
          localizacao: localizacao,
          status: status,
          dataCadastro: new Date().toISOString(), // ou a data que você deseja enviar
          fotos: listaFotos,
          pessoaFisicaId: user.id, // Substitua pelo id do usuário logado
          tipoOcorrencia: tipoOcorrenciaSelecionada.value,
        };

        console.log("Tipo de Ocorrencia", tipoOcorrenciaSelecionada); 
      
        await enviarDadosOcorrencia(dadosOcorrencia);
      };


  
    return (
        <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <TextInput
          style={styles.input}
          onChangeText={setDescricao}
          value={descricao}
          placeholder="Descrição"
        />

       
      <Dropdown

        labelField="label"
        valueField="value"
        style={[styles.dropdown, { borderColor: 'blue' }]}
        label="Selecione um tipo de ocorrência"
        data={tipoOcorrencia.map(item => ({ label: item.tipo, value: item.tipo }))}
        value={tipoOcorrenciaSelecionada}
        onChange={setTipoOcorrenciaSelecionada}
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
        <Button style={styles.button} mode='elevated' buttonColor='#4400EE' textColor='#FFFFFF'   onPress={pickImage}>Escolher Foto</Button> 
        {fotos.map((foto, index) => (
            <Image key={index} source={{ uri: foto }} style={{ width: 400, height: 300 }} />
        ))}
        <Button style={styles.button} mode='elevated' buttonColor='#4400EE' textColor='#FFFFFF' onPress={obterLocalizacaoAtual} >Obter Localização Atual</Button>
        <Button style={styles.button} mode='elevated' buttonColor='#4400EE' textColor='#FFFFFF'   onPress={handleSubmit}>Enviar Ocorrência</Button> 
      </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    scroll: {
        flex: 1,
        
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 10,
    },
    button:{
        borderRadius:10,
        marginVertical: 10,
        
    },
    dropdown: {
        marginBottom: 10,
        height: 50,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        borderColor: '#000000',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
  
        elevation: 2,
      }
  });



















export default CadastroOcorrenciaScreen;


