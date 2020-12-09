import axios from '../core/axios';

const settings = {
    headers: {},
};

const instance = axios.create({
    baseURL: 'http://localhost:6666/',
});

export const patientAPI = {
    getPatient(patientId: string) {
        return instance.get<IResponse>(`patients/${patientId}`)
    },
    addPatient(data: any) {
        return instance.post<any>(`patients`, data)
    }
}

export interface IUser {
    fullName: string,
    phone: number
}

interface IResponseUser {
    _id: string,
    fullName: string,
    phone: number,
    __v: number,
}

interface IResponse extends IResponseUser {
    appointments: IAppointment[]
}

export interface IAppointment {
    _id: string,
    user: any,
    procedure: string,
    price: number,
    date: string,
    time: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}
