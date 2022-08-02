import { makeAutoObservable } from 'mobx';
import { appointmentsItems } from '../../utils/appointmentsItems';
import moment from 'moment';
import * as _ from 'lodash';
import { appointmentStore } from '../../stores/appointment.store';

export class PatientScheduleVm {
    isLoading = false;

    constructor() {
      makeAutoObservable(this);
    }

    get appointmentsWithTime() {

      // const result = []
      // const a = {}
      // for (const item of appointmentsItems) {
      //   const clients = appointmentStore.appointments.filter(c => c.time === item.time)
      //   clients.length > 0 ? result.push(...clients) : result.push(item)
      //   console.log('clients', clients)
      //   const clientsWithNewTime = appointmentStore.appointments.map(c => {
      //     if (c.time !== item.time) {
      //       return c
      //     }
      //   })
      //   console.log(12, clientsWithNewTime)
      //   if (clientsWithNewTime.length > 0) {
      //     result.push([...result,...clientsWithNewTime])
      //   }
      // }
      //
      // return result


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