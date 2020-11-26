import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import GrayText from '../components/GrayText/GrayText';
import ButtonFormula from '../components/Buttons/ButtonFormula';
import ButtonCall from '../components/Buttons/ButtonCall';
import { Foundation, Ionicons } from '@expo/vector-icons';
import Badge from '../components/Badge/Badge';

export const PatientScreen = ({ route, navigation }: any) => {
  const { user } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <PatientDetails>
        <PatientFullName>{user.fullName}</PatientFullName>
        <GrayText>{user.phone}</GrayText>
        <PatientButtonsWrapper>
          <ButtonFormula>Формула зубов</ButtonFormula>
          <ButtonCall>
            <Foundation name="telephone" size={24} color="white" />
          </ButtonCall>
        </PatientButtonsWrapper>
      </PatientDetails>

      <PatientAppointments>
        <Container>
          <AppointmentCard>
            <MoreButton>
              <Ionicons name="md-more" size={24} color='rgba(0,0,0,0,4)' />
            </MoreButton>
            <AppointmentCardRow>
              <Ionicons name="md-medical" size={16} color="#A3A3A3" />
              <AppointmentCardLabel>Зуб:
                <Text style={{ fontWeight: '600' }}>12</Text>
              </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow>
              <Foundation name="clipboard-notes" size={16} color="#A3A3A3" />
              <AppointmentCardLabel>Диагноз:
                <Text style={{ fontWeight: '600' }}>пульпит</Text>
              </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow style={{ justifyContent: 'space-between', marginTop: 15 }}>
              <View style={{ borderRadius: 18, overflow: 'hidden' }}>
                <Badge isActive style={{ width: 155 }}>11.10.2019 - 15:40</Badge>
              </View>
              <View style={{ borderRadius: 18, overflow: 'hidden' }}>
                <Badge color={'green'}>1500 P</Badge>
              </View>
            </AppointmentCardRow>
          </AppointmentCard>
        </Container>
      </PatientAppointments>
    </View>
  );
};

const MoreButton = styled(TouchableOpacity)`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
right: 10px;
top: 10px;
height: 35px;
width: 35px;
`

const AppointmentCardLabel = styled(Text)`
font-size: 16px;
margin-left: 10px;
`;

const AppointmentCardRow = styled(View)`
flex-direction: row;
align-items: center;
margin-top: 6.5px;
margin-bottom: 3.5px;
`;

const AppointmentCard = styled(View)`
shadow-color: gray;
shadow-opacity: 0.4;
shadow-radius: 10;

padding: 15px 25px;
border-radius: 10px;
background: white;

`;

const Container = styled(View)`
flex: 1;
padding: 25px;
`;

const PatientDetails = styled(Container)`
flex: 0.25
`;
const PatientAppointments = styled(View)`
flex: 1;
background: #f8fafd;
`;

const PatientButtonsWrapper = styled(View)`
margin-top: 20px;
flex-direction: row;
flex: 1;
justify-content: space-between;
`;

const PatientFullName = styled(Text)`
font-weight: 800;
font-size: 28px;
line-height: 30px;
margin-bottom: 5px;
`;


