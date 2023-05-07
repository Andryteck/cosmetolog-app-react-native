import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Stack } from 'native-base';
import styled from 'styled-components';
import Container from '../components/Container/Container';
import Button from '../components/Buttons/Button';
import { patientAPI } from '../api/patients';


export const ChangePatientScreen = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { item } = route.params;
  const [values, setValues] = useState<any>({
    fullName: item.fullName,
    phone: item.phone,
    status: item.status,
    instagramUrl: item.instagramUrl
  });


  const handleChange = (name: string, e: any) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    setLoading(true)
    patientAPI
      .changePatient(item._id, values)
      .then(() => {
        navigation.navigate('Home', values);
      })
      .catch((e: any) => {
        alert('BAD');
      }).finally(() => setLoading(false));
  };

  return (
    <Container>
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

        <Input
          onChange={handleChange.bind(null, 'phone')}
          value={values.phone}
          keyboardType="numeric"
          dataDetectorTypes="phoneNumber"
          style={styles.input}
          placeholder='Номер телефона'
        />
        <Input
          onChange={handleChange.bind(null, 'instagramUrl')}
          value={values.instagramUrl}
          style={styles.input}
          placeholder='Ссылка на инстаграм'
        />
      </Stack>
      <ButtonView>
        <Button
          color='#87CC6F'
          onPress={onSubmit}
          disabled={loading}
          loading={loading}>
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

const styles = StyleSheet.create({
  input: {
    height: 60,
    fontSize: 18,
  }
})



