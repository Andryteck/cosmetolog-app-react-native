import React, {useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {appointmentAPI} from "../api/appointments";
import moment from "moment";

export interface IValues {
    date: Date | string,
    preporation: string,
    price: number | string,
    procedure: string,
    time: string | null,
    user?: string,
}

export const AddAppointmentScreen = ({navigation, route}: any) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [commonDate, setCommonDate] = useState(new Date());
    const {_id} = route.params

    const [values, setValues] = useState<any>({
        date: "",
        preporation: "Дермарен",
        price: 160,
        procedure: "Губы",
        time: "",
        user: _id,
    });
    const openDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible)
        Keyboard.dismiss()
    }

    const setFieldValue = (name: string, value: string) => {
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
        setDatePickerVisibility(!isDatePickerVisible)
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
            .creatAppointment(newValues)
            .then(() => {
                navigation.push('Home', {lastUpdate: new Date()});
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
                    value={values.price.toString()}
                    keyboardType="numeric"
                    style={{marginTop: 12}}
                />
            </Item>
            <>
                <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                    <Label>Дата и Время</Label>
                    <Input value={moment(commonDate).format('YYYY-MM-DD-HH:mm')} onFocus={openDatePicker}/>
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
                <Button onPress={onSubmit} color='#87CC6F'>
                    <Text>Добавить</Text>
                </Button>
            </ButtonView>
        </Container>
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



