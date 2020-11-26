import React from 'react';
import styled from 'styled-components';
import { Text, TouchableOpacity } from 'react-native';

interface IPropsButton {
  children: any
}

const ButtonFormula = ({ children }: IPropsButton) => {
  return (
    <ButtonWrapper>
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  );
};


const ButtonWrapper = styled(TouchableOpacity)`
display: flex;
justify-content: center;
align-items: center;
border-radius: 30px;
background: #2A86FF;
text-align: center;
width: 260px;
height: 45px;
`;

const ButtonText = styled(Text)`
color: white;
font-weight: 500;
font-size: 16px;
`;

export default ButtonFormula;
