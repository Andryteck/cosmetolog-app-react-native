import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import GrayText from '../GrayText/GrayText';
import Badge from '../Badge/Badge';

import {getAvatarColor} from '../../utils/getAvacolor';

interface IUser {
    fullName: string,
    phone: number
}

export interface IItem {
    time?: string,
    procedure: string,
    preporation?: string,
    isActive?: boolean,
    user: IUser,
}

export interface IProps {
    item: IItem
    navigate: any,
}

const Appointment = ({item, navigate}: IProps) => {
    const avatarColors = getAvatarColor(item.user.fullName[0].toUpperCase());

    return (
        <GroupItem onPress={() => navigate('Patient', item)}>
            <Avatar
                style={{
                    backgroundColor: avatarColors.background
                }}
            >
                <Letter style={{color: avatarColors.color}}>
                    {item.user.fullName[0].toUpperCase()}
                </Letter>
            </Avatar>
            <View style={{flex: 1}}>
                <FullName>{item.user.fullName}</FullName>
                <GrayText>{item.procedure}</GrayText>
            </View>
            <View style={{borderRadius: 18, overflow: 'hidden'}}>
                {item.time && <Badge>{item.time}</Badge>}
            </View>
        </GroupItem>
    );
};

Appointment.defaultProps = {
    title: '',
    item: []
};

const Letter = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-top: -1px;
`;

const FullName = styled(Text)`
  font-weight: 600;
  font-size: 16px;
`;

const Avatar = styled(View)`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const GroupItem = styled(TouchableOpacity)`
  align-items: center;
  padding: 20px 20px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: #E0E0E0;
`;


export default Appointment;
