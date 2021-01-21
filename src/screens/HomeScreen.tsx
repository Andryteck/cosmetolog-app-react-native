import React, {useEffect, useState} from 'react';
import {SectionList, TouchableOpacity, View, Alert} from 'react-native';
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import Appointment from '../components/Appointment/Appointment';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import {Ionicons} from '@expo/vector-icons';
import styled from 'styled-components';
import {appointmentAPI, AppointmentsType} from "../api/appointments";
import {PlusButton} from "../components/Buttons/PlusButton";
import {Users} from "../components/Users/Users";
import { StackScreenProps } from '@react-navigation/stack';
import {RootStackParamList} from "../types/navigate";
import {IAppointment} from "../api/patients";


type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation, route}) => {
    const [data, setData] = useState<AppointmentsType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Users navigation={navigation}/>
            ),
        });
    }, [navigation]);


    const fetchAppointments = () => {
        setIsLoading(true)
        appointmentAPI.getAppointments()
            .then(data => {
                setData(data.data.items)
            })
            .finally(() => {
                return setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

    useEffect(() => {
        fetchAppointments()
    }, [route.params]);

    const removeAppointment = (id: string) => {
        Alert.alert(
            'Удаление приема',
            'Вы действительно хотите удалить прием?',
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => {
                        setIsLoading(true);
                        appointmentAPI
                            .removeAppointments(id)
                            .then(() => {
                                fetchAppointments();
                            })
                            .catch(() => {
                                setIsLoading(false);
                            });
                    }
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <Container>
            <SectionList
                sections={data}
                keyExtractor={(item: IAppointment) => item._id}
                onRefresh={fetchAppointments}
                refreshing={isLoading}
                renderItem={({item, index}) =>
                    <Swipeable
                        rightButtons={[
                            <SwipeViewButton style={{backgroundColor: '#B4C1CB'}}
                            onPress={() => navigation.navigate('ChangeAppointment', item)}
                            >
                                <Ionicons name="md-create" size={28} color="white"/>
                            </SwipeViewButton>,
                            <SwipeViewButton
                                onPress={() => removeAppointment(item._id)}
                                style={{backgroundColor: '#F85A5A'}}
                            >
                                <Ionicons name="ios-close" size={48} color="white"/>
                            </SwipeViewButton>
                        ]}>
                        <Appointment navigate={navigation.navigate} item={item} index={index} show={false}/>
                    </Swipeable>
                }
                renderSectionHeader={({section: {title}}) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
            />
            <PlusButton onPress={() => navigation.navigate('AddPatient')}/>
        </Container>
    );
};


const SwipeViewButton = styled(TouchableOpacity)`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Container = styled(View)`
  flex: 1;
`;



