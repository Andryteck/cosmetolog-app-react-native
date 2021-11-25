import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs(true)
import AppNavContainer from "./src/navigations";
import GlobalProvider from './src/context/Provider';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDay2jUwIKdB5kTWsjfgN7v82bSf6p2u2w",
    authDomain: "cosmetolog-app.firebaseapp.com",
    databaseURL: "https://cosmetolog-app-default-rtdb.firebaseio.com",
    projectId: "cosmetolog-app",
    storageBucket: "cosmetolog-app.appspot.com",
    messagingSenderId: "646628137853",
    appId: "1:646628137853:web:e092d2e023ce9928558a14",
    measurementId: "G-C6RTVK0PYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
// const database = getDatabase(app);
// console.log('database', database)
function App() {
    return (
        <GlobalProvider>
            <AppNavContainer/>
        </GlobalProvider>
    );
}


export default App;
