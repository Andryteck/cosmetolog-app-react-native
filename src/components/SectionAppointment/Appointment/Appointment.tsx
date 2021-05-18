import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import GrayText from '../../GrayText/GrayText';
import Badge from '../../Badge/Badge';

import {getAvatarColor} from '../../../utils/getAvacolor';
import {Input, Item} from "native-base";
import {IAppointment, patientAPI} from '../../../api/patients';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../types/navigate";


export interface IProps {
    item: IAppointment
    navigate: any,
    index?: number | undefined,
    fetchPatients?: () => void,
    show: boolean,
}

// @TODO  сделать красивый UI статуса
const Appointment = ({item, navigate, index, fetchPatients, show}: IProps) => {
    const [values, setValues] = useState<{ [key: string]: string | number }>({
        fullName: item?.user?.fullName || '',
        phone: item?.user?.phone || '',
        instagramUrl: item.user?.instagramUrl || '',
        status: item?.user?.status || ''
    });
    const handleChange = (name: string, e: any) => {
        const text = e.nativeEvent.text;
        setValues({
            ...values,
            [name]: text,
        });
    };
    const avatarColors = getAvatarColor(item?.user?.fullName[0].toUpperCase());

    const changeStatus = () => {
        if (item) {
            patientAPI
                .changePatient(item.user._id, values || 'надежный клиент')
                .then(() => fetchPatients && fetchPatients())
                .catch((e: any) => {
                    alert('BAD');
                });
        }
    }

    return (
        <GroupItem onPress={() => navigate('Patient', item)} onLayout={(event) => {
            const {height} = event.nativeEvent.layout;
        }}>
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
                {show && <Item style={{marginLeft: 0, height: 40}}>
                    <Input
                        onChange={handleChange.bind(null, 'status')}
                        value={values.status as string}
                        style={{color: '#8b979f'}}
                        onBlur={changeStatus}
                    />
                </Item>
                }
            </View>
            <View style={{borderRadius: 18, overflow: 'hidden'}}>
                {item.time && <Badge isActive={index === 0}>{item.time}</Badge>}
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
