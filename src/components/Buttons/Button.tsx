import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, Text, ActivityIndicator} from "react-native";

interface IPropsButton {
    children: any,
    onPress: () => void,
    color: string,
    loading: boolean,
    disabled: boolean
}


const Button: React.FC<IPropsButton> = ({children, color, onPress, loading, disabled}) => (
    <ButtonWrapper onPress={onPress} color={color} disabled={disabled}>
        {loading ? <ActivityIndicator  color={'white'}/> : <ButtonText disabled={disabled}>{children}</ButtonText>}
    </ButtonWrapper>
);

Button.defaultProps = {
    color: '#2a86ff',
};

const ButtonWrapper = styled(TouchableOpacity)<{ color: string, disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${({color}) => color};
  height: 45px;
`;

const ButtonText = styled(Text)<{ disabled: boolean }>`
  color: ${({disabled}) => disabled ? 'black' : 'white'};
  font-weight: 400;
  font-size: 16px;
`;

export default Button;
