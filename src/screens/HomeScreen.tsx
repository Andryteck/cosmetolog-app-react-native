import React, {MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
    SectionList,
    TouchableOpacity,
    View,
    Alert,
    Animated,
    ScrollView,
    Text,
    PixelRatio,
    InteractionManager
} from 'react-native';
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import Appointment from '../components/Appointment/Appointment';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import {Ionicons} from '@expo/vector-icons';
import styled from 'styled-components';
import {appointmentAPI, AppointmentsType} from "../api/appointments";
import {PlusButton} from "../components/Buttons/PlusButton";
import {Users} from "../components/Users/Users";
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from "../types/navigate";
import {IAppointment} from "../api/patients";
import {Schedule} from "../components/Schedule/Schedule";
import moment from "moment"

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation, route}) => {
    const [data, setData] = useState<AppointmentsType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Users />
            ),
            headerLeft: () => (
                <Schedule navigation={navigation}/>
            )
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
    const loadAppointments = useCallback(async () => await fetchAppointments(), [fetchAppointments])
    useEffect(() => {
        loadAppointments()
    }, [])

    useEffect(() => {
        loadAppointments()
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
    let refCurrent = useRef<any>(null)
    const getCurrentScroll = () => {

    }

    useEffect(() => {
        let timerId: NodeJS.Timeout
        data.forEach((item, index) => {
            if (moment().format('YYYY-MM-DD') <= item.data[0].date) {
                timerId && clearTimeout(timerId)
                timerId = setTimeout(() => {
                    refCurrent.current.scrollToLocation({
                        itemIndex: 0,
                        sectionIndex: index,
                        animated: false,
                        viewPosition: 0
                    })
                    // за 50ms
                }, 50)
            }
        })
    }, [data, refCurrent])

    const ITEM_HEIGHT = 20;
    const getItemLayout = (data: any, index: any) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });
    return (
        <Container>
            <SectionList
                sections={data}
                //@ts-ignore
                ref={(ref) => (refCurrent.current = ref)}
                keyExtractor={(item: IAppointment) => item._id}
                onRefresh={fetchAppointments}
                refreshing={isLoading}
                getItemLayout={getItemLayout}
                // onLayout={scrollToInitialPosition}
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



