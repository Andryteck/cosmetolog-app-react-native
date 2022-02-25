import React, {useMemo} from 'react';
import {TouchableOpacity} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {AppointmentsType} from "../../api/appointments";
import {useNavigation, useRoute} from "@react-navigation/native";
import {COLORS} from "../../constants";
interface IProps {
    isCalendar?: boolean
}
export const Users:React.FC<IProps> = ({isCalendar}) => {
    const navigation = useNavigation()
    const route = useRoute()

    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate('Patients')}
                style={{marginRight: 20}}>
                <Ionicons name="md-people" size={28} color={isCalendar ? COLORS.White : 'black'}/>
            </TouchableOpacity>
        </>
    );
}

