import {makeAutoObservable} from "mobx";
import {appointmentsItems} from "../../utils/appointmentsItems";
import moment from "moment";
import * as _ from "lodash";
import {appointmentStore} from "../../stores/appointment.store";

export class PatientScheduleVm {
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get appointmentsWithTime() {
        const appointments = [] as any[];
        if (appointmentStore.appointments.length) {
            appointmentStore.appointments.forEach((item) => {
                appointments.push({
                    time: item.time,
                    procedure: item.procedure,
                    user: item.user
                })
            })
        }
// TODO avoid case when we have the same time for two appointments
        return _.uniqBy([...appointments, ...appointmentsItems], 'time')
            .sort((prev, next) => moment(prev.time, 'HH:mm') - moment(next.time, 'HH:mm'))
    }
}