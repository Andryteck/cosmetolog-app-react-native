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
import {AvailabilityPreparationsScreen} from "../screens/AvailabilityPreparationsScreen";
import {COLORS, FONTS} from "../constants";
import {Green1} from "../constants/colors";
import {PNSB} from "../constants/fonts";

const AppNavigator = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    return (
    <Stack.Navigator initialRouteName={'PatientsSchedule'}>
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
        <Stack.Screen name="PatientsSchedule" component={PatientsScheduleScreen} options={{title: 'График приемов', headerTintColor: COLORS.White, headerStyle: {backgroundColor: COLORS.Green1}, headerTitleStyle:{fontSize: 22, fontFamily: FONTS.PNR }}} />
        <Stack.Screen name="AvailabilityPreparations" component={AvailabilityPreparationsScreen} options={{title: 'Наличие расходников', headerTintColor: 'rgb(81, 21,212)', headerStyle: {backgroundColor: 'rgb(229,229,234)'}, headerTitleStyle:{fontSize: 22 }}} />
    </Stack.Navigator>
    )
}

export default AppNavigator
