import { useEffect, useState } from 'react';
import { IValues } from '../screens/add-appointment-screen/AddAppointmentScreen';
import { ChangeAppointmentScreenRouteProp } from '../screens/ChangeAppointmentScreen';
import { getPriceValue } from '../utils/getPriceValue';

type TProps = {
    _id?: string,
    route?: ChangeAppointmentScreenRouteProp
}

export enum Procedures {
  Lips = 'Губы',
  Contour = 'Контурка',
  Chin = 'Подбородок',
  NasalFold = 'Носогубка',
  NasolacrimalSulcus = 'Носослезка',
  Cheekbone = 'Скулы',
  Bio = 'Био',
  Remove = 'Удаление',
  Correction = 'Коррекция',
  BotoxByZone = 'Ботокс одна/две зоны',
  BotoxFullFace = 'Ботокс full face',
  Model = 'Модель',
  Education = 'Обучение',
}

export const useFieldsAutoComplete = ({ _id, route }: TProps) => {
  const [values, setValues] = useState<IValues>({
    date: route ? route?.params?.date : '',
    preporation: route ? route?.params?.preporation : 'Стил',
    price: route ? route?.params?.price : 260,
    procedure: route ? route?.params?.procedure : 'Губы',
    time: route ? route?.params?.time : '',
    user: _id || '',
  });

  useEffect(() => {
    switch (values.procedure) {
      case Procedures.Lips:
        setValues({
          ...values,
          preporation: values.preporation,
          price: getPriceValue(values.preporation),
        })
        break
      case Procedures.Contour:
        setValues({
          ...values,
          price: 450
        })
        break
      case Procedures.Chin:
      case Procedures.NasalFold:
        setValues({
          ...values,
          price: 170
        })
        break
      case Procedures.Correction:
        setValues({
          ...values,
          preporation: 'Стил',
          price: 0,
        })
        break
      case Procedures.BotoxByZone:
        setValues({
          ...values,
          price: 130,
          preporation: 'Подвал из Китая',
        })
        break
      case Procedures.BotoxFullFace:
        setValues({
          ...values,
          price: 600,
          preporation: 'Подвал из Китая',
        })
        break
      case Procedures.NasolacrimalSulcus:
        setValues({
          ...values,
          price: 220,
          preporation: 'Тео',
        })
        break
      case Procedures.Model:
        setValues({
          ...values,
          price: 110,
          preporation: 'Дерм',
        })
        break
      case Procedures.Education:
        setValues({
          ...values,
          price: 1400,
          preporation: 'Дерм',
        })
        break
      case Procedures.Cheekbone:
        setValues({
          ...values,
          price: 320,
          preporation: 'Рэдж',
        })
        break
      case Procedures.Bio:
        setValues({
          ...values,
          price: 100,
          preporation: 'Хуарон',
        })
        break
      default :
        setValues({
          ...values,
          price: 260
        })
        break
    }
  }, [values.preporation, values.procedure])

  return { values, setValues }
}
