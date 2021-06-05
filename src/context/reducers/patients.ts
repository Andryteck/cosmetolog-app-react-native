import {
    GET_PATIENTS_FAIL,
    GET_PATIENTS_LOADING, GET_PATIENTS_SUCCESS

} from '../../constants/actionTypes';
import {IUser} from "../../api/patients";

export type TPatientsState = {
    getPatients: {
        data: Omit<IUser[], 'appointments'>;
        loading: boolean;
        error: boolean ;
    }
};

const patients = (state: TPatientsState, {type, payload}: {type: string, payload: any}) => {
    switch (type) {
        case GET_PATIENTS_LOADING:
            return {
                ...state,
                getPatients: {
                    ...state.getPatients,
                    loading: true,
                    error: null,
                },
            };

        case GET_PATIENTS_SUCCESS:
            return {
                ...state,
                getPatients: {
                    ...state.getPatients,
                    loading: false,
                    data: payload,
                    error: null,
                },
            };

        case GET_PATIENTS_FAIL:
            return {
                ...state,
                getPatients: {
                    ...state.getPatients,
                    loading: false,
                    error: payload,
                },
            };
        default:
            return state;
    }
};

export default patients;
