import React, {useEffect, useState} from 'react';
import {SectionList, TouchableOpacity, View, Text} from 'react-native';
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import Appointment, {IItem} from '../components/Appointment/Appointment';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import {Ionicons} from '@expo/vector-icons';
import styled from 'styled-components';
import {appointmentAPI} from "../api/appointments";


export const HomeScreen = (props: any) => {
    const {navigation} = props
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchAppointments = () => {
        setIsLoading(true)
        appointmentAPI.getAppointments()
            .then(data => {
                setData(data.items)
                setIsLoading(false)
            }).catch(e => setIsLoading(false))
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

    return (
        <Container>
            <SectionList
                sections={data}
                // @ts-ignore
                keyExtractor={(item: IItem, index) => index}
                onRefresh={fetchAppointments}
                refreshing={isLoading}
                renderItem={({item}) =>
                    <Swipeable
                        rightButtons={
                            [<SwipeView>
                                <Text>left</Text>
                                <Text>right</Text>
                            </SwipeView>]
                        }>
                        <Appointment navigate={navigation.navigate} item={item}/>
                    </Swipeable>
                }
                renderSectionHeader={({section: {title}}) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
            />
            <PlusButton onPress={() => navigation.navigate('AddPatient')}>
                <Ionicons name="ios-add" size={35} color="white"/>
            </PlusButton>
        </Container>
    );
};

const SwipeView = styled(View)`
  width: 70px;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

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
  box-shadow: 0 0 8px #2a86ff;
`;

const Container = styled(View)`
  flex: 1;
`;



