import axios from '../core/axios';
import { IAppointment } from './patients';
import { IValues } from '../screens/add-appointment-screen/AddAppointmentScreen';
// @ts-ignore
import envs from '../config/env';

const instance = axios.create({
  baseURL: envs.BACKEND_URL,
});

export const appointmentAPI = {
  getAppointments() {
    return instance.get<ResponseType>('appointments/')
  },
  removeAppointments(id: string) {
    return instance.delete<any>(`appointments/${id}`)
  },
  creatAppointment(values: IValues) {
    return instance.post<any>('appointments/', values)
  },
  changeAppointments(id: string, data: Partial<IAppointment>) {
    return instance.patch<any>(`appointments/${id}`, data)
  },
  getScheduledAppointment(date: string) {
    return instance.get<any>(`schedule/${date}`)
  }
}

interface ResponseType {
    status: string,
    items: [{
        title: string,
        data: IAppointment[]
    }]
}

export interface AppointmentsType  {
    title: string,
    data: IAppointment[]
}






