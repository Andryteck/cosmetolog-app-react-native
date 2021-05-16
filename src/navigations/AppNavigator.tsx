import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "../types/navigate";
import {
    AddAppointmentScreen,
    AddPatientScreen, ChangeAppointmentScreen,
    ChangePatientScreen,
    HomeScreen,
    PatientScreen, PatientsScheduleScreen,
    PatientsScreen
} from "../screens";
import React from "react";

const AppNavigator = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    return (
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
        <Stack.Screen name="ChangePatient" component={ChangePatientScreen} options={{title: 'Изменить пациента', headerTintColor: '#2A86FF'  }} />
        <Stack.Screen name="ChangeAppointment" component={ChangeAppointmentScreen} options={{title: 'Изменить прием', headerTintColor: '#2A86FF'  }} />
        <Stack.Screen name="PatientsSchedule" component={PatientsScheduleScreen} options={{title: 'График приемов', headerTintColor: '#2A86FF'  }} />
    </Stack.Navigator>
    )
}

export default AppNavigator
