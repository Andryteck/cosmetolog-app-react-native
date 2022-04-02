import React, {useCallback, useState} from 'react';
import {
    Keyboard,
    NativeSyntheticEvent,
    ScrollView,
    Text,
    TextInputChangeEventData,
    TouchableOpacity,
    View
} from 'react-native';
import {Item, Input, Label} from 'native-base';
import styled from 'styled-components';
import Button from '../../../components/Buttons/Button';
import Container from "../../../components/Container/Container";
import DateTimePicker from '@react-native-community/datetimepicker';
import {appointmentAPI} from "../../../api/appointments";
import moment from "moment";
import {useFieldsAutoComplete} from "../../../hooks/useFieldsAutoComplete"
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import Badge from "../../../components/Badge/Badge"
import {COLORS} from "../../../constants";
import IconTouchable from "../../../components/IconTouchable";

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
    const {_id} = route.params
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState<boolean>(false);
    const {values, setValues} = useFieldsAutoComplete({_id})
    const [show, setShow] = useState(false);
    const [input, setInput] = useState<Record<'name', string>[]>([]);

    const addInput = useCallback(() => {
        setInput([...input, {name: ''}])
    }, [input, setInput])

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
        console.log("A date has been picked: ", date);
        // @ts-ignore
        setDate(new Date(Date.parse(date)))
    };
    const fieldsName: IValues = {
        preporation: 'Препарат',
        price: 'Цена',
        date: "Дата",
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
                navigation.push('PatientsSchedule', {lastUpdate: new Date()});
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
        <ScrollView style={{flex: 1}}>
            <Container>
                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                    <Text>Выбрать топ процедур:</Text>
                    <TouchableOpacity style={{
                        marginLeft: 20,
                        borderRadius: 10,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: COLORS.Green1
                    }} onPress={() => setFieldValue('procedure', 'Коррекция')}>
                        <Badge color={'darkGreen'} style={{fontSize: 12}}>
                            Коррекция
                        </Badge>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginLeft: 20,
                        borderRadius: 10,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: COLORS.Green1
                    }} onPress={() => setFieldValue('procedure', 'Ботокс')}>
                        <Badge color={'darkGreen'} style={{fontSize: 12}}>
                            Ботокс
                        </Badge>
                    </TouchableOpacity>
                </View>
                <Item style={{marginLeft: 0}} floatingLabel>
                    <Label>Процедура</Label>
                    <Input
                        onChange={handleInputChange.bind(null, 'procedure')}
                        value={values.procedure}
                        style={{marginTop: 12}}
                        autoFocus
                    />
                </Item>
                <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                    <Label>Препарат</Label>
                    <Input
                        onChange={handleInputChange.bind(null, 'preporation')}
                        value={values.preporation}
                        style={{marginTop: 12}}
                    />
                </Item>
                <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                    <Label>Цена</Label>
                    <Input
                        onChange={handleInputChange.bind(null, 'price')}
                        value={values.price.toString()}
                        keyboardType="numeric"
                        style={{marginTop: 12}}
                    />
                </Item>
                <>
                    {
                        <View>
                            <Item style={{marginTop: 20, marginLeft: 0}} floatingLabel>
                                <Label>Дата и Время</Label>
                                <Input value={moment(date).format('YYYY-MM-DD-HH:mm')} onFocus={openDatePicker}/>
                            </Item>
                            {/*<IconTouchable name='add' iconColor={COLORS.Green1}*/}
                            {/*               style={{position: 'absolute', top: 18, right: 15}}/>*/}
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
                    />
                )}

                <ButtonView>
                    <Button onPress={show ? hideDatePicker : onSubmit} color={COLORS.Green1} loading={loading}
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



