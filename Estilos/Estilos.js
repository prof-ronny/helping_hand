import { StyleSheet, Dimensions  } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    appBar: {
        headerStyle: {
            backgroundColor: '#2e98bf',
        },
        headerTintColor: '#fff', // Cor dos botões e título no header
        headerTitleStyle: {
            fontWeight: 'bold', // Estilo do título
        },
    },


    fundo: {
        backgroundColor: '#2e98bf',
    },
    container: {
        flex: 1,



        padding: 2,
        backgroundColor: '#2e98bf'
    },
    linha: {
        flexDirection: 'row',


    },
    scroll: {
        flex: 1,
        backgroundColor: '#2e98bf'
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        width: 100,
        height: 200,
        borderRadius: 5,
        padding: 10,
        resizeMode: 'stretch',
        

    },

    input: {

        margin: 3,
        padding: 3,

        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        height: 52,

    },
    inputMultiline: {

        margin: 3,
        padding: 3,

        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,


    },
    button: {
        alignSelf: 'center',
        borderRadius: 10,
        margin: 3,
        verticalAlign: 'center',
        width: 180,
        height: 52,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    descricao: {
        fontWeight: 'bold'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    dropdown: {
        marginHorizontal: 3,
        marginBottom: 10,
        height: 50,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        borderColor: '#000000',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    mapContainer: {
        height: 200,
        width: '100%',
        marginTop: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    foto: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 10,
    },
    fotoExpandida: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.8,
        resizeMode: 'contain',
}
});

export default styles;  // Estilos.js