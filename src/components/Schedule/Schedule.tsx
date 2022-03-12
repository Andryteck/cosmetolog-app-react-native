import React from 'react';
import {TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from "../../constants";

export const Schedule: React.FC<any> = ({navigation}) => {
    return (
        <>
            <TouchableOpacity
                onPress={navigation.navigate.bind(null, 'PatientsSchedule')}
                style={{marginLeft: 20}}
            >
                <Ionicons name="ios-calendar" size={28} color={COLORS.White}/>
            </TouchableOpacity>
        </>
    );
};

