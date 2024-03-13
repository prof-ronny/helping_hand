import React from 'react';
import { View,   ScrollView } from 'react-native';
import { Button , TextInput } from 'react-native-paper';
import { useUser } from '../UserContext';
import axios from 'axios';
import { useState } from 'react';
import styles from '../Estilos/Estilos';

export default function PerfilScreen() {
    const { user, setUser } = useUser();
    const [editando, setEditando] = useState(false);
    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [telefone, setTelefone] = useState(user.telefone);
    const [cpf, setCpf] = useState(user.cpf);
    const [dataNascimento, setDataNascimento] = useState(user.dataNascimento);  
  
    async function atualizarUsuario(userId, nome, email, telefone, cpf,dataNascimento ) {
      try {
  
        const API_URL = 'https://servicosronny.azurewebsites.net/api/PessoaFisica';
        const usuario = (await axios.get(`${API_URL}/${userId}`)).data;
        console.log(usuario);
        const response = await axios.put(`${API_URL}/${userId}`, {id: usuario.id, nome, email, telefone, cpf , dataNascimento, autenticacao : usuario.autenticacao});
        return response.data; // Retorna os dados atualizados como resposta
      } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        throw error; // Re-lança o erro para ser tratado onde a função é chamada
      }
    }
  
  
  
    const handleSave = async () => {
      try {
        await atualizarUsuario(user.id, nome, email, telefone, cpf, dataNascimento)
        // Aqui, você faria a chamada à API para salvar as informações
        // Suponha que a API retorne o usuário atualizado, então atualize o contexto:
        setUser({ nome, email, telefone, cpf , dataNascimento});
  
        // Desligar o modo de edição após o salvamento
        setEditando(false);
      } catch (error) {
        console.error('Falha ao salvar as informações do usuário:', error);
      }
    };
  
    return (
      <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          editable={editando}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={editando}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          editable={editando}
          placeholder="Telefone"
        />
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          editable={editando}
          placeholder="CPF"
        />
        <TextInput
          style={styles.input}
          value={dataNascimento}
          onChangeText={setDataNascimento}
          editable={editando}
          placeholder="Data Nascimento"
        />
        
        {editando ? (
          <Button style={styles.button} mode='elevated' onPress={handleSave}> Salvar Alterações</Button> 
        ) : (
          <Button style={styles.button} mode='elevated' onPress={() => setEditando(true)}>Editar</Button>
        )}
      </View>
      </ScrollView>
    );
  }
  
 
  