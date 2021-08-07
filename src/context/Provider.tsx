import React, {createContext, useReducer} from 'react';
import patientsInitialState from './initialStates/patiensInitialState'
import appointmentInitialState from './initialStates/appointmentsInitialState'
import patients, {TPatientsState} from "./reducers/patients";
import appointments, {TAppointmentState} from "./reducers/appointments";

type TState = {}

type TContextProps = {
    patientsState: TPatientsState,
    appointmentState: TAppointmentState,
    patientsDispatch: ({type}: { type: string }) => void,
    appointmentDispatch: ({type}: { type: string }) => void,
}

export const GlobalContext = createContext<Partial<TContextProps>>({})
type TProps = {}
const GlobalProvider: React.FC<TProps> = ({children}) => {
    const [patientsState, patientsDispatch] = useReducer(
        patients,
        patientsInitialState,
    );
    const [appointmentState, appointmentDispatch] = useReducer(
        appointments,
        appointmentInitialState,
    );

    return (
        <GlobalContext.Provider
            value={{patientsState, appointmentState, appointmentDispatch, patientsDispatch}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
