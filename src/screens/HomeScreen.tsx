import React from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
import Appointment, { IProps } from '../components/Appointment/Appointment';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

const DATA = [
  {
    title: '14 сентября',
    data: [
      {
        time: '15:30',
        diagnosis: 'пульпит',
        isActive: true,
        user: {
          phone: '+ 375 (29) 210-26-62',
          fullName: 'Света Кулик',
          avatar: 'https://sun1.beltelecom-by-minsk.userapi.com/impg/JcdVVKTYYXNSiqIo-FxWyM-Q9naJScmvOZEvFw/3lJZdVAdQTU.jpg?size=50x0&quality=88&crop=0,74,669,669&sign=676b03793d8b2bb4945ac572008268d5&ava=1',
        },
      },
      {
        time: '18:00',
        diagnosis: 'удаление',
        user: {
          phone: '+ 375 (29) 210-26-62',
          fullName: 'Андрей Кулик',
          avatar: 'https://sun1.beltelecom-by-minsk.userapi.com/impg/JcdVVKTYYXNSiqIo-FxWyM-Q9naJScmvOZEvFw/3lJZdVAdQTU.jpg?size=50x0&quality=88&crop=0,74,669,669&sign=676b03793d8b2bb4945ac572008268d5&ava=1',
        },
      },
    ],
  },
  {
    title: '19 сентября',
    data: [
      {
        time: '15:30',
        diagnosis: 'пульпит',
        user: {
          phone: '+ 375 (29) 210-26-62',
          fullName: 'Света Кулик',
          avatar: 'https://sun1.beltelecom-by-minsk.userapi.com/impg/JcdVVKTYYXNSiqIo-FxWyM-Q9naJScmvOZEvFw/3lJZdVAdQTU.jpg?size=50x0&quality=88&crop=0,74,669,669&sign=676b03793d8b2bb4945ac572008268d5&ava=1',
        },
      },
      {
        time: '18:00',
        diagnosis: 'удаление',
        user: {
          phone: '+ 375 (29) 210-26-62',
          fullName: 'Андрей Кулик',
          avatar: 'https://sun1.beltelecom-by-minsk.userapi.com/impg/JcdVVKTYYXNSiqIo-FxWyM-Q9naJScmvOZEvFw/3lJZdVAdQTU.jpg?size=50x0&quality=88&crop=0,74,669,669&sign=676b03793d8b2bb4945ac572008268d5&ava=1',
        },
      },
    ],
  },
  {
    title: '19 сентября',
    data: [
      {
        time: '15:30',
        diagnosis: 'пульпит',
        user: {
          phone: '+ 375 (29) 210-26-60',
          fullName: 'Света Кулик',
          avatar: 'https://sun1.beltelecom-by-minsk.userapi.com/impg/JcdVVKTYYXNSiqIo-FxWyM-Q9naJScmvOZEvFw/3lJZdVAdQTU.jpg?size=50x0&quality=88&crop=0,74,669,669&sign=676b03793d8b2bb4945ac572008268d5&ava=1',
        },
      },
      {
        time: '18:00',
        diagnosis: 'удаление',
        user: {
          phone: '+ 375 (29) 210-26-62',
          fullName: 'Андрей Кулик',
          avatar: 'https://sun1.beltelecom-by-minsk.userapi.com/impg/JcdVVKTYYXNSiqIo-FxWyM-Q9naJScmvOZEvFw/3lJZdVAdQTU.jpg?size=50x0&quality=88&crop=0,74,669,669&sign=676b03793d8b2bb4945ac572008268d5&ava=1',
        },
      },
    ],
  },
];

export const HomeScreen = (props:any) => {
  const { navigation } = props
  return (
    <Container>
      <SectionList
        sections={DATA}
        // @ts-ignore
        keyExtractor={(item: IItem, index) => index}
        renderItem={({ item }) => <Appointment navigate={navigation.navigate} item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle>{title}</SectionTitle>
        )}
      />
      <PlusButton>
        <Ionicons name="ios-add" size={35} color="white" />
      </PlusButton>
    </Container>
  );
};

const PlusButton = styled(TouchableOpacity)`
align-items: center;
justify-content: center;
border-radius: 50px;
width: 64px;
height: 64px;
background: #2A86FF; 
position: absolute;
bottom: 25px;
right: 25px;
box-shadow:0 0 8px #2a86ff;
`;

const Container = styled(View)`
flex: 1;
`;



