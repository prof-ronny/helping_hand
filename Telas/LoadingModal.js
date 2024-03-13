import React from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingModal = ({ isLoading }) => {
    return (
        <Modal
            transparent={true}
            visible={isLoading}
            onRequestClose={() => {
                // Função chamada quando o modal tenta fechar
            }}>
            <View style={styles.centeredView}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingModal;