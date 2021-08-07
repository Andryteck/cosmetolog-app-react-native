import {
    GET_APPOINTMENTS_FAIL,
    GET_APPOINTMENTS_LOADING, GET_APPOINTMENTS_SUCCESS,
    GET_PATIENTS_FAIL,
    GET_PATIENTS_LOADING, GET_PATIENTS_SUCCESS

} from '../../constants/actionTypes';
import {IAppointment} from "../../api/patients";
import {AppointmentsType} from "../../api/appointments";


export type TAppointmentState = {
    getAppointments: {
        data: AppointmentsType[]
        loading: boolean
        error: boolean
    }
};

const appointments = (state: any, {type, payload}: {type: string, payload: any}) => {
    switch (type) {
        case GET_APPOINTMENTS_LOADING:
            return {
                ...state,
                getAppointments: {
                    ...state.getAppointments,
                    loading: true,
                    error: null,
                },
            };

        case GET_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                getAppointments: {
                    ...state.getAppointments,
                    loading: false,
                    data: payload,
                    error: null,
                },
            };

        case GET_APPOINTMENTS_FAIL:
            return {
                ...state,
                getAppointments: {
                    ...state.getAppointments,
                    loading: false,
                    error: payload,
                },
            };
        default:
            return state;
    }
};

export default appointments;
