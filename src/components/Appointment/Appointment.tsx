import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styled from 'styled-components';

import GrayText from '../GrayText/GrayText';
import Badge from '../Badge/Badge';

interface IUser {
  fullName: string,
  avatar: string,
}

interface IItem {
  time: string,
  diagnosis: string,
  isActive: boolean,
  user: IUser,
}

export interface IProps {
  item: IItem
  navigate: any
}

const Appointment = ({ item, navigate }: IProps) => {
  return (
    <GroupItem onPress={() => navigate('Patient', item)}>
      <Avatar
        source={{
          uri: item.user.avatar,
        }}
      />
      <View style={{ flex: 1 }}>
        <FullName>{item.user.fullName}</FullName>
        <GrayText>{item.diagnosis}</GrayText>
      </View>
      <View style={{ borderRadius: 18, overflow: 'hidden' }}>
        <Badge isActive={item.isActive}>{item.time}</Badge>
      </View>
    </GroupItem>
  );
};

Appointment.defaultProps = {
  time: '',
  diagnosis: '',
  isActive: false,
  user: {},
};


const FullName = styled(Text)`
font-weight: 600;
font-size: 16px;
`;

const Avatar = styled(Image)`
border-radius: 50px;
height: 40px;
width: 40px;
margin-right: 15px;
`;

const GroupItem = styled(TouchableOpacity)`
align-items:center;
padding: 20px 20px;
flex-direction: row;
border-bottom-width : 1px;
border-bottom-color:  #f3f3f3;
`;


export default Appointment;
