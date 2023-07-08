import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import AppNavigator from './AppNavigator';
import { AddPatientScreen } from '../screens';
import { AvailabilityPreparationsScreen } from '../screens/AvailabilityPreparationsScreen';
import { Ionicons } from '@expo/vector-icons';
import { Back } from '../components/Back/Back';
import { COLORS, FONTS } from '../constants';
import { OSB, OSR, PNB, PNR, PNSB } from '../constants/fonts';
import * as Font from 'expo-font';
import Apploading from 'expo-app-loading';

const Tab = createBottomTabNavigator();

const AppBottomNavigator = () => {
  const getFonts = () =>
    Font.loadAsync({
      [PNR]: require('../../assets/fonts/ProximaNova-Regular.ttf'),
      [PNSB]: require('../../assets/fonts/ProximaNova-Semibold.ttf'),
      [PNB]: require('../../assets/fonts/ProximaNova-Bold.ttf'),
      [OSR]: require('../../assets/fonts/OpenSans-Regular.ttf'),
      [OSB]: require('../../assets/fonts/OpenSans-Bold.ttf'),
    });

  const [fontsloaded, setFontsLoaded] = useState(false);

  if (!fontsloaded) {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   labelStyle: {
      //     fontSize: 12,
      //   },
      //   activeTintColor: COLORS.White,
      //   inactiveTintColor: COLORS.White_50,
      // }}
      screenOptions={({ route }) => (
        {
          'tabBarActiveTintColor': '#ffffff',
          'tabBarInactiveTintColor': '#ffffff80',
          'tabBarLabelStyle': {
            'fontSize': 12
          },
          'tabBarStyle': [
            { backgroundColor: COLORS.Green1 },
            null
          ],
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

            return <Ionicons
              name={iconName}
              size={size}
              color={color}/>
          },
        })}
    >
      <Tab.Screen
        name="Home"
        component={AppNavigator}
        options={{
          headerShown: false,
          title: 'Расписание',
        }}
      />
      <Tab.Screen
        name="AvailabilityPreparations"
        component={AvailabilityPreparationsScreen}
        options={{
          title: 'Наличие расходников',
          headerTintColor: COLORS.White,
          headerStyle: { backgroundColor: COLORS.Green1 },
          headerTitleStyle: { fontSize: 22, fontFamily: FONTS.PNR }
        }}/>
      <Tab.Screen
        name="AddPatient"
        component={AddPatientScreen}
        options={{
          title: 'Добавить пациента',
          headerTintColor: COLORS.White,
          headerStyle: { backgroundColor: COLORS.Green1 },
          headerTitleStyle: { fontSize: 22, fontFamily: FONTS.PNR },
          headerLeft: () => (
            <Back/>
          )
        }}/>
    </Tab.Navigator>
  );
}

export default AppBottomNavigator;
