import { useEffect, useState } from 'react';
import { IValues } from '../screens/add-appointment-screen/components/AddAppointmentScreen';
import { ChangeAppointmentScreenRouteProp } from '../screens/ChangeAppointmentScreen';
import { getPriceValue } from '../utils/getPriceValue';

type TProps = {
    _id?: string,
    route?: ChangeAppointmentScreenRouteProp
}
export const useFieldsAutoComplete = ({ _id, route }: TProps) => {
  const [values, setValues] = useState<IValues>({
    date: route ? route?.params?.date : '',
    preporation: route ? route?.params?.preporation : 'Стил',
    price: route ? route?.params?.price : 240,
    procedure: route ? route?.params?.procedure : 'Губы',
    time: route ? route?.params?.time : '',
    user: _id || '',
  });

  useEffect(() => {
    switch (values.procedure) {
      case 'Губы':
        setValues({
          ...values,
          price: getPriceValue(values.preporation),
        })
        break
      case 'Контурка':
        setValues({
          ...values,
          price: 430
        })
        break
      case 'Подбородок':
      case 'Носогубка':
        setValues({
          ...values,
          price: 155
        })
        break
      case 'Коррекция':
        setValues({
          ...values,
          price: 0,
        })
        break
      case 'Ботокс':
        setValues({
          ...values,
          price: 120,
          preporation: 'Подвал из Китая',
        })
        break
      case 'Модель':
        setValues({
          ...values,
          price: 100,
          preporation: 'Дерм',
        })
        break
      case 'Обучение':
        setValues({
          ...values,
          price: 1200,
          preporation: 'Дерм',
        })
        break
      default :
        setValues({
          ...values,
          price: 240
        })
        break
    }
  }, [values.preporation, values.procedure])

  return { values, setValues }
}
