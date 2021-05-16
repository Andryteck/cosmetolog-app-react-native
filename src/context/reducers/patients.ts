import {
    GET_PATIENTS_FAIL,
    GET_PATIENTS_LOADING, GET_PATIENTS_SUCCESS

} from '../../constants/actionTypes';

// export type PatientsState = {
//     data: Starships;
//     isFetching: boolean;
//     error: false | ErrorHttpAction;
// };

const patients = (state: any, {type, payload}: any) => {
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
