import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Container from "../components/Container/Container";
import Button from '../components/Buttons/Button';
import {patientAPI} from "../api/patients";


export const ChangePatientScreen = ({navigation, route}: any) => {
    const {item} = route.params;
    console.log(item)
    const [values, setValues] = useState<any>({
        fullName: item.fullName,
        phone: item.phone,
    });


    const handleChange = (name: string, e: any) => {
        const text = e.nativeEvent.text;
        setValues({
            ...values,
            [name]: text,
        });
    };

    const onSubmit = () => {
        patientAPI
            .changePatient(item._id, values)
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
                <Button color='#87CC6F' onPress={onSubmit}>
                    <Text>Изменить</Text>
                </Button>
            </ButtonView>
        </Container>
    );
};

const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
`;



