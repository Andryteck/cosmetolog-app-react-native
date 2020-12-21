import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import DatePicker from 'react-native-datepicker';
import {appointmentAPI} from "../api/appointments";

export interface IValues {
    date: Date | string,
    preporation: string,
    price: number | string,
    procedure: string,
    time: string | null,
    user?: string,
}

export const AddAppointmentScreen = ({navigation, route}: any) => {
    const {_id} = route.params

    const [values, setValues] = useState<any>({
        date: null,
        preporation: "",
        price: 0,
        procedure: "",
        time: null,
        user: _id,
    });

    const setFieldValue = (name: string, value: string) => {
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleInputChange = (name: string, e: any) => {
        const text = e.nativeEvent.text;
        setFieldValue(name, text);
    };

    const fieldsName: IValues = {
        preporation: 'Препарат',
        price: 'Цена',
        date: "Дата",
        time: 'Время',
        procedure: 'Процедура'
    };

    const onSubmit = () => {
        appointmentAPI
            .creatAppointment(values)
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
        <Container>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Процедура</Label>
                <Input
                    onChange={handleInputChange.bind(null, 'procedure')}
                    value={values.fullName}
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
            <Item style={{marginTop: 20, marginLeft: 0}}>
                <TimeRow>
                    <View style={{flex: 1}}>
                        <DatePicker
                            // date={new Date()}
                            mode="date"
                            placeholder="Дата"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            confirmBtnText="Сохранить"
                            cancelBtnText="Отмена"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0
                                },
                                dateText: {
                                    fontSize: 18
                                }
                            }}
                            date={values.date}
                            onDateChange={setFieldValue.bind(null, 'date')}
                        />
                    </View>
                    <View style={{flex: 1, marginTop: 10,}}>
                        <DatePicker
                            mode="time"
                            placeholder="Время"
                            format="HH:mm"
                            minDate={new Date()}
                            confirmBtnText="Сохранить"
                            cancelBtnText="Отмена"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0,
                                },
                                dateText: {
                                    fontSize: 18
                                }
                            }}
                            date={values.time}
                            onDateChange={setFieldValue.bind(null, 'time')}
                        />
                    </View>
                </TimeRow>
            </Item>
            <ButtonView>
                <Button onPress={onSubmit} color='#87CC6F'>
                    {/*fix icon margins*/}
                    {/*<Ionicons name="ios-add" size={24} color="white"/>*/}
                    <Text>Добавить пациента</Text>
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



