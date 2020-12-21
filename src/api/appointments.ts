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






