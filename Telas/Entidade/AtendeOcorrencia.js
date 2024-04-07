import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput,  Button, FlatList , Image , TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import * as Location from 'expo-location';
import axios from 'axios';
import styles from '../../Estilos/Estilos';
import { BASE_URL } from '../../Config/api';
import { useUser } from '../../UserContext';
import MapView, { Marker } from 'react-native-maps';






const AtendeOcorrenciaTela = ({ route }) => {
    const { ocorrencia } = route.params;
    const { user } = useUser();
    const [expandida, setExpandida] = useState(false);

    // Estados para a ocorrência
    const [tipoOcorrencia, setTipoOcorrencia] = useState(ocorrencia.tipoOcorrencia);
    const [descricao, setDescricao] = useState(ocorrencia.descricao);
    const [localizacao, setLocalizacao] = useState(ocorrencia.localizacao);
    const [status, setStatus] = useState(ocorrencia.status);

    // Estado para nova atualização
    const [descricaoAtualizacao, setDescricaoAtualizacao] = useState('');

    const obterCoordenadas = async (endereco) => {
        let result = await Location.geocodeAsync(endereco);
        if (result && result.length > 0) {
            return { latitude: result[0].latitude, longitude: result[0].longitude };
        }
        return null;
    };

    const handleAtualizarOcorrencia = async () => {
        const novasCoordenadas = await obterCoordenadas(localizacao);

        const dadosAtualizados = {
            ...ocorrencia,
            ongId: user.id,
            tipoOcorrencia,
            descricao,
            localizacao,
            status,
            ...novasCoordenadas
        };

        try {
            const response = await axios.put(`${BASE_URL}/api/Formulario/${ocorrencia.id}`, dadosAtualizados);
            alert('Ocorrência atualizada com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar a ocorrência:', error);
            alert('Erro ao atualizar a ocorrência');
        }
    };

    const handleAdicionarAtualizacao = async () => {
        const novaAtualizacao = {
            descricao: descricaoAtualizacao,
            formularioId: ocorrencia.id,
            ongId: user.id,
            dataAtualizacao: new Date().toISOString()

        };

        try {
            const response = await axios.post(`${BASE_URL}/api/Atualizacoes`, novaAtualizacao);
            alert('Atualização adicionada com sucesso');
        } catch (error) {
            console.error('Erro ao adicionar atualização:', error);
            alert('Erro ao adicionar atualização');
        }
    };

    const renderFotoItem = ({ item }) => (
        <TouchableOpacity onPress={() => setExpandida(!expandida)}><Image source={{ uri: `${BASE_URL}${item.caminho}` }} style={expandida ? styles.fotoExpandida : styles.foto} /></TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
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

                <Text style={styles.title}>Detalhes da Ocorrência</Text>
                <Text>ID: {ocorrencia.id}</Text>
                <Text>Tipo: {ocorrencia.tipoOcorrencia}</Text>
                <Text>Descrição: {ocorrencia.descricao}</Text>
                <Text>Localização: {ocorrencia.localizacao}</Text>
                <Text>Data de Cadastro: {new Date(ocorrencia.dataCadastro).toLocaleDateString()}</Text>
                <Text>Status: {ocorrencia.status}</Text>
                {/* Outras informações da ocorrência */}
                <FlatList
                    data={ocorrencia.fotos}
                    renderItem={renderFotoItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                
            </View>
            <View style={styles.card}>
                <FlatList
                    data={ocorrencia.atualizacoes}
                    renderItem={({ item }) => (<View style={styles.card}><Text>{item.descricao}</Text><Text>{item.dataAtualizacao}</Text></View>)}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={true} // Habilita rolagem aninhada
                    scrollEnabled={false}
                    
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.title}>Atualizar Ocorrência</Text>
                <TextInput
                    style={styles.input}
                    value={tipoOcorrencia}
                    onChangeText={setTipoOcorrencia}
                    placeholder="Tipo da Ocorrência"
                />
                <TextInput
                    style={styles.input}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Descrição"
                />
                <TextInput
                    style={styles.input}
                    value={localizacao}
                    onChangeText={setLocalizacao}
                    placeholder="Localização"
                />
                <Picker
                    selectedValue={status}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
                >
                    <Picker.Item label="Pendente" value="Pendente" />
                    <Picker.Item label="Em Atendimento" value="Em Atendimento" />
                    <Picker.Item label="Fechado" value="Fechado" />
                </Picker>
                <Button onPress={handleAtualizarOcorrencia} title="Atualizar Ocorrência" />
            </View>

            <View style={styles.card}>
                <Text style={styles.title}>Adicionar Atualização</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescricaoAtualizacao}
                    value={descricaoAtualizacao}
                    placeholder="Descrição da Atualização"
                />
                <Button onPress={handleAdicionarAtualizacao} title="Adicionar Atualização" />
            </View>
        </ScrollView>
    );
};

export default AtendeOcorrenciaTela;
