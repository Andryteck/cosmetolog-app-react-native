import {
    GET_APPOINTMENTS_FAIL,
    GET_APPOINTMENTS_LOADING, GET_APPOINTMENTS_SUCCESS,
    GET_PATIENTS_FAIL,
    GET_PATIENTS_LOADING, GET_PATIENTS_SUCCESS

} from '../../constants/actionTypes';


const appointments = (state: any, {type, payload}: any) => {
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
