import {useEffect, useState} from "react";
import {IValues} from "../screens/AddAppointmentScreen";
import {ChangeAppointmentScreenRouteProp} from "../screens/ChangeAppointmentScreen";

type TProps = {
    _id?: string,
    route?: ChangeAppointmentScreenRouteProp
}
export const useFieldsAutoComplete = ({_id, route}: TProps) => {
    const [values, setValues] = useState<IValues>({
        date: route ? route?.params?.date : "",
        preporation: route ? route?.params?.preporation : "Дерм",
        price: route ? route?.params?.price : 170,
        procedure: route ? route?.params?.procedure : "Губы",
        time: route ? route?.params?.time : "",
        user: _id || '',
    });

    useEffect(() => {
        switch (values.preporation) {
            case 'Дерм':
                setValues({
                    ...values,
                    price: 180
                })
                break
            case 'Рэдж':
                setValues({
                    ...values,
                    price: 150
                })
                break
            case 'Стил':
                setValues({
                    ...values,
                    price: 210
                })
                break
            case 'Ювик':
                setValues({
                    ...values,
                    price: 230
                })
                break
            default:
                return
        }

        switch (values.procedure) {
            case 'Коррекция':
                setValues({
                    ...values,
                    price: 0
                })
                break
            case 'Ботокс':
                setValues({
                    ...values,
                    price: 100,
                    preporation: 'Ботулакс',
                })
                break
            default :
                return;
        }
    }, [values.preporation, values.procedure])

    return {values, setValues}
}
