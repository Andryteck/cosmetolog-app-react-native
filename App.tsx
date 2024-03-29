import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native'
import { observer } from 'mobx-react-lite';

LogBox.ignoreAllLogs(true)
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';


// import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { NativeBaseProvider } from 'native-base';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDay2jUwIKdB5kTWsjfgN7v82bSf6p2u2w',
  authDomain: 'cosmetolog-app.firebaseapp.com',
  // databaseURL: "https://cosmetolog-app-default-rtdb.firebaseio.com",
  projectId: 'cosmetolog-app',
  storageBucket: 'cosmetolog-app.appspot.com',
  messagingSenderId: '646628137853',
  appId: '1:646628137853:web:e092d2e023ce9928558a14',
  measurementId: 'G-C6RTVK0PYM'
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore();


// const database = getDatabase(app);
// console.log('database', database)
const App = observer(() => {
  return (
    <GlobalProvider>
      <NativeBaseProvider>
        <AppNavContainer/>
      </NativeBaseProvider>
    </GlobalProvider>
  )
})

export default App;
// AppRegistry.registerComponent('cosmetologSveta', () => App);
// AppRegistry.registerComponent('cosmetologSveta'.toLowerCase(), () => App);

