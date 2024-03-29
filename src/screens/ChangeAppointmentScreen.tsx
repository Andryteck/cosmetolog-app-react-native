import React, { useState } from 'react';
import {
  Keyboard,
  ScrollView, StyleSheet,
  Text,
  View
} from 'react-native';
import { Input, Stack } from 'native-base';
import styled from 'styled-components';
import Button from '../components/Buttons/Button';
import Container from '../components/Container/Container';
import { appointmentAPI } from '../api/appointments';
import { IValues } from './add-appointment-screen/AddAppointmentScreen';
import moment from 'moment';
import { RootStackParamList } from '../types/navigate';
import { RouteProp } from '@react-navigation/native';
import { Appointment } from '../types/appointment';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFieldsAutoComplete } from '../hooks/useFieldsAutoComplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants';
import { CustomSelect } from '../components/select/Select';

export type ChangeAppointmentScreenRouteProp = RouteProp<RootStackParamList, 'ChangeAppointment'>;
type ChangeAppointmentScreenNavigationProp = StackNavigationProp<RootStackParamList,
    'ChangeAppointment'>;

type Props = {
    route: ChangeAppointmentScreenRouteProp;
    navigation: ChangeAppointmentScreenNavigationProp
};

export const ChangeAppointmentScreen = ({ navigation, route }: Props) => {
  const [commonDate, setCommonDate] = useState(new Date(route?.params?.date + 'T' + route?.params?.time));
  const [loading, setLoading] = useState<boolean>(false);
  const { values, setValues } = useFieldsAutoComplete({ _id: '', route })
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
    // @ts-ignore
    setCommonDate(new Date(Date.parse(date)))
  };

  const fieldsName: IValues = {
    preporation: 'Препарат',
    price: 'Цена',
    date: 'Дата',
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
        navigation.navigate('PatientsSchedule', { lastUpdate: new Date() });
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
        <CustomSelect setFieldValue={setFieldValue}/>
        <Stack
          mt={3}
          space={5}>
          <Input
            onChange={handleInputChange.bind(null, 'procedure')}
            value={values.procedure}
            style={styles.input}
            autoFocus
          />
          <Input
            onChange={handleInputChange.bind(null, 'preporation')}
            value={values.preporation}
            style={styles.input}
          />
          <Input
            onChange={handleInputChange.bind(null, 'price')}
            value={values.price.toString()}
            keyboardType="numeric"
            style={styles.input}
          />
        </Stack>
        <>
          <View style={{ marginTop: 20 }}>
            <Input
              style={styles.input}
              value={moment(commonDate).format('YYYY-MM-DD-HH:mm')}
              onFocus={openDatePicker}/>
          </View>
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
            locale={'ru'}
            textColor={COLORS.Black}
          />
        )}
        <ButtonView>
          <Button
            onPress={show ? hideDatePicker : onSubmit}
            color={COLORS.Green1}
            disabled={loading}
            loading={loading}>
            <Text>Сохранить</Text>
          </Button>
        </ButtonView>
      </Container>
    </ScrollView>
  );
};

const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
  position: relative;
`;

const styles = StyleSheet.create({
  input: {
    height: 60,
    fontSize: 18,
  }
})

