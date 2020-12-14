import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import {patientAPI} from "../api/patients";


export const AddAppointmentScreen = ({navigation}: any) => {
    const [values, setValues] = useState<any>({});

    const handleChange = (name: string, e: any) => {
        const text = e.nativeEvent.text;
        setValues({
            ...values,
            [name]: text,
        });
    };

    const onSubmit = () => {
        patientAPI
            .addPatient(values)
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((e: any) => {
                alert('BAD');
            });
    };

    return (
        <Container>
            <Item style={{marginLeft: 0}} floatingLabel>
                <Label>Процедура</Label>
                <Input
                    onChange={handleChange.bind(null, 'procedure')}
                    value={values.fullName}
                    style={{marginTop: 5}}
                    autoFocus
                />
            </Item>
            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Препарат</Label>
                <Input
                    onChange={handleChange.bind(null, 'preporation')}
                    value={values.preporation}
                    style={{marginTop: 5}}
                />
            </Item>
            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Цена</Label>
                <Input
                    onChange={handleChange.bind(null, 'price')}
                    value={values.price}
                    keyboardType="numeric"
                    style={{marginTop: 5}}
                />
            </Item>
            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Дата приема</Label>
                <Input
                    onChange={handleChange.bind(null, 'date')}
                    value={values.date}
                    style={{marginTop: 5}}
                />
            </Item>
            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Время приема</Label>
                <Input
                    onChange={handleChange.bind(null,  'time')}
                    value={values.time}
                    style={{marginTop: 5}}
                />
            </Item>
            <ButtonView>
                <Button onPress={onSubmit} color='#87CC6F'>
                    {/*fix icon margins*/}
                    <Ionicons name="ios-add" size={24} color="white"/>
                    <Text style={{marginTop: -10}}>Добавить пациента</Text>
                </Button>
            </ButtonView>
        </Container>
    );
};

const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
`;



