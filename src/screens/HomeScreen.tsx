import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import SectionTitle from '../components/SectionTitle/SectionTitle';
import styled from 'styled-components';
import {appointmentAPI, AppointmentsType} from "../api/appointments";
import {PlusButton} from "../components/Buttons/PlusButton";
import {Users} from "../components/Users/Users";
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from "../types/navigate";
import {IAppointment} from "../api/patients";
import {Schedule} from "../components/Schedule/Schedule";
import moment from "moment"
import {useNavigation, useRoute} from "@react-navigation/native";
import {SectionAppointment} from "../components/SectionAppointment";

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [data, setData] = useState<AppointmentsType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Users/>
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
        loadAppointments();
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

    useEffect(() => {
        const currentDateSectionIndex = data.findIndex((item) => (
           moment().isSame(item.data[0].date, 'day')
        ));
        let timer: NodeJS.Timeout;
        if (currentDateSectionIndex > 0) {
            timer = setTimeout(() => {
                refCurrent.current.scrollToLocation({
                    itemIndex: 0,
                    sectionIndex: currentDateSectionIndex,
                    animated: true,
                    viewPosition: 0,
                });
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [data])

    // const ITEM_HEIGHT = 101;

    const getItemLayout = sectionListGetItemLayout({
        getItemHeight: () => 101,
        getSectionHeaderHeight: () => 86.7,
    });


    const renderItem = useCallback(({item, index}: { item: IAppointment, index: number }): JSX.Element => {
        const {_id} = item
        // const swipeableItemRefs = useRef([]);
        // const toggleSwipeable = (key) => {
        //     swipeableItemRefs.current.forEach((ref, i) => {
        //         if (ref.id !== key) {
        //             swipeableItemRefs.current?.[i]?.swipeable?.close();
        //         }
        //     });
        // };
        return (
           <SectionAppointment id={_id} removeAppointment={removeAppointment} item={item} index={index} />
        )
    }, [data])

//     const viewabilityConfig = {
//         waitForInteraction: true,
//         // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
//         viewAreaCoveragePercentThreshold: 95,
//         // itemVisiblePercentThreshold: 75
//     }
// const onViewableItemsChanged = ({viewableItems, changed}) => {
//     console.log("Visible items are", viewableItems);
//     console.log("Changed in this iteration", changed);
// };
    return (
        <Container>
            <SectionList
                renderItem={renderItem}
                sections={data}
                ref={(ref) => (refCurrent.current = ref)}
                // viewabilityConfig={viewabilityConfig}
                // onViewableItemsChanged={onViewableItemsChanged}
                keyExtractor={(item: IAppointment) => item._id}
                onRefresh={loadAppointments}
                refreshing={isLoading}
                // @ts-ignore
                getItemLayout={getItemLayout}
                renderSectionHeader={({section: {title}}) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
            <PlusButton onPress={() => navigation.navigate('AddPatient')}/>
        </Container>
    );
};



const Container = styled(View)`
  flex: 1;
`;



