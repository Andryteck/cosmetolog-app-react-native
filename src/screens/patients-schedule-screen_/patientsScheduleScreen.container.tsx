import React, {useCallback, useLayoutEffect, useMemo, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {observer} from "mobx-react-lite";
import {PatientScheduleVm} from "./patientSchedule.vm";
import {PatientScheduleComponent} from "./patientsScheduleScreen.component";
import {Users} from "../../components/Users/Users";
import {Home} from "../../components/Home/Home";
import {appointmentService} from "../../services/appointment.service";
import {appointmentStore} from "../../stores/appointment.store";
import {Alert} from "react-native";
import moment from "moment";
import {IAppointment, IUser} from "../../api/patients";

type PatientScheduleProp = {}
type PatientScheduleNavigationProp = any

export const PatientScheduleContainer = observer(({}: PatientScheduleProp): JSX.Element => {
    const navigation = useNavigation<PatientScheduleNavigationProp>();
    const vm = useMemo<PatientScheduleVm>(() => new PatientScheduleVm(), []);

    const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));

    useLayoutEffect(() => {
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
        useCallback(() => {
            getScheduledAppointments()
        }, [selectedDate])
    )

    const handleDayPress = (date: string) => {
        setSelectedDate(date);
    };

    const getScheduledAppointments = () => {
        vm.isLoading = true;
        appointmentService.getScheduledAppointment(selectedDate).then(({data: {data}}) => {
            appointmentStore.setAppointments(data);
        }).finally(() => vm.isLoading = false);
    }

    const showCustomAlert = useCallback((item: IAppointment) => {
        const name = appointmentStore.appointments.find(i => {
            if (i.time === item.time) {
                return i
            }
        })?.procedure

        Alert.alert(
            "",
            `${name !== undefined || null ? name : 'Нет приема'}`,
        );
    }, [])

    const goPatient = (user: IUser | undefined) => {
        navigation.navigate('Patient', {user})
    }

    return <PatientScheduleComponent
        handleDayPress={handleDayPress}
        loading={vm.isLoading}
        getScheduledAppointments={getScheduledAppointments}
        appointmentsWithTime={vm.appointmentsWithTime}
        showCustomAlert={showCustomAlert}
        goPatient={goPatient}
        selectedDate={selectedDate}/>
});
