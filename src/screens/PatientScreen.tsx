import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Linking} from 'react-native';
import styled from 'styled-components';
import { useFonts, Roboto_500Medium, Roboto_400Regular } from '@expo-google-fonts/roboto';
import GrayText from '../components/GrayText/GrayText';
import ButtonFormula from '../components/Buttons/ButtonFormula';
import ButtonCall from '../components/Buttons/ButtonCall';
import {Foundation, Ionicons} from '@expo/vector-icons';
import Badge from '../components/Badge/Badge';
import {IAppointment, patientAPI} from "../api/patients";
import {PlusButton} from "../components/Buttons/PlusButton";

export const PatientScreen = ({route, navigation}: any) => {
    const [appointments, setAppointments] = useState<IAppointment[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium
    });

    const {user} = route.params;

    useEffect(() => {
        setIsLoading(true)
        patientAPI.showAppointments(user._id).then(({data}) => {
            // @ts-ignore
            setAppointments(data.data.appointments)
            setIsLoading(false)
        })
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <PatientDetails>
                <PatientFullName>{user.fullName}</PatientFullName>
                <GrayText>{user.phone}</GrayText>
                <PatientButtonsWrapper>
                    <ButtonFormula>Препарат</ButtonFormula>
                    <ButtonCall onPress={() => {
                        Linking.openURL(`tel:${user.phone}`).then((value) => console.log(value)).catch((e) => console.log(e));
                    }}>
                        <Foundation name="telephone" size={24} color="white"/>
                    </ButtonCall>
                </PatientButtonsWrapper>
            </PatientDetails>

            <PatientAppointments>
                <Container>
                    {isLoading && <ActivityIndicator size={"large"} color={'#2A86FF'}/>}

                    {appointments.map((appointment: IAppointment) => <AppointmentCard key={appointment._id}
                                                                                      style={{
                                                                                          shadowColor: '#808080',
                                                                                          shadowOpacity: 0.4,
                                                                                          shadowRadius: 10,
                                                                                          marginTop: 16
                                                                                      }}>
                            <MoreButton>
                                <Ionicons name="md-more" size={24} style={{color: '#000000'}}/>
                            </MoreButton>
                            <AppointmentCardRow>
                                <Ionicons name="md-medical" size={16} color="#A3A3A3"/>
                                <AppointmentCardLabel>
                                    <Text style={{fontSize: 16,fontWeight: '600',fontFamily: 'Roboto_500Medium'}}>Препарат:</Text>
                                    <Text style={{marginLeft: 10, fontSize: 16,fontFamily: 'Roboto_400Regular' }}>{appointment.preporation}</Text>
                                </AppointmentCardLabel>
                            </AppointmentCardRow>
                            <AppointmentCardRow>
                                <Foundation name="clipboard-notes" size={16} color="#A3A3A3"/>
                                <AppointmentCardLabel>
                                    <Text style={{fontSize: 16,fontWeight: '600',fontFamily: 'Roboto_500Medium'}}>Процедура:</Text>
                                    <Text style={{marginLeft: 10,fontSize: 16,fontFamily: 'Roboto_400Regular'}}>{appointment.procedure}</Text>
                                </AppointmentCardLabel>
                            </AppointmentCardRow>
                            <AppointmentCardRow style={{justifyContent: 'space-between', marginTop: 15}}>
                                <View style={{borderRadius: 18, overflow: 'hidden'}}>
                                    <Badge isActive style={{width: 155}}>{appointment.date} - {appointment.time}</Badge>
                                </View>
                                <View style={{borderRadius: 18, overflow: 'hidden'}}>
                                    <Badge color={'green'}>{appointment.price} USD</Badge>
                                </View>
                            </AppointmentCardRow>
                        </AppointmentCard>
                    )}
                </Container>
            </PatientAppointments>
            <PlusButton onPress={() => navigation.navigate('AddAppointment', user)}/>
        </View>
    );
};

const MoreButton = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 35px;
  width: 35px;
`

const AppointmentCardRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 6.5px;
  margin-bottom: 3.5px;
`;

const AppointmentCardLabel = styled(View)`
  font-size: 16px;
  margin-left: 10px;
  flex-direction: row;
  margin-right: 20px;
`;

const AppointmentCard = styled(View)`
  padding: 15px 25px;
  border-radius: 10px;
  background: white;

`;

const Container = styled(View)`
  flex: 1;
  padding: 25px;
`;

const PatientDetails = styled(Container)`
  flex: 0.25
`;
const PatientAppointments = styled(View)`
  flex: 1;
  background: #f8fafd;
`;

const PatientButtonsWrapper = styled(View)`
  margin-top: 20px;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

const PatientFullName = styled(Text)`
  font-weight: 800;
  font-size: 28px;
  line-height: 30px;
  margin-bottom: 5px;
`;


