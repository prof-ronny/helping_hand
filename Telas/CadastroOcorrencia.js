import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import axios from 'axios';
import { useUser } from '../UserContext';

import { Dropdown } from 'react-native-element-dropdown';
import { Button, TextInput } from 'react-native-paper';
import styles from '../Estilos/Estilos';
import LoadingModal from './LoadingModal';
import { BASE_URL } from '../Config/api';


// Biblioteca para obter a localização

function CadastroOcorrenciaScreen({ navigation }) {
    const [descricao, setDescricao] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [fotos, setFotos] = useState([]);
    const [status, setStatus] = useState('Pendente');
    const [tipoOcorrencia, setTipoOcorrencia] = useState([]);
    const [tipoOcorrenciaSelecionada, setTipoOcorrenciaSelecionada] = useState(null);
    const { user } = useUser();
    const [carregando, setCarregando] = useState(false);


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Desculpe, precisamos de permissões da câmera para fazer isso funcionar!');
                }
            }
        })();
    }, []);

    useEffect(() => {
        navigation.setOptions(styles.appBarLogin);
    }, [navigation]);


    useEffect(() => {
        const fetchTipoOcorrencia = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/TiposOcorrencias`);
                setTipoOcorrencia(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Erro ao buscar tipos de ocorrências:', error);
            }
        };

        fetchTipoOcorrencia();
    }, []);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFotos([...fotos, result.assets[0].uri]);
            console.log(result);
            console.log('selecionou foto');
        }
        else {
            console.log('Cancelou');
        }
    };

    const obterLocalizacaoAtual = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão para acessar a localização foi negada');
            return;
        }



        let location = await Location.getCurrentPositionAsync({});
        let endereco;

        try {
            let resultado = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            if (resultado.length > 0) {
                endereco = resultado[0]; // Pode conter mais de um endereço, retornamos o primeiro
                console.log(endereco);
                setLocalizacao(endereco.formattedAddress);

            }
        } catch (error) {
            console.error(error);
        }

        setLatitude(location.coords.latitude.toString());
        setLongitude(location.coords.longitude.toString());
    };




    async function enviarFoto(uri) {
        let formData = new FormData();
        formData.append('Photo', {
            uri: uri,
            type: 'image/jpeg', // Ajuste o tipo conforme necessário
            name: 'foto.jpg', // O nome do arquivo pode ser ajustado conforme necessário
        });

        try {
            const response = await fetch(`${BASE_URL}/api/FotoUpload/photo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            console.log(response);
            console.log(response.json);
            if (!response.ok) throw new Error('Falha no envio da foto');
            return await response.json();
            // Trate a resposta como necessário
        } catch (error) {
            console.error('Erro ao enviar foto:', error);
        }
    }

    async function enviarDadosOcorrencia(dadosOcorrencia) {
        console.log(dadosOcorrencia);
        try {


            const response = await axios.post(`${BASE_URL}/api/Formulario`, dadosOcorrencia);
            // Trate a resposta como necessário
            // response.data contém os dados retornados pela sua API
            alert('Ocorrência cadastrada com sucesso');
        } catch (error) {
            console.error('Erro ao enviar dados da ocorrência:', error.response ? error.response.data : error.message);
        }
    }

    const handleSubmit = async () => {
        // Primeiro, envie as fotos
        setCarregando(true);
        let listaFotos = [];
        for (let foto of fotos) {
            let dadoFoto = await enviarFoto(foto);

            listaFotos.push(dadoFoto);
        }

        // Depois, envie os outros dados da ocorrência
        const dadosOcorrencia = {
            descricao: descricao,
            latitude: latitude,
            longitude: longitude,
            localizacao: localizacao,
            status: status,
            dataCadastro: new Date().toISOString(), // ou a data que você deseja enviar
            fotos: listaFotos,
            pessoaFisicaId: user.id, // Substitua pelo id do usuário logado
            tipoOcorrencia: tipoOcorrenciaSelecionada.value,
        };

        console.log("Tipo de Ocorrencia", tipoOcorrenciaSelecionada);

        await enviarDadosOcorrencia(dadosOcorrencia);
        setCarregando(false);
    };



    return (

        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescricao}
                    value={descricao}
                    placeholder="Descrição"
                />


                <Dropdown

                    labelField="label"
                    valueField="value"
                    style={[styles.dropdown, { borderColor: 'blue' }]}
                    label="Selecione um tipo de ocorrência"
                    data={tipoOcorrencia.map(item => ({ label: item.tipo, value: item.tipo }))}
                    value={tipoOcorrenciaSelecionada}
                    onChange={setTipoOcorrenciaSelecionada}
                />
                <View style={styles.linha}>

                    <TextInput
                        readOnly={true}
                        style={styles.input}
                        onChangeText={setLatitude}
                        value={latitude}
                        placeholder="Latitude"
                        keyboardType="numeric"
                    />
                    <TextInput
                        readOnly={true}
                        style={styles.input}
                        onChangeText={setLongitude}
                        value={longitude}
                        placeholder="Longitude"
                        keyboardType="numeric"
                    />
                    <Button style={styles.button} mode='elevated' icon='map-marker' onPress={obterLocalizacaoAtual} >GPS</Button>
                </View>
                <TextInput
                    style={styles.inputMultiline}
                    onChangeText={setLocalizacao}
                    value={localizacao}
                    placeholder="Endereço"
                    label={'Endereço'}
                    multiline={true}
                    numberOfLines={4}

                />

                <Button style={styles.button} mode='elevated' icon='image' onPress={pickImage} >Escolher</Button>
                {fotos.map((foto, index) => (
                    <Image key={index} source={{ uri: foto }} style={{ width: 400, height: 300 }} />
                ))}

                <Button style={styles.button} mode='elevated' icon="content-save" disabled={carregando} onPress={handleSubmit}>Enviar</Button>
                <LoadingModal isLoading={carregando} />
            </ScrollView>

        </View>
    );
}





















export default CadastroOcorrenciaScreen;


