import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import styles from '../../Estilos/Estilos';
import { BASE_URL } from '../../Config/api';
import { useUser } from '../../UserContext'; // 

function PerfilEntidadeScreen() {
    const { user, setUser } = useUser();
    const [editando, setEditando] = useState(false);
    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [cnpj, setCnpj] = useState(user.cnpj);
    const [endereco, setEndereco] = useState(user.endereco);
    const [raioAcao, setRaioAcao] = useState(user.raioAcao); 

    async function atualizarEntidade(entidadeId, nome, email, cnpj, endereco) {
        try {
            const API_URL = `${BASE_URL}/api/Ong`;
            const entidade = (await axios.get(`${API_URL}/${entidadeId}`)).data;
            console.log("Atualizando entidade:");
            console.log(entidade);
            const response = await axios.put(`${API_URL}/${entidadeId}`, { id: entidadeId, nome, email, cnpj, endereco, autenticacao: entidade.autenticacao });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar a entidade:', error);
            console.error(error.response);
            console.error(error.request);
            throw error;
        }
    }

    const handleSave = async () => {
        try {
            await atualizarEntidade(user.id, nome, email, cnpj, endereco);
            setUser({ id: user.id, nome, email, cnpj, endereco, raioAcao  });
            setEditando(false);
        } catch (error) {
            console.error('Falha ao salvar as informações da entidade:', error);
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
                    value={cnpj}
                    onChangeText={setCnpj}
                    editable={editando}
                    placeholder="CNPJ"
                />
                <TextInput
                    style={styles.input}
                    value={endereco}
                    onChangeText={setEndereco}
                    editable={editando}
                    placeholder="Endereço"
                />
                <TextInput
                    style={styles.input}
                    value={raioAcao.toString()}
                    onChangeText={setRaioAcao}
                    editable={editando}
                    placeholder="Distancia de Atuação"
                />
                
                {editando ? (
                    <Button style={styles.button} mode='elevated' onPress={handleSave}>Salvar Alterações</Button>
                ) : (
                    <Button style={styles.button} mode='elevated' onPress={() => setEditando(true)}>Editar</Button>
                )}
            </View>
        </ScrollView>
    );
}

export default PerfilEntidadeScreen;        