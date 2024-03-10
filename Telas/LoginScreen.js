import React, { useState } from 'react';
import { View,StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '../UserContext';


const BASE_URL = 'https://servicosronny.azurewebsites.net';


  
 
  


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { user, setUser } = useUser()

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

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
    <ScrollView>
    <View style={styles.container}>
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
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: { 
    borderRadius:10,
    marginVertical: 10,
  }
});

export default LoginScreen;
