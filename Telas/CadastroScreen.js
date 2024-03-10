import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import axios from 'axios';
import generateSHA256Hash from '../Criptografia/Index';
import { ScrollView } from 'react-native-gesture-handler';

const BASE_URL = 'https://servicosronny.azurewebsites.net';




const CadastroScreen= () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    try {
      let autenticacao = generateSHA256Hash(email+senha);

      const response = await axios.post(`${BASE_URL}/api/PessoaFisica`, {
        nome,
        cpf,
        dataNascimento,
        email,
        autenticacao,
      });
      console.log(response);
      if (response.status === 201) {
        // Cadastro bem-sucedido, exibe mensagem de sucesso
        alert('Usuário cadastrado com sucesso.');
      } else {
        // Exibe mensagem de erro
        
        alert('Falha ao cadastrar usuário.');
      }
    } catch (error) {
      // Exibe mensagem de erro
      console.log(error.response)
      alert('Erro ao realizar cadastro' + (error.response.data.mensagem ? ': ' + error.response.data.mensagem : '.'));
    }
  };

  return (
    
    <ScrollView>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setNome}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        onChangeText={setCpf}
        value={cpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        onChangeText={setDataNascimento}
        value={dataNascimento}
      />
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
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
    </ScrollView>
 
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
});

export default CadastroScreen;
