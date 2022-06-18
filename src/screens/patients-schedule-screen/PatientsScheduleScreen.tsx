import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    Text,
    ScrollView,
    RefreshControl, TouchableOpacity, Alert, Image, TouchableWithoutFeedback
} from 'react-native';
import Badge from '../../components/Badge/Badge';
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
import {dhp} from "../../utils/sizes";
import Logo from './img/swetlana_mozheiko_logo.svg';

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
        const [timeOfAppointment, setTimeOfAppointment] = useState<{ time: string }[]>([])
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

        // @ts-ignore
        useEffect(() => getAppointments()(appointmentDispatch), [])

        useEffect(() => {
            if (data) {
                showTimeWithUsers(moment().format('YYYY-MM-DD'))
            }
        }, [data])

        const showTimeWithUsers = useCallback((date: Moment) => {
            setValue([{id: '0', time: '0', user: undefined, procedure: ''}])
            data.forEach((i: any) => {
                i.data.forEach((i: any) => {
                    if (date === i.date) {
                        setValue(value => [...value, {
                            id: i._id,
                            time: i.time,
                            user: i.user,
                            procedure: i.procedure
                        }])
                    }
                })
            })
        }, [setValue, data])

        const showCustomAlert = useCallback((item: any) => {
            const name = value?.slice(1).find(i => {
                if (i.time === item.time) {
                    return i
                }
            })?.procedure

            Alert.alert(
                "",
                `${name !== undefined || null ? name : 'Нет приема'}`,
            );
        }, [value])

        const getTimeOfAppointment = useCallback(() => {
            const nonDefaultItemArray = value && value.slice(1).map(i => {
                if (i.time !== appointmentsItems.find(item => item.time)!.time) {
                    return {time: i.time, user: null}
                }
            }).filter(i => i !== undefined)

            const result = [...appointmentsItems, ...nonDefaultItemArray].filter(i => i !== undefined).sort((prev, next) => moment(prev.time, 'HH:mm') - moment(next.time, 'HH:mm'))
            setTimeOfAppointment(_.uniqBy(result, 'time') as any)
        }, [value, setTimeOfAppointment])

        useEffect(() => {
            if (value) {
                getTimeOfAppointment()
            }
        }, [value])

        const getBadgeColor = (item: { time: string }) => {
            if (value && value.some(i => i.time === item.time)) {
                // if (value && value.some(i => i.user === 'Коррекция')) {
                //     return 'lightGreen'
                // }
                return 'darkGreen'
            } else {
                return 'dashed'
            }
        }

        const renderItem = () => (
            <>
                {
                    timeOfAppointment.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.time}
                            onPress={() => value.slice(1).some(i => i.time === item.time) ? navigation.navigate('Patient', {
                                user: value?.slice(1).find(i => {
                                    if (i.time === item.time) {
                                        return i
                                    }
                                })?.user
                            }) : navigation.navigate('Patients')}
                            onLongPress={() => showCustomAlert(item)}
                            disabled={false}>
                            <Badge
                                color={getBadgeColor(item)}>{item.time}</Badge>
                        </TouchableOpacity>))
                }
            </>
        )

        return (
            <SafeAreaView style={styles.root}>
                <Calendar showTimeWithUsers={showTimeWithUsers}/>
                <ScrollView
                    style={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        tintColor={'gray'}
                        refreshing={loading}
                        onRefresh={() => getAppointments()(appointmentDispatch)}
                    />}
                >
                    {
                        loading ?
                            <>
                                <ActivityIndicator size={'large'}/>
                            </>
                            :
                            <>
                                <View style={styles.content}>
                                    {
                                        renderItem()
                                    }
                                </View>
                                {/*<View style={{minWidth: 100, flexDirection: 'row', marginTop: 15}}>*/}
                                {/*    <View style={styles.row}>*/}
                                {/*        <View style={[styles.time, {marginHorizontal: 0, marginVertical: 0}]}>*/}
                                {/*            <Badge color={'darkGreen'}/>*/}
                                {/*        </View>*/}
                                {/*        <Text style={styles.badgeText}>- Прием</Text>*/}
                                {/*    </View>*/}
                                {/*    <View style={[styles.row, {marginLeft: 10}]}>*/}
                                {/*        <View style={[styles.time, {marginHorizontal: 0, marginVertical: 0}]}>*/}
                                {/*            <Badge color={'lightGreen'}/>*/}
                                {/*        </View>*/}
                                {/*        <Text style={styles.badgeText}>- Коррекция</Text>*/}
                                {/*    </View>*/}
                                {/*</View>*/}
                                <View style={styles.logo}>
                                    <Logo width={300} height={300}/>
                                </View>
                            </>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.Dark2,
    },
    contentContainer: {
        marginTop: dhp(15),
        paddingHorizontal: 15,
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderColor: COLORS.Green2,
        borderWidth: 3,
        borderRadius: 15,
    },
    logo: {
        alignItems: 'center',
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
    time: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: COLORS.Green1,
        marginHorizontal: 7.5,
        marginVertical: 7.5,
    },
    badge: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: COLORS.Green1,
    },
    badgeText: {
        marginLeft: 10,
        color: COLORS.White,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
