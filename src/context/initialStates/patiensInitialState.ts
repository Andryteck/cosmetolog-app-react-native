import {IUser} from "../../api/patients";


export default {
    getPatients: {
        data: [] as Omit<IUser[], 'appointments'>,
        error: null as any,
        loading: false as boolean,
    },
    createPatient: {
        data: {},
        error: null,
        loading: false,
    },
    deletePatient: {
        data: {},
        error: null,
        loading: false,
    },
    editPatient: {
        data: {},
        error: null,
        loading: false,
    },
};
