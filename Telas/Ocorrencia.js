
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import styles from '../Estilos/Estilos';
import MapView, { Marker } from 'react-native-maps';
import { BASE_URL } from '../Config/api';

const OcorrenciaTela = ({ route }) => {
    // Dados fictícios para exemplificar
    const { ocorrencia } = route.params;
    const [expandida, setExpandida] = useState(false);
    


    const [descricaoAtualizacao, setDescricaoAtualizacao] = useState('');

    const handleUpdate = () => {
        // Aqui você implementaria a lógica para enviar a atualização
        alert('Atualização enviada!');
    };
    const renderFotoItem = ({ item }) => (
        <TouchableOpacity onPress={() => setExpandida(!expandida)}><Image source={{ uri: `${BASE_URL}${item.caminho}` }}  style={expandida?styles.fotoExpandida: styles.foto } /></TouchableOpacity>
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
                    renderItem={({ item }) => (<View><Text>{item.descricao}</Text><Text>{item.dataAtualizacao}</Text></View>)}
                    keyExtractor={item => item.id}
                    horizontal
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