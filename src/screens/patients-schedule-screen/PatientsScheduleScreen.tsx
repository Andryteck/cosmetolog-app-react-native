import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    Text,
    ScrollView,
    RefreshControl, TouchableOpacity, Alert
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Badge from '../../components/Badge/Badge';
import {locale} from '../../utils/locale';
import moment, {Moment} from 'moment';
import 'moment/locale/ru';
import {useNavigation} from "@react-navigation/native";
import {IUser} from "../../api/patients";
import {GlobalContext} from "../../context/Provider";
import getAppointments from "../../context/actions/appointmens/getAppointments";
import {Users} from "../../components/Users/Users";
import {Home} from "../../components/Home/Home";
import {appointmentsItems} from "../../utils/appointmentsItems"
import * as _ from 'lodash';
import Calendar from './components/Calendar'
import {COLORS} from "../../constants";

interface IUserWithTime {
    procedure: string;
    id: string,
    time: string,
    user: IUser | undefined
}

export const PatientsScheduleScreen: React.FC = () => {
        const {
            appointmentDispatch,
            appointmentState: {
                // @ts-ignore
                getAppointments: {data, loading, error},
            },
        } = useContext(GlobalContext);
        const [value, setValue] = useState<IUserWithTime[]>([])
        const [date, setDate] = useState<Moment>(moment())
        const [timeOfAppointment, setTimeOfAppointment] = useState<{ time: string, user: IUser | null }[]>([])
        const navigation = useNavigation()

        React.useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <Users isCalendar={true}/>
                ),
                headerLeft: () => (
                    <Home/>
                )
            });
        }, [navigation]);

        // useFocusEffect(
        //     React.useCallback(() => {
        //         getAppointments()(appointmentDispatch)
        //     }, [])
        // );

        // @ts-ignore
        useEffect(() => getAppointments()(appointmentDispatch), [appointmentDispatch])

        useEffect(() => {
            showTimeWithUsers(moment())
        }, [data])
        const showTimeWithUsers = (date: Moment) => {
            setDate(date)
            setValue([{id: '0', time: '0', user: undefined, procedure: ''}])
            data.forEach((i: any) => {
                i.data.forEach((i: any) => {
                    if (date.format('YYYY-MM-DD') === i.date) {
                        setValue(value => [...value, {
                            id: i._id,
                            time: i.time,
                            user: i.user,
                            procedure: i.procedure
                        }])
                    }
                })
            })
        }
        const showCustomAlert = (item: any) => {
            const name = value?.slice(1).find(i => {
                if (i.time === item.time) {
                    return i
                }
            })?.procedure

            Alert.alert(
                "",
                `${name !== undefined || null ? name : 'Нет приема'}`,
            );


        }
        const getTimeOfAppointment = () => {
            const nonDefaultItemArray = value && value.slice(1).map(i => {
                if (i.time !== appointmentsItems.find(item => item.time).time) {
                    return {time: i.time, user: null}
                }
            }).filter(i => i !== undefined)

            const result = [...appointmentsItems, ...nonDefaultItemArray].filter(i => i !== undefined).sort((prev, next) => moment(prev.time, 'HH:mm') - moment(next.time, 'HH:mm'))
            setTimeOfAppointment(_.uniqBy(result, 'time'))
        }
        useEffect(() => {
            getTimeOfAppointment()
        }, [value])

        const renderItem = () => (
            <>
                {
                    timeOfAppointment.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                overflow: 'hidden',
                                borderWidth: 0.5,
                                borderColor: 'rgb(129, 52,175)',
                                marginHorizontal: 7.5,
                                marginVertical: 7.5,
                            }}
                            onPress={() => value.slice(1).some(i => i.time === item.time) ? navigation.navigate('Patient', {
                                user: value?.slice(1).find(i => {
                                    if (i.time === item.time) {
                                        return i
                                    }
                                })?.user
                            }) : navigation.navigate('Patients')}
                            onLongPress={() => showCustomAlert(item)}
                            disabled={false}>
                            {/*{console.log('item', item)}*/}
                            <Badge
                                color={value && value.find(i => i.time === item.time) ? 'purple' : 'dashed'}>{item.time}</Badge>
                        </TouchableOpacity>))
                }
            </>
        )

        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.container}>
                    <Calendar />
                    {/*<CalendarStrip*/}
                    {/*    selectedDate={date}*/}
                    {/*    scrollToOnSetSelectedDate={true}*/}
                    {/*    // scrollable={value.length !== 1}*/}
                    {/*    // scrollable={true}*/}
                    {/*    calendarHeaderStyle={{fontSize: 20}}*/}
                    {/*    style={{flex: 1, paddingTop: 20, paddingBottom: 10}}*/}
                    {/*    calendarColor={'rgb(81, 21,212)'}*/}
                    {/*    iconContainer={{flex: 0.1}}*/}
                    {/*    dateNumberStyle={{fontSize: 18}}*/}
                    {/*    dateNameStyle={{color: 'white', fontSize: 8,}}*/}
                    {/*    onDateSelected={showTimeWithUsers}*/}
                    {/*    locale={locale}*/}
                    {/*    markedDates={[*/}
                    {/*        {*/}
                    {/*            date: date,*/}
                    {/*            dots: [{key: 0, color: 'black', selectedDotColor: 'black'}],*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*/>*/}
                </View>
                <View style={styles.contentContainer}>
                    {
                        loading ?
                            <>
                                <ActivityIndicator size={'large'}/>
                            </>
                            :
                            <>
                                {/*<View style={styles.textContainer}>*/}
                                {/*    <Text style={styles.text}>{value.slice(1).length ? 'Приемы' : `Приемов нет`}</Text>*/}
                                {/*</View>*/}
                                <ScrollView refreshControl={<RefreshControl
                                    tintColor={'gray'}
                                    refreshing={loading}
                                    onRefresh={() => getAppointments()(appointmentDispatch)}
                                />}>

                                    <View style={styles.content}>
                                        {
                                            renderItem()
                                        }
                                    </View>
                                </ScrollView>
                            </>
                    }

                    {/*<PlusButton onPress={() => navigation.navigate('AddPatient')} isViolet={true}/>*/}
                </View>




            </SafeAreaView>
        );
    }
;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.Dark2,
    },
    container: {
        flex: 0.4,
    },
    contentContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        height: 150,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: 'rgb(129, 52,175)'
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
});