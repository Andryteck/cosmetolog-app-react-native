import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import {patientAPI} from "../api/patients";

// изменить автофокус на реальный ивент
export const AddPatientScreen = ({navigation}: any) => {
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
            .then(({data}) => {
                navigation.navigate('Patient', {
                    user: {
                        _id: data.data._id,
                        fullName: data.data.fullName,
                        phone: data.data.phone,
                        instagramUrl: data.data.instagramUrl
                    }
                });
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
            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                <Label>Ссылка на инстаграм</Label>
                <Input
                    onChange={handleChange.bind(null, 'instagramUrl')}
                    value={values.instagramUrl}
                    style={{marginTop: 5}}
                />
            </Item>
            <ButtonView>
                <Button onPress={onSubmit} color='#87CC6F'>
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


// AddPatientScreen.navigationOptions = {
//     title: 'Добавить пациента',
//     headerTintColor: '#2A86FF',
//     headerStyle: {
//         elevation: 0.8,
//         shadowOpacity: 0.8,
//     },
// };

