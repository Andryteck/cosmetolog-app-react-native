import axios from '../core/axios';
import {IAppointment} from "./patients";
import {IValues} from "../screens/AddAppointmentScreen";


const settings = {
    headers: {},
};

const instance = axios.create({
    baseURL: 'https://tranquil-sea-21110.herokuapp.com/',
});

export const appointmentAPI = {
    getAppointments() {
        return instance.get<ResponseType>(`appointments/`)
    },
    removeAppointments(id: string) {
        return instance.delete<any>(`appointments/${id}`)
    },
    creatAppointment(values: IValues) {
        return instance.post<any>(`appointments/`, values)
    },
    changeAppointments(id: string, data: Partial<IAppointment>) {
        return instance.patch<any>(`appointments/${id}`, data)
    },
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






