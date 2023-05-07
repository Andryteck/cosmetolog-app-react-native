import React, { useCallback, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData, View, StyleSheet } from 'react-native';
import { Input, Stack } from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from '../components/Container/Container';
import { patientAPI } from '../api/patients';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';

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
      .then(({ data }) => {
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
      {/*<Item*/}
      {/*  style={{ marginLeft: 0 }}*/}
      {/*  floatingLabel>*/}
      {/*  <Label>Имя и Фамилия</Label>*/}
      <Stack
        mt={3}
        space={4}>
        <Input
          onChange={handleChange.bind(null, 'fullName')}
          value={values.fullName}
          style={styles.input}
          autoFocus
          placeholder='Имя и Фамилия'
        />
        {/*</Item>*/}
        {/*<Item*/}
        {/*  style={{ marginTop: 20, marginLeft: 0 }}*/}
        {/*  floatingLabel>*/}
        {/*  <Label>Номер телефона</Label>*/}
        <Input
          onChange={handleChange.bind(null, 'phone')}
          value={values.phone}
          keyboardType="numeric"
          dataDetectorTypes="phoneNumber"
          style={styles.input}
          placeholder='Номер телефона'
        />
        {/*</Item>*/}
        {/*<Item*/}
        {/*  style={{ marginTop: 20, marginLeft: 0 }}*/}
        {/*  floatingLabel>*/}
        {/*  <Label>Ссылка на инстаграм</Label>*/}
        <Input
          onChange={handleChange.bind(null, 'instagramUrl')}
          value={values.instagramUrl}
          style={styles.input}
          placeholder='Ссылка на инстаграм'
        />
      </Stack>
      {/*</Item>*/}
      <ButtonView>
        <Button
          onPress={onSubmit}
          color={COLORS.Green1}
          disabled={loading}
          loading={loading}>
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

const styles = StyleSheet.create({
  input: {
    height: 60,
    fontSize: 18,
  }
})

