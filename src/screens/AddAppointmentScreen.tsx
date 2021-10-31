import React, {useEffect, useState} from 'react';
import {Keyboard, NativeSyntheticEvent, Platform, Text, TextInputChangeEventData, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import {appointmentAPI} from "../api/appointments";
import moment from "moment";
import {useFieldsAutoComplete} from "../hooks/useFieldsAutoComplete"
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";

type ParamList = {
    AddAppointment: {
        _id: string;
    };
};

export interface IValues {
    date: Date | string,
    preporation: string,
    price: number | string,
    procedure: string,
    time: string | null,
    user?: string,
}

export const AddAppointmentScreen: React.FC = () => {
    const navigation = useNavigation<any>()
    const route = useRoute<RouteProp<ParamList, 'AddAppointment'>>()
    const {_id} = route.params
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [commonDate, setCommonDate] = useState(new Date());
    const [loading, setLoading] = useState<boolean>(false);
    const {values, setValues} = useFieldsAutoComplete({_id})
    const [show, setShow] = useState(false);

    const openDatePicker = () => {
        setShow(!show)
        Keyboard.dismiss()
    }

    const setFieldValue = (name: string, value: string) => {
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleInputChange = (name: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        setFieldValue(name, text);
    }

    const hideDatePicker = () => {
        setShow(!show)
    };

    const handleConfirm = (event: any, date: Date) => {
        console.log("A date has been picked: ", date);
        // @ts-ignore
        setCommonDate(new Date(Date.parse(date)))
    };
    const fieldsName: IValues = {
        preporation: 'Препарат',
        price: 'Цена',
        date: "Дата",
        time: 'Время',
        procedure: 'Процедура'
    };

    const onSubmit = () => {
        setLoading(true)
        const newValues = {
            ...values,
            date: moment(commonDate).format('YYYY-MM-DD'),
            time: moment(commonDate).format('HH:mm')
        }
        appointmentAPI
            .creatAppointment(newValues)
            .then(() => {
                navigation.push('PatientsSchedule', {lastUpdate: new Date()});
            })
            .catch(e => {
                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach((err: any) => {
                        const fieldName = err.param;
                        // @ts-ignore
                        alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
                    });
                }
            }).finally(() => {
            return setLoading(false)
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
            {show && (
            <DateTimePicker
                testID="dateTimePicker"
                // @ts-ignore
                mode={'datetime'}
                value={commonDate}
                // @ts-ignore
                onChange={handleConfirm}
                is24Hour={true}
                display={'spinner'}
            />
            )}

            <ButtonView>
                <Button onPress={show ? hideDatePicker : onSubmit} color='#87CC6F' loading={loading} disabled={loading}>
                    Добавить
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



