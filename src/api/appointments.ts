import axios from '../core/axios';
import {IAppointment} from "./patients";

const settings = {
    headers: {},
};

const instance = axios.create({
    baseURL: 'http://localhost:6666/',
});

export const appointmentAPI = {
    getAppointments() {
        return axios.get<ResponseType>(`http://localhost:6666/appointments/`).then(res => res.data)
    }
}

type ResponseType = {
    status: string,
    items: {
        title: string,
        data: IAppointment[]
    }



}






