import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
console.disableYellowBox = true;

import {AddPatientScreen, HomeScreen, PatientScreen, AddAppointmentScreen, PatientsScreen} from './src/screens';
import { Users } from './src/components/Users/Users';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Список приемов', headerStyle: { elevation: 0.8, shadowOpacity: 0.8}, headerTintColor: '#2A86FF',
          }}
        />
        <Stack.Screen name="Patient" component={PatientScreen} options={{title: 'Карта пациента', headerTintColor: '#2A86FF' }} />
        <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{title: 'Добавить пациента', headerTintColor: '#2A86FF' }} />
        <Stack.Screen name="AddAppointment" component={AddAppointmentScreen} options={{title: 'Добавить прием', headerTintColor: '#2A86FF' }} />
        <Stack.Screen name="Patients" component={PatientsScreen} options={{title: 'Пациенты', headerTintColor: '#2A86FF'  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
