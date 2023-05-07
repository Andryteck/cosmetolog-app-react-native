import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppBottomNavigator from './AppBottomNavigator';

const AppNavContainer = () => {
  // const {
  //     authState: {isLoggedIn},
  // } = useContext(GlobalContext);

  return (
    <>
      <NavigationContainer>
        {/*<AppNavigator/>*/}
        <AppBottomNavigator/>
      </NavigationContainer>
    </>
  );
}

export default AppNavContainer
