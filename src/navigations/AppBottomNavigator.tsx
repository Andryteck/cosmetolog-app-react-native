import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from "react";
import AppNavigator from "./AppNavigator";
import {AddPatientScreen, HomeScreen, PatientScreen, PatientsScheduleScreen} from "../screens";
import {AvailabilityPreparationsScreen} from "../screens/AvailabilityPreparationsScreen";
import {Users} from "../components/Users/Users";
import {Ionicons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import {Home} from "../components/Home/Home";
import {Back} from "../components/Back/Back";

const Tab = createBottomTabNavigator();

const AppBottomNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            labelStyle: {
                fontSize: 12,
            }
        }}
        screenOptions={({route}) => (
            {
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-calendar'
                            : 'ios-calendar-outline';
                    } else if (route.name === 'AvailabilityPreparations') {
                        iconName = focused
                            ? 'ios-list-outline'
                            : 'ios-list';
                    } else if (route.name === 'AddPatient') {
                        iconName = focused
                            ? 'md-people'
                            : 'md-people-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
            }
        })}
            >
            <Tab.Screen name="Home" component={AppNavigator} options={{
                headerShown: false,
                title: 'Расписание',
                // tabBarIcon: () => <Ionicons name="ios-calendar" size={28}/>
            }}
            />
            <Tab.Screen name="AvailabilityPreparations" component={AvailabilityPreparationsScreen} options={{
                title: 'Наличие расходников',
                headerTintColor: 'rgb(81, 21,212)',
                headerStyle: {backgroundColor: 'rgb(229,229,234)'},
                headerTitleStyle: {fontSize: 22},
            }}/>
            <Tab.Screen name="AddPatient" component={AddPatientScreen}
                        options={{
                            title: 'Добавить пациента', headerTintColor: '#2A86FF',
                            // tabBarIcon: () => <Ionicons name="md-people" size={28}/>
                            headerLeft: () => (
                                <Back/>
                            )
                        }}/>
        </Tab.Navigator>
    );
}

export default AppBottomNavigator;
