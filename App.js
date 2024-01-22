//App.js

import React, { useEffect } from 'react';
import { Alert, LogBox } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNetInfo } from '@react-native-community/netinfo';

import Start from './components/Start';
import Chat from './components/Chat';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyCRdu9A-w5hKCVF0uKVuBv3RUcf7uqyeyA",
    authDomain: "chat-app-2-8d592.firebaseapp.com",
    projectId: "chat-app-2-8d592",
    storageBucket: "chat-app-2-8d592.appspot.com",
    messagingSenderId: "809721418021",
    appId: "1:809721418021:web:501b8d083fdfd4c01f0acc"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
