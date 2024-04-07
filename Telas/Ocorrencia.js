
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styles from '../Estilos/Estilos';
import MapView, { Marker } from 'react-native-maps';
import { BASE_URL } from '../Config/api';
import { useUser } from '../UserContext';
import axios from 'axios';

const OcorrenciaTela = ({ route }) => {
    // Dados fictícios para exemplificar
    const { ocorrencia } = route.params;
    const [expandida, setExpandida] = useState(false);
    const { user } = useUser();




    const [descricaoAtualizacao, setDescricaoAtualizacao] = useState('');

    const handleUpdate =  async() => {
        // Aqui você implementaria a lógica para enviar a atualização
        let dadosOcorrencia;
        console.log('Usuário:');
        console.log(user);
        if (user.perfil === 'Entidade') {

            dadosOcorrencia = {
                formularioId: ocorrencia.id,
                descricao: descricaoAtualizacao,
                ongId: user.id,
                dataAtualizacao: new Date().toISOString(),
            };
        } else if (user.perfil === 'PessoaFisica') {
            dadosOcorrencia = {
                formularioId: ocorrencia.id,
                descricao: descricaoAtualizacao,
                pessoaFisicaId: user.id,
                dataAtualizacao: new Date().toISOString(),
            };
        }
        ocorrencia.atualizacoes.push(dadosOcorrencia);

        console.log('Dados da ocorrência:');

        console.log(dadosOcorrencia);


        try {


            const response = await axios.post(`${BASE_URL}/api/Atualizacoes`, dadosOcorrencia);
            // Trate a resposta como necessário
            // response.data contém os dados retornados pela sua API
            alert('Ocorrência cadastrada com sucesso');
        } catch (error) {
            console.error('Erro ao enviar dados da ocorrência:', error.response ? error.response.data : error.message);
        }


        alert('Atualização enviada!');
    };
    const renderFotoItem = ({ item }) => (
        <TouchableOpacity onPress={() => setExpandida(!expandida)}><Image source={{ uri: `${BASE_URL}${item.caminho}` }} style={expandida ? styles.fotoExpandida : styles.foto} /></TouchableOpacity>
    );
    console.log(ocorrencia.descricao);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Detalhes da Ocorrência</Text>
                <Text>ID: {ocorrencia.id}</Text>
                <Text>Descrição: {ocorrencia.descricao}</Text>
                <Text>Tipo: {ocorrencia.tipoOcorrencia}</Text>



                {ocorrencia.latitude && ocorrencia.longitude && (
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: ocorrencia.latitude,
                                longitude: ocorrencia.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: ocorrencia.latitude, longitude: ocorrencia.longitude }}
                                title="Local da Ocorrência"
                                description={ocorrencia.descricao}
                            />
                        </MapView>
                    </View>
                )}

                <FlatList
                    data={ocorrencia.fotos}
                    renderItem={renderFotoItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <Text>Localização: {ocorrencia.localizacao}</Text>
                <Text>Data de Cadastro: {ocorrencia.dataCadastro}</Text>
                <Text>Status: {ocorrencia.status}</Text>
            </View>
            <View style={styles.card}>
                <FlatList
                    data={ocorrencia.atualizacoes}
                    renderItem={({ item }) => (<View style={styles.card}><Text>{item.descricao}</Text><Text>{item.dataAtualizacao}</Text></View>)}
                    keyExtractor={item => item.id}
                    
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.title}>Adicionar Atualização</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescricaoAtualizacao}
                    value={descricaoAtualizacao}
                    placeholder="Descrição da Atualização"
                />
                <Button onPress={handleUpdate} >Enviar Atualização</Button>
            </View>
        </ScrollView>
    );
};

export default OcorrenciaTela;  