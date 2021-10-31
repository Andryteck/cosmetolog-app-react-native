import React, {useState} from 'react';
import {
    Keyboard,
    ScrollView,
    Text,
    View
} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import {appointmentAPI} from "../api/appointments";
import {IValues} from "./AddAppointmentScreen";
import moment from 'moment';
import {RootStackParamList} from "../types/navigate";
import {RouteProp} from '@react-navigation/native';
import {Appointment} from '../types/appointment';
import {StackNavigationProp} from "@react-navigation/stack";
import {useFieldsAutoComplete} from "../hooks/useFieldsAutoComplete";
import DateTimePicker from "@react-native-community/datetimepicker";

export type ChangeAppointmentScreenRouteProp = RouteProp<RootStackParamList, 'ChangeAppointment'>;
type ChangeAppointmentScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'ChangeAppointment'>;

type Props = {
    route: ChangeAppointmentScreenRouteProp;
    navigation: ChangeAppointmentScreenNavigationProp
};

export const ChangeAppointmentScreen = ({navigation, route}: Props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [commonDate, setCommonDate] = useState(new Date(route?.params?.date + 'T' + route?.params?.time));
    const [loading, setLoading] = useState<boolean>(false);
    const {values, setValues} = useFieldsAutoComplete({_id: '', route})
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

    const handleInputChange = (name: string, e: any) => {
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
        // @ts-ignore
        const newValues: Appointment = {
            ...values,
            date: moment(commonDate).format('YYYY-MM-DD'),
            time: moment(commonDate).format('HH:mm'),
        }
        appointmentAPI
            .changeAppointments(route?.params?._id, newValues)
            .then(() => {
                navigation.navigate('PatientsSchedule', {lastUpdate: new Date()});
            })
            .catch(e => {
                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach((err: any) => {
                        const fieldName = err.param;
                        // @ts-ignore
                        alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
                    });
                }
            }).finally(() => setLoading(false));
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
                        value={values.price.toString()}
                        keyboardType="numeric"
                        style={{marginTop: 12}}
                    />
                </Item>
                <>
                    <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                        <Label>Дата и Время</Label>
                        <Input value={moment(commonDate).format('YYYY-MM-DD-HH:mm')}
                               onFocus={openDatePicker}/>
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
                    <Button onPress={show ? hideDatePicker : onSubmit} color='#2A86FF' disabled={loading} loading={loading}>
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



