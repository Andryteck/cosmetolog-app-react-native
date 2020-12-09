import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity,Text} from "react-native";

interface IPropsButton {
    children: any
    onPress: () => void,
    color: string
}


const Button = ({children, color, onPress}: IPropsButton) => (
    // @ts-ignore
    <ButtonWrapper onPress={onPress} color={color}>
        <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
);

Button.defaultProps = {
    color: '#2a86ff',
};

const ButtonWrapper = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${(props:any) => props.color};
  height: 45px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-weight: 400;
  font-size: 16px;
`;

export default Button;
