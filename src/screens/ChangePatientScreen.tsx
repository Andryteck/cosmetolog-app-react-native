import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Container from "../components/Container/Container";


export const ChangePatientScreen = ({navigation,route}: any) => {
    const [values, setValues] = useState<any>({});

    // const {_id} = route.params;
    const handleChange = (name: string, e: any) => {
        const text = e.nativeEvent.text;
        setValues({
            ...values,
            [name]: text,
        });
    };

    // const onSubmit = () => {
    //     patientAPI
    //         .changePatient(_id,values)
    //         .then(() => {
    //             navigation.navigate('Home');
    //         })
    //         .catch((e: any) => {
    //             alert('BAD');
    //         });
    // };

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
                {/*<Button onPress={onSubmit} color='#2A86FF'>*/}
                    <Text style={{marginTop: -10}}>Сохранить</Text>
                {/*</Button>*/}
            </ButtonView>
        </Container>
    );
};

const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
`;




