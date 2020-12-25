import React, {useEffect, useState} from 'react';
import {View, Text, Linking, FlatList, ActivityIndicator, SectionList} from 'react-native';
import styled from 'styled-components';
import GrayText from '../components/GrayText/GrayText';
import ButtonCall from '../components/Buttons/ButtonCall';
import {Foundation} from '@expo/vector-icons';
import {IAppointment, patientAPI} from "../api/patients";
import {PlusButton} from "../components/Buttons/PlusButton";
import phoneFormat from "../utils/phoneFormat";
import {AppointmentCard} from '../components/AppointmentCard/AppointmentCard';


export const PatientScreen = ({route, navigation}: any) => {
    const [appointments, setAppointments] = useState<IAppointment[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)

    const {user} = route.params;

    const showAppointments = () => {
        setIsLoading(true)
        patientAPI.showAppointments(user._id)
            .then(({data}) => {
                //@ts-ignore
                setAppointments(data.data.appointments)
            }).finally(() => {
            return setIsLoading(false)
        })
    }

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
            </PatientDetails>

            <PatientAppointments>
                <Container>
                    <FlatList
                        data={appointments}
                        onRefresh={showAppointments}
                        refreshing={isLoading}
                        renderItem={({item}) => <AppointmentCard item={item} show={show} setShow={setShow}  showAppointments={ showAppointments} />}
                        keyExtractor={(item: IAppointment) => item._id}
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

const PatientDetails = styled(Container)`
  flex: 0.1;
  position: relative;
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


