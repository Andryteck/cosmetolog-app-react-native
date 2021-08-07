import {
    GET_APPOINTMENTS_FAIL,
    GET_APPOINTMENTS_LOADING,
    GET_APPOINTMENTS_SUCCESS
} from '../../../constants/actionTypes';
import {Dispatch} from "react";
import {IUser, patientAPI} from "../../../api/patients";
import {appointmentAPI} from "../../../api/appointments";

export default () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: GET_APPOINTMENTS_LOADING,
    });

    appointmentAPI
        .getAppointments()
        .then(({data}) => {
            dispatch({
                type: GET_APPOINTMENTS_SUCCESS,
                payload: data.items,
            });
        }).catch((err) => {
        dispatch({
            type: GET_APPOINTMENTS_FAIL,
            payload: err.response
                ? err.response.data
                : {error: 'Something went wrong, try again'},
        });
    });

};
