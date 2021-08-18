import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    Text,
    ScrollView,
    RefreshControl, TouchableOpacity
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Container from '../components/Container/Container';
import Badge from '../components/Badge/Badge';
import {locale} from '../utils/locale';
import moment, {Moment} from 'moment';
import 'moment/locale/ru';
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {IUser} from "../api/patients";
import {GlobalContext} from "../context/Provider";
import getPatients from "../context/actions/patients/getPatients";
import getAppointments from "../context/actions/appointmens/getAppointments";
import {Users} from "../components/Users/Users";
import {Schedule} from "../components/Schedule/Schedule";
import {Home} from "../components/Home/Home";
import {PlusButton} from "../components/Buttons/PlusButton";
import {appointmentsItems} from "../utils/appointmentsItems"

interface IUserWithTime {
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
        const [value, setValue] = useState<IUserWithTime[]>(data)
        const [date, setDate] = useState<Moment>(moment())
        const [isUser, setIsUser] = useState<boolean>(false)
        const navigation = useNavigation()
        const route = useRoute()

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

        useFocusEffect(
            React.useCallback(() => {
                getAppointments()(appointmentDispatch)
            }, [])
        );

        // @ts-ignore
        useEffect(() => getAppointments()(appointmentDispatch), [])

        useEffect(() => {
            showTimeWithUsers(moment())
        }, [data])
        const showTimeWithUsers = (date: Moment) => {
            console.log('data', data)
            setDate(date)
            setValue([{id: '0', time: '0', user: undefined}])
            data.forEach((i: any) => {
                i.data.forEach((i: any) => {
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
// const getDataWitUsers = appointmentsItems.map(appointment => {
//
//    return value.map(item => {
//         if (appointment.time === item.time) {
//             console.log('item', item)
//             return {
//                 ...item,
//                 user: item.user,
//                 id: item.id
//             }
//         } else {
//             return {
//                 time: item.time
//             }
//         }
//     })
//
// })
//
        console.log('value', value)
        const renderItem = () => (
            <>
                {
                    appointmentsItems.map((item) =>
                        <TouchableOpacity
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
                            }) : null}
                            disabled={false}>
                            <Badge color={value.find(i => i.time === item.time) ? 'purple' : 'dashed'}>{item.time}</Badge>
                        </TouchableOpacity>)
                }
            </>
        )

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(229,229,234)'}}>
                <View style={styles.container}>
                    <CalendarStrip
                        scrollable
                        calendarHeaderStyle={{fontSize: 20}}
                        style={{flex: 1, paddingTop: 20, paddingBottom: 10}}
                        calendarColor={'rgb(81, 21,212)'}
                        iconContainer={{flex: 0.1}}
                        dateNumberStyle={{fontSize: 18}}
                        dateNameStyle={{color: 'white', fontSize: 8,}}
                        onDateSelected={showTimeWithUsers}
                        locale={locale}
                        markedDates={[
                            {
                                date: date,
                                dots: [{key: 0, color: 'black', selectedDotColor: 'black'}],
                            },
                        ]}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {/*<FlatList*/}
                    {/*    scrollEnabled={false}*/}
                    {/*    showsHorizontalScrollIndicator={false}*/}
                    {/*    horizontal={true}*/}
                    {/*    data={value.slice(1)}*/}
                    {/*    keyExtractor={(item) => item.id}*/}
                    {/*    renderItem={({item}) => <Badge isActive={true} style={{marginLeft: 20}}*/}
                    {/*                                   onPress={() => navigation.navigate('Patient', {user: item.user})}>{item.time}</Badge>}*/}
                    {/*/>*/}
                    {
                        loading ?
                            <>
                                <ActivityIndicator size={'large'}/>
                            </>
                            :
                            <>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>{value.slice(1).length ? 'Приемы' : `Приемов нет`}</Text>
                                </View>
                                <ScrollView refreshControl={<RefreshControl
                                    tintColor={'gray'}
                                    refreshing={loading}
                                    onRefresh={() => getAppointments()(appointmentDispatch)}
                                />}>
                                    {/*<View style={styles.content}>*/}
                                    {/*    {*/}
                                    {/*        value.slice(1).map((item) => <Badge key={item.id} isActive={true}*/}
                                    {/*                                            style={styles.item}*/}
                                    {/*                                            onPress={() => navigation.navigate('Patient', {user: item.user})}>{item.time}</Badge>*/}
                                    {/*        )}*/}
                                    {/*</View>*/}

                                    <View style={styles.content}>
                                        {
                                            renderItem()
                                        }
                                    </View>
                                </ScrollView>
                            </>
                    }

                    <PlusButton onPress={() => navigation.navigate('AddPatient')} isViolet={true}/>
                </View>
            </SafeAreaView>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 0.7,
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
