import React, {useRef, useState} from 'react';
import {Alert, Platform, ScrollView, Text, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {appointmentAPI} from "../api/appointments";
import {IValues} from "./AddAppointmentScreen";
import moment from 'moment';


export const ChangeAppointmentScreen = ({navigation, route}: any) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [commonDate, setCommonDate] = useState(new Date(Date.parse(route.params.date + 'T' + route.params.time)));
    const [values, setValues] = useState<any>({
        date: route.params.date,
        preporation: route.params.preporation,
        price: route.params.price.toString(),
        procedure: route.params.procedure,
        time: route.params.time,
    });

    const toggling = () => setDatePickerVisibility(!isDatePickerVisible)

    const setFieldValue = (name: string, value: any) => {
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleInputChange = (name: string, e: any) => {
        const text = e.nativeEvent.text;
        setFieldValue(name, text);
    }

    const hideDatePicker = () => {
        toggling()
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        setCommonDate(new Date(Date.parse(date)))
        hideDatePicker();
    };
    const fieldsName: IValues = {
        preporation: 'Препарат',
        price: 'Цена',
        date: "Дата",
        time: 'Время',
        procedure: 'Процедура'
    };

    const onSubmit = () => {
        const newValues = {
            ...values,
            date: moment(commonDate).format('YYYY-MM-DD'),
            time: moment(commonDate).format('HH:mm')
        }
        appointmentAPI
            .changeAppointments(route.params._id, newValues)
            .then(() => {
                navigation.navigate('Home', {lastUpdate: new Date()});
            })
            .catch(e => {
                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach((err: any) => {
                        const fieldName = err.param;
                        // @ts-ignore
                        alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
                    });
                }
            });
    };

    return (
        <ScrollView>
            <Container>
                <Item style={{marginLeft: 0}} floatingLabel>
                    <Label>Процедура</Label>
                    <Input
                        onChange={handleInputChange.bind(null, 'procedure')}
                        value={values.procedure}
                        style={{marginTop: 12}}
                        autoFocus
                    />
                </Item>
                <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                    <Label>Препарат</Label>
                    <Input
                        onChange={handleInputChange.bind(null, 'preporation')}
                        value={values.preporation}
                        style={{marginTop: 12}}
                    />
                </Item>
                <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                    <Label>Цена</Label>
                    <Input
                        onChange={handleInputChange.bind(null, 'price')}
                        value={values.price}
                        keyboardType="numeric"
                        style={{marginTop: 12}}
                    />
                </Item>
                <>
                    <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel onPress={toggling}>
                        <Label>Дата и Время</Label>
                        <Input value={moment(commonDate).format('YYYY-MM-DD-HH:mm')}/>
                    </Item>
                </>
                <DateTimePickerModal
                    mode={'datetime'}
                    date={commonDate}
                    isVisible={isDatePickerVisible}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}

                />

                <ButtonView>
                    <Button onPress={onSubmit} color='#2A86FF'>
                        <Text>Сохранить</Text>
                    </Button>
                </ButtonView>
            </Container>
        </ScrollView>
    );
};


const TimeRow = styled(View)`
  flex-direction: row;
`;


const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
  position: relative;
`;



