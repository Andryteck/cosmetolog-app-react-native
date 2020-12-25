import React, {useState} from 'react';
import {Foundation, Ionicons} from "@expo/vector-icons";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import Badge from "../Badge/Badge";
import styled from "styled-components";
import {Roboto_400Regular, Roboto_500Medium, useFonts} from "@expo-google-fonts/roboto";
import {appointmentAPI} from "../../api/appointments";

export const AppointmentCard = ({item, setShow,  showAppointments, show}: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium
    });
    const handleChange = () => {
        // navigation.navigate('')
    }

    const removeAppointment = (id: string) => {
        Alert.alert(
            'Удаление приема',
            'Вы действительно хотите удалить прием?',
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => {
                        setIsLoading(true);
                        appointmentAPI
                            .removeAppointments(id)
                            .then(() => {
                                showAppointments();
                            })
                            .catch(() => {
                                setIsLoading(false);
                            });
                    }
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <AppointmentCardContainer>
            <MoreButton onPress={() => {
                setShow(true)
            }}>
                <Ionicons name="md-more" size={24} style={{color: '#000000'}}/>
            </MoreButton>

            {show && <Popup style={{
                shadowColor: '#808080',
                shadowOpacity: 0.4,
                shadowRadius: 10
            }}>
                <TouchableOpacity style={{paddingBottom: 10}} onPress={() => handleChange()}><Text
                    style={{fontSize: 20}}>Изменить</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => removeAppointment(item._id)}><Text
                    style={{fontSize: 20}}>Удалить</Text></TouchableOpacity>
            </Popup> }

            <AppointmentCardRow>
                <Ionicons name="md-medical" size={16} color="#A3A3A3"/>
                <AppointmentCardLabel>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        fontFamily: 'Roboto_500Medium'
                    }}>Препарат:</Text>
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontFamily: 'Roboto_400Regular'
                    }}>{item.preporation}</Text>
                </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow>
                <Foundation name="clipboard-notes" size={16} color="#A3A3A3"/>
                <AppointmentCardLabel>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        fontFamily: 'Roboto_500Medium'
                    }}>Процедура:</Text>
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 16,
                        fontFamily: 'Roboto_400Regular'
                    }}>{item.procedure}</Text>
                </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow style={{justifyContent: 'space-between', marginTop: 15}}>
                <View style={{borderRadius: 18, overflow: 'hidden'}}>
                    <Badge isActive style={{width: 155}}>{item.date} - {item.time}</Badge>
                </View>
                <View style={{borderRadius: 18, overflow: 'hidden'}}>
                    <Badge color={'green'}>{item.price} USD</Badge>
                </View>
            </AppointmentCardRow>
        </AppointmentCardContainer>
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

const Popup = styled(View)`
  padding: 10px 20px;
  border-radius: 10px;
  background: white;
  position: absolute;
  right: 30px;
  top: 40px;
  z-index: 10;
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

const AppointmentCardContainer = styled(View)`
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.03);
  padding: 15px 25px;
  border-radius: 10px;
  background: white;
  position: relative;
  z-index: 1;
  margin-top: 16px;
  margin-bottom: 15px;
`;

