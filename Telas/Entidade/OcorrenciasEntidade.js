import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, VirtualizedList } from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';
import styles from '../../Estilos/Estilos';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '../../Config/api';
import * as Location from 'expo-location';

import { useUser } from '../../UserContext';

import { haversineDistance } from '../../Helpers/MapsHelper';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';


function OcorrenciasEntidadeScreen({ navigation, route }) {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [ocorrenciasFiltradas, setOcorrenciasFiltradas] = useState([]);
    const { user } = useUser();
    const [coordenadasEnt, setCoordenadasEnt] = useState({ latitude: 0, longitude: 0 });
    const customIcon = <Icon name="business" size={30} color="#000" />;
    const isFocused = useIsFocused();
    const mapRef = useRef(null);
    const [mostrarMarcadorEntidade, setMostrarMarcadorEntidade] = useState(false);

    useEffect(() => {
        if (isFocused) {
            // Carregar ou atualizar dados
            validarLocalizacaoOcorrencia();
            

        }
    }, [isFocused, ocorrencias]);

    async function validarLocalizacaoOcorrencia() {
        

        const coordenadasEnt = await getCoordinatesFromAddress(user.endereco);
        setMostrarMarcadorEntidade(true);
        console.log('Coordenadas da entidade:');
        console.log(coordenadasEnt);
        setCoordenadasEnt(coordenadasEnt);
        console.log('Quantidade ocorrencias: ' + ocorrencias.length);
        console.log('Raid de ação: ' + user.raioAcao );

        if (mapRef.current && coordenadasEnt) {
            mapRef.current.animateToRegion({
                latitude: coordenadasEnt.latitude,
                longitude: coordenadasEnt.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000); // 1000 é a duração da animação em milissegundos
        }

        
        let ocorrenciasFi = [];

        for (const ocorrencia of ocorrencias) {
            const endereco = ocorrencia.localizacao;

            let coordenadas;
            if (ocorrencia.latitude && ocorrencia.longitude) {
                coordenadas = { latitude: ocorrencia.latitude, longitude: ocorrencia.longitude };
            } else {
                coordenadas = await getCoordinatesFromAddress(endereco);
                ocorrencia.latitude = coordenadas.latitude;
                ocorrencia.longitude = coordenadas.longitude;
            }
            console.log(`Ocorrencia ${ocorrencia.descricao} : ${coordenadas.latitude}, ${coordenadas.longitude}`);

            if (coordenadas) {
                const distancia = haversineDistance(coordenadasEnt, coordenadas);
                console.log(`Distância da entidade para a ocorrência ${ocorrencia.descricao} : ${distancia} kilômetros`);

                if (distancia <= user.raioAcao) {
                    ocorrenciasFi.push(ocorrencia);
                }
            }
        }
        console.log('Quantidade ocorrencias filtradas: ' + ocorrenciasFi.length);
        setOcorrenciasFiltradas(ocorrenciasFi);
    }

    async function buscarOcorrencias() {
        try {
            const response = await axios.get(`${BASE_URL}/api/Formulario`);
            console.log('Buscar Ocorrências:');    
            console.log(response.data); 
            setOcorrencias(response.data);
            
        } catch (error) {
            console.error('Erro ao buscar ocorrências:', error);
        }
    }

    async function getCoordinatesFromAddress(address) {
        try {
            // Solicita permissão para acessar a localização do dispositivo
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            // Realiza a geocodificação do endereço
            const result = await Location.geocodeAsync(address);
            if (result.length > 0) {
                return result[0]; // Retorna o primeiro resultado
            }
        } catch (error) {
            console.error('Error getting coordinates:', error);
        }
    }

    useEffect(() => {
        
        buscarOcorrencias();
        
    }, [isFocused]);

    function handleMagicTap(item, navigation) {
        console.log(item);
        navigation.navigate("AtendeOcorrencia", { ocorrencia: item })
        console.log(item);

    }


    return (

        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: coordenadasEnt.latitude,
                        longitude: coordenadasEnt.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                    

                >
                    {mostrarMarcadorEntidade && coordenadasEnt && (
                        <Marker
                            coordinate={{ latitude: coordenadasEnt.latitude, longitude: coordenadasEnt.longitude }}
                            title="Localização da Entidade"
                            description="Descrição da Entidade"
                            >
                                {customIcon}
                            </Marker> // Imagem personalizada
                        
                    )}

                    {ocorrenciasFiltradas.map((ocorrencia, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: ocorrencia.latitude, longitude: ocorrencia.longitude }}
                            title={`Ocorrência em ${ocorrencia.localizacao}`} // Você pode personalizar o título
                            description={ocorrencia.descricao}
                        />
                    ))}


                </MapView>
            </View>

            <FlatList
                data={ocorrenciasFiltradas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card} onTouchEnd={() => { handleMagicTap(item, navigation) }}>
                        <Text style={styles.descricao}>{item.tipoOcorrencia}</Text>
                        <Text style={styles.descricao}>{item.descricao}</Text>
                        <Text>Data: {new Date(item.dataCadastro).toLocaleDateString()}</Text>
                        <Text>Status: {item.status}</Text>
                    </View>
                )}
            />
            <FAB
                style={styles.fab}
                small
                icon="plus" // Ícone do FAB
                onPress={() => navigation.navigate('CadastroOcorrenciaScreen')}
            />

        </View>

    );
}



export default OcorrenciasEntidadeScreen;
