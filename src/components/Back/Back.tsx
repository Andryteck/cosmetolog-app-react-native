import React, {useMemo} from 'react';
import {TouchableOpacity, Text} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {useNavigation, useRoute} from "@react-navigation/native";
import { Fontisto } from '@expo/vector-icons';
import { COLORS } from '../../constants';

interface IProps {

}

export const Back: React.FC<IProps> = () => {
    const navigation = useNavigation()

    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{flexDirection: 'row', marginLeft: 5}}>
                <Fontisto name="angle-left" size={24} color={COLORS.White} />
                <Text style={{fontSize: 18, color: COLORS.White, marginTop: 3}}>Back</Text>
            </TouchableOpacity>
        </>
    );
}

