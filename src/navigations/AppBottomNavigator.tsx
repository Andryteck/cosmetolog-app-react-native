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
import {COLORS} from "../constants";

const Tab = createBottomTabNavigator();

const AppBottomNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            labelStyle: {
                fontSize: 12,
            },
            activeTintColor: COLORS.White,
            inactiveTintColor: COLORS.White_50,
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
            },
                tabBarStyle:{backgroundColor: COLORS.Green1}
        })}
            >
            <Tab.Screen name="Home" component={AppNavigator} options={{
                headerShown: false,
                title: 'Расписание',
            }}
            />
            <Tab.Screen name="AvailabilityPreparations" component={AvailabilityPreparationsScreen} options={{
                title: 'Наличие расходников',
                headerTitleStyle: {fontSize: 22},
            }}/>
            <Tab.Screen name="AddPatient" component={AddPatientScreen}
                        options={{
                            title: 'Добавить пациента',
                            headerLeft: () => (
                                <Back/>
                            )
                        }}/>
        </Tab.Navigator>
    );
}

export default AppBottomNavigator;
