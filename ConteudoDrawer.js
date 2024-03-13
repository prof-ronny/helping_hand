import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View } from 'react-native';
import { useUser } from './UserContext';

const ConteudoDrawer = (props) => {
    const { navigation } = props;
    const { user, setUser } = useUser();

    const handleLogoff = () => {
        setUser({
            id: '', // Atribui o id retornado na resposta.  
            nome: '', // Atribui o nome retornado na resposta.
            email:  '',
            telefone:  '',
            cpf:  '',
            dataNascimento:  '',
        });
        
        // Lógica de logoff
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }); // Substitua 'Login' pelo nome da sua tela de login
    };

    // Outras funções para botões podem ser adicionadas aqui

    return (
        <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* Aqui você pode adicionar DrawerItems ou outros componentes */}
        <DrawerItem label="Sair" onPress={handleLogoff} />
        
      </DrawerContentScrollView>
    );
};

export default ConteudoDrawer;