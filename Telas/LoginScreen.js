import React, { useState } from 'react';
import { View,StyleSheet, KeyboardAvoidingView, Platform , Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '../UserContext';
import { useEffect } from 'react';


const BASE_URL = 'https://servicosronny.azurewebsites.net';
import logo from '../images/logo.jpg' 


  
 
  


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { user, setUser } = useUser()


  useEffect(() => {
    navigation.setOptions({
      title: '', // Defina o título da barra de navegação
      headerStyle: {
        backgroundColor: '#2e98bf', // Cor de fundo da barra de navegação
      },
      headerTintColor: '#fff', // Cor dos botões e título na barra de navegação
      headerTitleStyle: {
        fontWeight: 'bold', // Estilo do título
      },
      // Outras opções que você deseja personalizar
    });
  }, [navigation]);

  // O restante do seu código...


  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/authPF`, { email, senha });
      if (response.status === 200) {
        const dados = await response.data;
        console.log(dados);

        // Login bem-sucedido, navega para a tela Home
        setUser({
          id: dados.id, // Atribui o id retornado na resposta.  
          nome: dados.nome, // Atribui o nome retornado na resposta.
          email:  dados.email,
          telefone:  dados.telefone,
          cpf:  dados.cpf,
          dataNascimento:  dados.dataNascimento,
        })

        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeDrawer' }],
        });
      } else {
        // Exibe mensagem de erro
        alert('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      // Exibe mensagem de erro
      alert('Erro ao realizar login. Tente novamente mais tarde.'+ error.message);
    }
  };


  const recuperarSenha =async () => {
    if(email === ''){
      alert('Digite o email para recuperar a senha');
    }else{
      alert('Um email foi enviado para '+ email + ' com as instruções para recuperar a senha');
    }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    <ScrollView style={styles.scroll}> 
    <View style={styles.container}>
    
    
      <Image source={logo} style={styles.image} />


      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}        
        value={email}
      />
      <TextInput
        
        style={styles.input}
        placeholder="Senha"
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
      />
      <Button style={styles.button} mode='elevated' onPress={handleLogin} >Entrar</Button> 
      <Button
        style={styles.button}
        mode='elevated'
        onPress={() => navigation.navigate('Cadastro')}>Criar Conta</Button>
      <Button style={styles.button} mode='elevated' onPress={recuperarSenha} >Recuperar Senha</Button> 
      
   
    
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#2e98bf'
  },
  scroll: {
    flex: 1,
    backgroundColor: '#2e98bf'
  },
  image: {
    flex: 1,
    width: 100, 
    height: 200,
    borderRadius: 5,
    padding: 10,
    resizeMode: 'stretch',
    marginBottom: 10, 
    
  },  

  input: {
    width: '100%',
    marginHorizontal: 20,
    padding: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 35,

  },
  button: { 
    borderRadius:10,
    marginVertical: 10,
  }
});

export default LoginScreen;
