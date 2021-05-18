import {AppointmentsType} from "../../api/appointments";

export default {
    getAppointments: {
        data: [] as AppointmentsType[],
        error: null as any,
        loading: false as boolean,
    },
};
