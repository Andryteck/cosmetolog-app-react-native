import {useEffect, useState} from "react";
import {IValues} from "../screens/add-appointment-screen/components/AddAppointmentScreen";
import {ChangeAppointmentScreenRouteProp} from "../screens/ChangeAppointmentScreen";
import {getPriceValue} from "../utils/getPriceValue";

type TProps = {
    _id?: string,
    route?: ChangeAppointmentScreenRouteProp
}
export const useFieldsAutoComplete = ({_id, route}: TProps) => {
    const [values, setValues] = useState<IValues>({
        date: route ? route?.params?.date : "",
        preporation: route ? route?.params?.preporation : "Стил",
        price: route ? route?.params?.price : 230,
        procedure: route ? route?.params?.procedure : "Губы",
        time: route ? route?.params?.time : "",
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
                    price: 150
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
                    price: 100,
                    preporation: 'Подвал от брауде',
                })
                break
            case 'Модель':
                setValues({
                    ...values,
                    price: 95,
                    preporation: 'Дерм',
                })
                break
            case 'Обучение':
                setValues({
                    ...values,
                    price: 1100,
                    preporation: 'Дерм',
                })
                break
            default :
                setValues({
                    ...values,
                    price: 230
                })
                break
        }
    }, [values.preporation, values.procedure])

    return {values, setValues}
}
