import React from 'react';
import styled from 'styled-components';
import {Text, TouchableOpacity} from 'react-native';

interface IPropsButton {
    children: any
    onPress: () => void
}

const ButtonCall = ({children, onPress}: IPropsButton) => {
    return (
        <ButtonWrapper>
            <ButtonText onPress={onPress}>{children}</ButtonText>
        </ButtonWrapper>
    );
};


const ButtonWrapper = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  background: #84D269;
  text-align: center;
  width: 45px;
  height: 45px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-weight: 500;
  font-size: 16px;
`;

export default ButtonCall;
