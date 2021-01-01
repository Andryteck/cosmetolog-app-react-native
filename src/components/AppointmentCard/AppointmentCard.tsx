import React, {useEffect, useState} from 'react';
import {Foundation, Ionicons} from "@expo/vector-icons";
import {Alert, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Badge from "../Badge/Badge";
import styled from "styled-components";
import {appointmentAPI} from "../../api/appointments";
import {Picker} from 'native-base';
import {ratesApi} from "../../api/rates";

export const AppointmentCard = ({item, showAppointments, navigation}: any) => {
    const [show, setIsShow] = useState<boolean>(false)
    const [rate, setRate] = useState<number | undefined | null>(null)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = () => {
        navigation.navigate('ChangeAppointment', item)
        setIsShow(false)
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
    useEffect(() => {
        ratesApi.getUSDRates().then(({data}) => {
            const rate = data.rates.map(i => i.buyRate).pop()
            setRate(rate)
        })
    }, [])

    const handlePick = (value: string) => {
        setTimeout(() => {
            if (value === "Изменить") handleChange()
            if (value === "Удалить") removeAppointment(item._id)
        }, 800)

    }
    const getCurrentRate = () => {
        setIsShow(true)
        // @ts-ignore
        setRate(rate * item.price)
        setDisabled(true)
    }

    return (
        <AppointmentCardContainer>
            <MoreButton>
                <Ionicons name="md-more" size={24} style={{color: '#000000'}}/>
            </MoreButton>

            <Picker
                mode="dropdown"
                style={{width: '20%', position: 'absolute', right: -30}}
                onValueChange={handlePick}
            >
                <Picker.Item label="Изменить" value="Изменить"/>
                <Picker.Item label="Удалить" value="Удалить"/>
            </Picker>

            {/*{show && <Popup style={{*/}
            {/*    shadowColor: '#808080',*/}
            {/*    shadowOpacity: 0.4,*/}
            {/*    shadowRadius: 10*/}
            {/*}}>*/}
            {/*    <TouchableOpacity style={{paddingBottom: 10}} onPress={handleChange}><Text*/}
            {/*        style={{fontSize: 20}}>Изменить</Text></TouchableOpacity>*/}
            {/*    <TouchableOpacity onPress={() => removeAppointment(item._id)}><Text*/}
            {/*        style={{fontSize: 20}}>Удалить</Text></TouchableOpacity>*/}
            {/*</Popup>*/}
            {/*    }*/}

            <AppointmentCardRow>
                <Ionicons name="md-medical" size={16} color="#A3A3A3"/>
                <AppointmentCardLabel>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                    }}>Препарат:</Text>
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 16,
                    }}>{item.preporation}</Text>
                </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow>
                <Foundation name="clipboard-notes" size={16} color="#A3A3A3"/>
                <AppointmentCardLabel>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                    }}>Процедура:</Text>
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 16,
                    }}>{item.procedure}</Text>
                </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow style={{justifyContent: 'space-between', marginTop: 15}}>
                <View style={{borderRadius: 18, overflow: 'hidden'}}>
                    <Badge isActive style={{width: 155}}>{item.date} - {item.time}</Badge>
                </View>
                {show && <View><Text>{rate} BYN</Text></View>}
                <TouchableOpacity style={{borderRadius: 18, overflow: 'hidden'}} onPress={getCurrentRate}
                                  disabled={disabled}>
                    <Badge color={'green'}>{item.price} USD</Badge>
                </TouchableOpacity>
            </AppointmentCardRow>
        </AppointmentCardContainer>
    );
};


const MoreButton = styled(TouchableOpacity)`
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

  z-index: 1;
  margin-top: 16px;
  margin-bottom: 15px;
`;

