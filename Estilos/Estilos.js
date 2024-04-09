import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    appBar:{
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
    linha:{
        flexDirection: 'row',
        

    },
    scroll: {
        flex: 1,
        backgroundColor: '#2e98bf',
        paddingTop: 10,
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        width: 100,
        height: 200,
        borderRadius: 5,
        padding: 10,
        resizeMode: 'stretch',
        marginTop: 10,
        marginBottom: 10,

    },

    input: {
        
        margin: 3,
        padding: 3,
        
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        height: 45,

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
        borderColor: "navy",
        borderWidth: 2,
        margin: 3,
        verticalAlign: 'center',
        width: "70%",
        height: "10%",
        backgroundColor: "white",
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

      textos: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "justify",
        color: "white",
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        marginTop: 10,
      }
});

export default styles;  // Estilos.js