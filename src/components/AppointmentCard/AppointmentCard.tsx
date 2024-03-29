import React, { useCallback, useEffect, useState } from 'react';
import { Foundation, Ionicons } from '@expo/vector-icons';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Badge from '../Badge/Badge';
import styled from 'styled-components';
import { appointmentAPI } from '../../api/appointments';
import { ratesApi } from '../../api/rates';
import { Select } from 'native-base';
import { IAppointment } from '../../api/patients';

type TProps = {
    item: IAppointment,
    showAppointments: () => void,
    navigation: any
}

export const AppointmentCard: React.FC<TProps> = ({ item, showAppointments, navigation }) => {
  const [show, setIsShow] = useState<boolean>(false)
  const [rate, setRate] = useState<number | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  const handleChange = () => {
    navigation.navigate('ChangeAppointment', item)
  }

  const removeAppointment = (id: string) => {
    Alert.alert(
      'Удаление приема',
      'Вы действительно хотите удалить прием?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Удалить',
          onPress: () => {
            appointmentAPI
              .removeAppointments(id)
              .then(() => {
                showAppointments();
              })
          }
        }
      ],
      { cancelable: false }
    );
  }
  useEffect(() => {
    ratesApi.getUSDRates().then(({ data }) => {
      const rate = data.map(i => i.USD_out)
      // @ts-ignore
      setRate(+rate[0] * item.price)
    })
  }, [rate])

  const handlePick = (value: string) => {
    setTimeout(() => {
      if (value === 'Изменить') handleChange()
      if (value === 'Удалить') removeAppointment(item._id)
    }, 800)
  }
  const getCurrentRate = useCallback(() => {
    setIsShow(true)
    // @ts-ignore
    setRate(Math.ceil(rate * item.price))
    setDisabled(true)
  }, [rate, item.price])
  // TODO fix ui of select component
  return (
    <AppointmentCardContainer>
      <Select
        style={{ borderWidth: 0, borderColor: '#000000' }}
        dropdownIcon={<Ionicons
          name="ellipsis-vertical-sharp"
          size={24}
          style={{ marginRight: 15 }}/>}
        selectedValue={undefined}
        onValueChange={handlePick}
      >

        <Select.Item
          label="Изменить"
          value="Изменить"/>
        <Select.Item
          label="Удалить"
          value="Удалить"/>
      </Select>

      <AppointmentCardRow>
        <Ionicons
          name="md-medical"
          size={16}
          color="#A3A3A3"/>
        <AppointmentCardLabel>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
            }}>Препарат:</Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
            }}>{item.preporation}</Text>
        </AppointmentCardLabel>
      </AppointmentCardRow>
      <AppointmentCardRow>
        <Foundation
          name="clipboard-notes"
          size={16}
          color="#A3A3A3"/>
        <AppointmentCardLabel>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
            }}>Процедура:</Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
            }}>{item.procedure}</Text>
        </AppointmentCardLabel>
      </AppointmentCardRow>
      <AppointmentCardRow style={{ justifyContent: 'space-between', marginTop: 15 }}>
        <View style={{ borderRadius: 18, overflow: 'hidden' }}>
          <Badge
            isActive
            style={{ width: 155 }}>{item.date} - {item.time}</Badge>
        </View>
        {show && <TouchableOpacity style={{ borderRadius: 18, overflow: 'hidden' }}>
          <Badge color={'default'}>{rate} BYN</Badge>
        </TouchableOpacity>}
        <TouchableOpacity
          style={{ borderRadius: 18, overflow: 'hidden' }}
          onPress={getCurrentRate}
          disabled={disabled}>
          <Badge color={'green'}>{item.price} USD</Badge>
        </TouchableOpacity>
      </AppointmentCardRow>
    </AppointmentCardContainer>
  );
};


const MoreButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 35px;
  width: 35px;
`

const AppointmentCardRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const AppointmentCardLabel = styled(View)`
  font-size: 16px;
  margin-left: 10px;
  flex-direction: row;
  margin-right: 20px;
`;

const AppointmentCardContainer = styled(View)`
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.03);
  padding: 10px 20px;
  border-radius: 10px;
  background: white;

  z-index: 1;
  margin-top: 16px;
  margin-bottom: 15px;
`;

