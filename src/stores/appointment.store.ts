import {makeAutoObservable} from "mobx";
import {IAppointment} from "../api/patients";

type IScheduledAppointment = IAppointment[]


class AppointmentStore {
    private _appointments: IScheduledAppointment = [];

    constructor() {
        makeAutoObservable(this);
    }

    public setAppointments(appointments: IScheduledAppointment) {
        this._appointments = appointments;
    }

    public get appointments(): IScheduledAppointment {
        return this._appointments;
    }
}

export const appointmentStore = new AppointmentStore();
