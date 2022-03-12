import React, {useCallback, useState} from 'react';
import {Alert, NativeSyntheticEvent, Text, TextInputChangeEventData, View} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from "../components/Container/Container";
import {patientAPI} from "../api/patients";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {COLORS} from "../constants";

type IForm = {
    _id: string,
    fullName: string,
    phone: string,
    instagramUrl: string
}
// изменить автофокус на реальный ивент
export const AddPatientScreen = () => {
    const navigation = useNavigation()
    const [values, setValues] = useState<IForm>({} as IForm);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (name: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        setValues({
            ...values,
            [name]: text,
        });
    };
    useFocusEffect(
        useCallback(() => {
            return () => setValues({} as IForm)
        }, [])
)
    const onSubmit = () => {
        setLoading(true)
        patientAPI
            .addPatient(values)
            .then(({data}) => {
                navigation.navigate('Patient', {
                    user: {
                        _id: data.data._id,
                        fullName: data.data.fullName,
                        phone: data.data.phone.replace(/[^\d]/g, ''),
                        instagramUrl: data.data.instagramUrl
                    }
                });
            })
            .catch((e: any) => {
                console.log(e.message)
                alert('Введите верный формат');
            }).finally(() => setLoading(false));
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
                <Button onPress={onSubmit} color={COLORS.Green1} disabled={loading} loading={loading}>
                    Добавить пациента
                </Button>
            </ButtonView>
        </Container>
    );
};

const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
`;

