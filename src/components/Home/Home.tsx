import React from 'react';
import {TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {AppointmentsType} from "../../api/appointments";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../../constants";
interface IProps {

}
export const Home:React.FC<IProps> = () => {
    const navigation = useNavigation()
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{marginLeft: 20}}>
                <Ionicons name="home" size={28} color={COLORS.White}/>
            </TouchableOpacity>
        </>
    );
}

