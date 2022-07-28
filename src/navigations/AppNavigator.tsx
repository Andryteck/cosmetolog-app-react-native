import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "../types/navigate";
import {
    AddAppointmentScreen,
    AddPatientScreen, ChangeAppointmentScreen,
    ChangePatientScreen,
    HomeScreen,
    PatientScreen, PatientsScheduleScreen,
    PatientsScreen,
    AvailabilityPreparationsScreen
} from "../screens";
import React from "react";
import {COLORS, FONTS} from "../constants";
import {PatientScheduleContainer} from "../screens/patients-schedule-screen_/patientsScheduleScreen.container";

const AppNavigator = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator initialRouteName={'PatientsSchedule'}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Список приемов',
                    headerTintColor: COLORS.White,
                    headerStyle: {backgroundColor: COLORS.Green1},
                    headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR},
                }}
            />
            <Stack.Screen name="Patient" component={PatientScreen} options={{
                title: 'Карта пациента',
                headerTintColor: COLORS.White,
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR},
            }}/>
            <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{
                title: 'Добавить пациента',
                headerTintColor: COLORS.White,
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR},
            }}/>
            <Stack.Screen name="AddAppointment" component={AddAppointmentScreen} options={{
                title: 'Добавить прием',
                headerTintColor: COLORS.White,
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR},
            }}/>
            <Stack.Screen name="Patients" component={PatientsScreen} options={{
                title: 'Пациенты',
                headerTintColor: COLORS.White,
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR}
            }}/>
            <Stack.Screen name="ChangePatient" component={ChangePatientScreen} options={{
                title: 'Изменить пациента',
                headerTintColor: COLORS.White,
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR},
            }}/>
            <Stack.Screen name="ChangeAppointment" component={ChangeAppointmentScreen} options={{
                title: 'Изменить прием',
                headerTintColor: COLORS.White,
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR},
            }}/>
            <Stack.Screen name="PatientsSchedule" component={PatientScheduleContainer} options={{
                title: 'График приемов',
                headerTintColor: COLORS.White,
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR}
            }}/>
            <Stack.Screen name="AvailabilityPreparations" component={AvailabilityPreparationsScreen} options={{
                title: 'Наличие расходников',
                headerTintColor: 'COLORS.White',
                headerStyle: {backgroundColor: COLORS.Green1},
                headerTitleStyle: {fontSize: 22, fontFamily: FONTS.PNR}
            }}/>
        </Stack.Navigator>
    )
}

export default AppNavigator
