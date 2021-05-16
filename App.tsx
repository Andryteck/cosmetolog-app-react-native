import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs(true)
import AppNavContainer from "./src/navigations";
import GlobalProvider from './src/context/Provider';


function App() {
    return (
        // <GlobalProvider>
            <AppNavContainer/>
        // </GlobalProvider>
    );
}


export default App;
