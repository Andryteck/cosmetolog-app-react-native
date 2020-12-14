import styled from "styled-components";
import {TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

interface IProps {
    onPress: () => void
}

export const PlusButton = ({onPress}:IProps) => {
    return (
    <PlusBtn onPress={onPress}>
        <Ionicons name="ios-add" size={35} color="white"/>
    </PlusBtn>
    )
}

const PlusBtn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 64px;
  height: 64px;
  background: #2A86FF;
  position: absolute;
  bottom: 25px;
  right: 25px;
  box-shadow: 0 0 8px #2a86ff;
`;
