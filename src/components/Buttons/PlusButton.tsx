import styled, { ThemedStyledProps } from 'styled-components';
import { TextProps, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { RefAttributes } from 'react';

interface IProps {
    onPress?: () => void
    isViolet?: boolean
}

export const PlusButton = ({ onPress, isViolet }:IProps) => {
  return (
    <PlusBtn
      onPress={onPress}
      isViolet={isViolet}>
      <Ionicons
        name="ios-add"
        size={35}
        color="white"/>
    </PlusBtn>
  )
}

const getColor = (isViolet: boolean) => {
  if (isViolet) {
    return 'rgb(81, 21,212)'
  }
  return '#2A86FF'
}

const PlusBtn = styled(TouchableOpacity)<IProps>`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 64px;
  height: 64px;
  background: ${(props: any) => getColor(props.isViolet)};
  position: absolute;
  bottom: ${(props: any) => props.isViolet ? -20 : 25};
  right: 25px;
  box-shadow: 0 0 8px #2a86ff;
`;
