import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import {IUser, patientAPI} from "../api/patients";


export const AddPatientScreen = ({navigation}: any) => {
    const [values, setValues] = useState<any>({});

    const handleChange = (name: string, e: any) => {
        const text = e.nativeEvent.text;
        console.log(text)
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
                <Label>Имя и Фамилия</Label>
                <Input
                    onChange={handleChange.bind(null, 'fullName')}
                    value={values.fullName}
                    style={{marginTop: 5}}
                    autoFocus
                />
            </Item>
            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Номер телефона</Label>
                <Input
                    onChange={handleChange.bind(null, 'phone')}
                    value={values.phone}
                    keyboardType="numeric"
                    dataDetectorTypes="phoneNumber"
                    style={{marginTop: 5}}
                />
            </Item>
            <ButtonView>
                <Button onPress={onSubmit} color='#87CC6F'>
                    {/*fix icon margins*/}
                    <Ionicons name="ios-add" size={24} color="white"/>
                    <Text>Добавить пациента</Text>
                </Button>
            </ButtonView>
        </Container>
    );
};

const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
`;


// AddPatientScreen.navigationOptions = {
//     title: 'Добавить пациента',
//     headerTintColor: '#2A86FF',
//     headerStyle: {
//         elevation: 0.8,
//         shadowOpacity: 0.8,
//     },
// };

