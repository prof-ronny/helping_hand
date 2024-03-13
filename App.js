import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './AppNavigator';
import  {UserProvider}  from './UserContext';

export default function App() {
  return (
    <UserProvider>
      <AppNavigator/>
    </UserProvider>
  );
}


