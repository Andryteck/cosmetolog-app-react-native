import React from 'react';
import {TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {AppointmentsType} from "../../api/appointments";
import {useNavigation} from "@react-navigation/native";
interface IProps {

}
export const Users:React.FC<IProps> = () => {
    const navigation = useNavigation()
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate('Patients')}
                style={{marginRight: 20}}>
                <Ionicons name="md-people" size={28} color="black"/>
            </TouchableOpacity>
        </>
    );
}

