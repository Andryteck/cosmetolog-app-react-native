import React, {useContext} from "react";
import {GlobalContext} from "../context/Provider";
import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "./AppNavigator";

const AppNavContainer = () => {
    // const {
    //     authState: {isLoggedIn},
    // } = useContext(GlobalContext);

    return (
        <>
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        </>
    );
}

export default AppNavContainer
