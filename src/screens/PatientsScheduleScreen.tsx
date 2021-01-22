import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {appointmentAPI, AppointmentsType} from "../api/appointments";
import Container from '../components/Container/Container';
import Badge from '../components/Badge/Badge';
import { locale } from '../utils/locale';
import { Moment } from 'moment';
import {IAppointment} from "../api/patients";
import {AppointmentCard} from "../components/AppointmentCard/AppointmentCard";

export const PatientsScheduleScreen: React.FC<any> = () => {
    const [data, setData] = useState<AppointmentsType[]>([])
    const [value, setValue] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchAppointments = () => {
        setIsLoading(true)
        appointmentAPI.getAppointments()
            .then(data => {
                setData(data.data.items)
            })
            .finally(() => {
                return setIsLoading(false)
            })
    }

    const showTimeBadge = (date: Moment) => {
     setValue([])
        data.forEach(i => {
            i.data.forEach(i => {
                if (date.format('YYYY-MM-DD') === i.date) {
                    setValue(value => [...value, i.time])
                }
            })
        })
    }

    useEffect(() => {
        fetchAppointments()
    }, [])
    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <CalendarStrip
                    scrollable
                    style={{height: 200, paddingTop: 20, paddingBottom: 10}}
                    calendarColor={'#3343CE'}
                    calendarHeaderStyle={{color: 'white'}}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={showTimeBadge}
                    locale={locale}
                />
            </View>
            <Container style={{paddingRight: 0}}>
                <FlatList
                    data={value}
                    keyExtractor={(item: string) => item}
                    renderItem={({item}) =><Badge isActive={true} style={{marginBottom: 15}}>{item}</Badge>}
                />
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 0.4}
});
