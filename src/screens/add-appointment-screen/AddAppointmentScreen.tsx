import React, { useState } from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  ScrollView, StyleSheet,
  TextInputChangeEventData,
  View
} from 'react-native';
import { Input, Stack } from 'native-base';
import styled from 'styled-components';
import Button from '../../components/Buttons/Button';
import Container from '../../components/Container/Container';
import DateTimePicker from '@react-native-community/datetimepicker';
import { appointmentAPI } from '../../api/appointments';
import moment from 'moment';
import { useFieldsAutoComplete } from '../../hooks/useFieldsAutoComplete'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants';
import { CustomSelect } from '../../components/select/Select';

type ParamList = {
    AddAppointment: {
        _id: string;
    };
};

export interface IValues {
    date: Date | string,
    preporation: string,
    price: number | string,
    procedure: string,
    time: string | null,
    user?: string,
}

export const AddAppointmentScreen: React.FC = () => {
  const navigation = useNavigation<any>()
  const route = useRoute<RouteProp<ParamList, 'AddAppointment'>>()
  const { _id } = route.params
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const { values, setValues } = useFieldsAutoComplete({ _id })
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

  const handleInputChange = (name: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  }

  const hideDatePicker = () => {
    setShow(!show)
  };

  const handleConfirm = (event: any, date: Date) => {
    console.log('A date has been picked: ', date);
    // @ts-ignore
    setDate(new Date(Date.parse(date)))
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
    const newValues = {
      ...values,
      date: moment(date).format('YYYY-MM-DD'),
      time: moment(date).format('HH:mm')
    }
    appointmentAPI
      .creatAppointment(newValues)
      .then(() => {
        navigation.push('PatientsSchedule', { lastUpdate: new Date() });
      })
      .catch(e => {
        if (e.response.data && e.response.data.message) {
          e.response.data.message.forEach((err: any) => {
            const fieldName = err.param;
            // @ts-ignore
            alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
          });
        }
      }).finally(() => {
        return setLoading(false)
      });
  };

  return (
    <ScrollView style={styles.container}>
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
          {
            <View style={{ marginTop: 20 }}>
              <Input
                value={moment(date).format('YYYY-MM-DD-HH:mm')}
                onFocus={openDatePicker}
                style={styles.input}
              />
            </View>
          }
        </>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            // @ts-ignore
            mode={'datetime'}
            value={date}
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
            loading={loading}
            disabled={loading}>
                        Добавить
          </Button>
        </ButtonView>
      </Container>
    </ScrollView>
  )
};

const ButtonView = styled(View)`
  flex: 1;
  margin-top: 30px;
  position: relative;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
  },
  input: {
    height: 60,
    fontSize: 18,
  }
})


