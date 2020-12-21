import React from 'react';
import {TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';

export const Users = ({navigation}:any) => {
    return (
        <>
            <TouchableOpacity
                onPress={navigation.navigate.bind(null, 'Patients')}
                style={{marginRight: 20}}
            >
                <Ionicons name="md-people" size={28} color="black"/>
            </TouchableOpacity>
        </>
    );
};

