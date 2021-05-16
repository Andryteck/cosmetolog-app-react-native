import React, {createContext, useReducer} from 'react';
import patientsInitialState from './initialStates/patiensInitialState'
import patients from "./reducers/patients";

type TState = {

}

type TContextProps  = {
    state: TState;
    patientsDispatch: ({type}:{type:string}) => void;
}

export const GlobalContext = createContext({} as TContextProps);
type TProps = {}
const GlobalProvider:React.FC<TProps> = ({children}) => {
    const [patientsState, patientsDispatch] = useReducer(
        patients,
        patientsInitialState,
    );

    return (
        <GlobalContext.Provider
            value={{patientsState, patientsDispatch}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
