import axios from '../core/axios';
import {IAppointment} from "./patients";

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






