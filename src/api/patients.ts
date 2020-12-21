import axios from '../core/axios';

const settings = {
    headers: {},
};

const instance = axios.create({
    baseURL: 'https://tranquil-sea-21110.herokuapp.com/',
});

export const patientAPI = {
    getPatients() {
        return instance.get<any>(`patients/`)
    },
    removePatient(id: string) {
        return instance.delete<IResponseUser>(`patients/${id}`)
    },
    addPatient(data: any) {
        console.log(data)
        return instance.post<any>(`patients`, data)
    },
    showAppointments(id: string) {
        return instance.get<IResponseUser>(`patients/${id}`)
    }
}

export interface IUser {
    _id: string,
    fullName: string,
    phone: number,
    __v: number,
}

interface IResponseUser {
    status: boolean,
    data: IUser[]
}

export interface IAppointment {
    _id: string,
    user: any,
    procedure: string,
    preporation: string,
    price: number,
    date: string,
    time: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}
