import React, {useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    Linking,
    FlatList, TouchableOpacity, Alert,
} from 'react-native';
import styled from 'styled-components';
import GrayText from '../components/GrayText/GrayText';
import ButtonCall from '../components/Buttons/ButtonCall';
import {Foundation} from '@expo/vector-icons';
import {IAppointment, patientAPI} from "../api/patients";
import {PlusButton} from "../components/Buttons/PlusButton";
import phoneFormat from "../utils/phoneFormat";
import {AppointmentCard} from '../components/AppointmentCard/AppointmentCard';
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../types/navigate";
import {StackNavigationProp} from "@react-navigation/stack";

type PatientScreenRouteProp = RouteProp<RootStackParamList, 'Patient'>;
type PatientScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'Patient'>;

type Props = {
    route: PatientScreenRouteProp;
    navigation: PatientScreenNavigationProp
};

export const PatientScreen: React.FC<Props> = ({route, navigation}) => {
    const [appointments, setAppointments] = useState<IAppointment[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {user} = route.params;

    const showAppointments = () => {
        setIsLoading(true)
        patientAPI.showAppointments(user._id)
            .then(({data}) => {
                //@ts-ignore
                setAppointments(data.data.appointments.reverse())
            }).finally(() => {
            return setIsLoading(false)
        })
    }
    const handlePress = useCallback(async () => {
        try {
            const supported = await Linking.canOpenURL(user.instagramUrl);

            if (supported) {
                await Linking.openURL(user.instagramUrl);
            } else {
                Alert.alert('Введенная ссылка неверная', 'Проверьте ссылку');
            }
        } catch (e) {
            Alert.alert('Инстаграмм не введен');
        }

    }, [user.instagramUrl]);

    useEffect(() => {
        showAppointments()
    }, [user._id])


    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <PatientDetails>
                <PatientFullName>{user.fullName}</PatientFullName>
                <GrayText>{phoneFormat(user.phone)}</GrayText>
                <PatientButtonsWrapper>
                    <ButtonCall onPress={() => {
                        Linking.openURL(`tel:${user.phone}`)
                    }}>
                        <Foundation name="telephone" size={24} color="white"/>
                    </ButtonCall>
                </PatientButtonsWrapper>
                <TouchableOpacity onPress={handlePress} style={{marginTop: 5}}>
                    <PatientLink>Cсылка на инстаграм</PatientLink>
                </TouchableOpacity>
            </PatientDetails>

            <PatientAppointments>
                <Container>
                    <FlatList
                        data={appointments}
                        keyExtractor={(item: IAppointment) => item._id}
                        onRefresh={showAppointments}
                        refreshing={isLoading}
                        renderItem={({item}) => <AppointmentCard item={item} showAppointments={showAppointments}
                                                                 navigation={navigation}/>}
                    />
                </Container>
            </PatientAppointments>
            <PlusButton onPress={() => navigation.navigate('AddAppointment', user)}/>
        </View>
    );
};


const Container = styled(View)`
  flex: 1;
  padding: 20px;
`;

const PatientLink = styled(Text)`
  font-size: 16px;
  color: #8b979f;
  text-decoration: underline #8b979f;
`

const PatientDetails = styled(Container)`
  flex: 0.1;
`;
const PatientAppointments = styled(View)`
  flex: 1;
  background: #f8fafd;
`;

const PatientButtonsWrapper = styled(View)`
  margin-top: 20px;
  flex-direction: row;
  position: absolute;
  top: 5px;
  right: 25px;
  flex: 1;
  justify-content: space-between;
`;

const PatientFullName = styled(Text)`
  font-weight: 800;
  font-size: 28px;
  line-height: 30px;
  margin-bottom: 5px;
`;


