import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {appointmentAPI, AppointmentsType} from "../api/appointments";
import Container from '../components/Container/Container';
import Badge from '../components/Badge/Badge';
import {locale} from '../utils/locale';
import {Moment} from 'moment';
import 'moment/locale/ru';
import {useNavigation, useRoute} from "@react-navigation/native";
import {IUser} from "../api/patients";

interface IUserWithTime {
    id: string,
    time: string,
    user: IUser | undefined
}

export const PatientsScheduleScreen: React.FC = () => {
    const [data, setData] = useState<AppointmentsType[]>([])
    const [value, setValue] = useState<IUserWithTime[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigation = useNavigation()
    const route = useRoute()
    const fetchAppointments = () => {
        setIsLoading(true)
        appointmentAPI.getAppointments()
            .then(data => {
                setData(data.data.items)
            }).finally(() => {
            return setIsLoading(false)
        })
    }

    // const showTimeBadge = (date: Moment) => {
    //     setValue([])
    //     data.forEach(i => {
    //         i.data.forEach(i => {
    //             if (date.format('YYYY-MM-DD') === i.date) {
    //                 setValue(value => [...value, i.time])
    //             }
    //         })
    //     })
    // }
    console.log('value', value)
    const showTimeWithUsers = (date: Moment) => {
        setValue([{id: '0', time: '0', user: undefined}])
        data.forEach(i => {
            i.data.forEach(i => {
                if (date.format('YYYY-MM-DD') === i.date) {
                    setValue(value => [...value, {
                        id: i._id,
                        time: i.time,
                        user: i.user
                    }])
                }
            })
        })
    }

    useEffect(fetchAppointments, [])
    useEffect(fetchAppointments, [route.params])

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <CalendarStrip
                    scrollable
                    style={{height: 200, paddingTop: 20}}
                    calendarColor={'#3343CE'}
                    calendarHeaderStyle={{color: 'white'}}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={showTimeWithUsers}
                    locale={locale}
                />
            </View>
            <Container style={{paddingRight: 10, paddingLeft: 10}}>
                <FlatList
                    horizontal={true}
                    data={value.slice(1)}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Badge isActive={true} style={{marginLeft: 20}}
                                                   onPress={() => navigation.navigate('Patient', {user: item.user})}>{item.time}</Badge>}
                />
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 0.45}
});
