import {
    GET_PATIENTS_LOADING,
    GET_PATIENTS_SUCCESS,
    GET_PATIENTS_FAIL, IActions,
} from '../../../constants/actionTypes';
import {Dispatch} from "react";
import {IUser, patientAPI} from "../../../api/patients";

interface IGetPatients {
    type: IActions['GET_PATIENTS_SUCCESS']
    payload?: IUser[]
    loading?: boolean
}

export default () => (dispatch: (arg: IGetPatients) => (IGetPatients)) => {
    dispatch({
        type: GET_PATIENTS_LOADING,
    });

    patientAPI
        .getPatients()
        .then(({data}) => {
            dispatch({
                type: GET_PATIENTS_SUCCESS,
                payload: data.data.sort((a: { fullName: { localeCompare: (arg0: any) => IUser[]; }; }, b: { fullName: any; }): IUser[] => a.fullName.localeCompare(b.fullName)),
            });
        }).catch((err) => {
        dispatch({
            type: GET_PATIENTS_FAIL,
            payload: err.response
                ? err.response.data
                : {error: 'Something went wrong, try again'},
        });
    });

};
