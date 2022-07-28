import {observer} from "mobx-react-lite";
import {
    ActivityIndicator,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import Calendar from "../patients-schedule-screen/components/Calendar";
import Logo from "../patients-schedule-screen/img/swetlana_mozheiko_logo.svg";
import React from "react";
import {dhp} from "../../utils/sizes";
import {COLORS} from "../../constants";
import Badge from "../../components/Badge/Badge";
import {IAppointment, IUser} from "../../api/patients";

type PatientScheduleProp = {
    handleDayPress: (day: string) => void;
    loading: boolean;
    getScheduledAppointments: () => void;
    appointmentsWithTime: IAppointment[];
    showCustomAlert: (item: IAppointment) => void;
    goPatient: (user: IUser | undefined) => void;
    selectedDate: string;
}

export const PatientScheduleComponent = observer(({
                                                      handleDayPress,
                                                      loading,
                                                      getScheduledAppointments,
                                                      appointmentsWithTime,
                                                      showCustomAlert,
                                                      goPatient,
                                                      selectedDate,
}: PatientScheduleProp): JSX.Element => {
    console.log('appointmentsWithTime', appointmentsWithTime)
    const getBadgeColor = (item: IAppointment) => {
        if (item.user) {
            if (item.procedure === 'Коррекция') {
                return 'darkGreen'
            }
            return 'lightGreen'
        } else {
            return 'dashed'
        }
    }

    const renderItem = () => (
        <>
            {
                appointmentsWithTime && appointmentsWithTime.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.time}
                        onPress={() => goPatient(item.user)}
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
            <Calendar handleDayPress={handleDayPress} selectedDate={selectedDate}/>
            <ScrollView
                style={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl
                    tintColor={'gray'}
                    refreshing={loading}
                    onRefresh={() => getScheduledAppointments()}
                />}
            >
                {
                        <View>
                            <View style={styles.content}>
                                {renderItem()}
                            </View>
                            <View style={{minWidth: 100, flexDirection: 'row', marginTop: 15}}>
                                <View style={styles.row}>
                                    <View style={[styles.time, {marginHorizontal: 0, marginVertical: 0}]}>
                                        <Badge color={'lightGreen'}/>
                                    </View>
                                    <Text style={styles.badgeText}>- Процедура</Text>
                                </View>
                                <View style={[styles.row, {marginLeft: 10}]}>
                                    <View style={[styles.time, {marginHorizontal: 0, marginVertical: 0}]}>
                                        <Badge color={'darkGreen'}/>
                                    </View>
                                    <Text style={styles.badgeText}>- Коррекция</Text>
                                </View>
                            </View>
                            <View style={styles.logo}>
                                <Logo width={300} height={300}/>
                            </View>
                        </View>

                }
            </ScrollView>
        </SafeAreaView>
    )
})

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