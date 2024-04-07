import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import LoadingModal from './LoadingModal';

import { ScrollView } from 'react-native-gesture-handler';
import { useUser } from '../UserContext';
import { useEffect } from 'react';
import styles from '../Estilos/Estilos';



import logo from '../images/logo.jpg'
import { BASE_URL } from '../Config/api';







const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { user, setUser } = useUser();
  const [carregando, setCarregando] = useState(false);


  useEffect(() => {
    navigation.setOptions(styles.appBar);
  }, [navigation]);

  // O restante do seu código...


  const handleLogin = async () => {
    try {
      setCarregando(true);
      console.log(BASE_URL);
      const response = await axios.post(`${BASE_URL}/api/authPF`, { email, senha });

      setCarregando(false);
      if (response.status === 200) {
        const dados = await response.data;
        console.log(dados);

        if (dados.perfil === "PessoaFisica") {

          // Login bem-sucedido, navega para a tela Home
          setUser({
            id: dados.id, // Atribui o id retornado na resposta.  
            nome: dados.nome, // Atribui o nome retornado na resposta.
            email: dados.email,
            telefone: dados.telefone,
            perfil: dados.perfil,
            cpf: dados.cpf,
            dataNascimento: dados.dataNascimento,
          })


          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeDrawer' }],
          });
        }
        else if (dados.perfil === "Entidade"){
          setUser({
            id: dados.id, // Atribui o id retornado na resposta.  
            nome: dados.nome, // Atribui o nome retornado na resposta.
            email: dados.email,
            endereco: dados.endereco,
            cnpj: dados.cnpj,
            perfil: dados.perfil,
            raioAcao: 20
          })

          console.log("login Entidade");


          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeEntidade' }],
          });

        }
      } else {
        // Exibe mensagem de erro
        alert('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      setCarregando(false);
      // Exibe mensagem de erro
      alert('Erro ao realizar login. Tente novamente mais tarde.' + error.message);
    }
  };


  const recuperarSenha = async () => {
    if (email === '') {
      alert('Digite o email para recuperar a senha');
    } else {
      alert('Um email foi enviado para ' + email + ' com as instruções para recuperar a senha');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.scroll}>
        <View style={styles.container} >


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

          <Button style={styles.button} mode='elevated' onPress={recuperarSenha} >Esqueci a Senha</Button>
          <LoadingModal isLoading={carregando} />


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default LoginScreen;
