import React, {useState, useEffect} from 'react';
import {FlatList, Alert, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styled from 'styled-components/native';
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import {Item, Input} from 'native-base';
import {IUser, patientAPI} from "../api/patients";
import Appointment from "../components/Appointment/Appointment";
import {PlusButton} from "../components/Buttons/PlusButton";
import phoneFormat from "../utils/phoneFormat";


export const PatientsScreen = ({navigation, route}: any) => {
    const [data, setData] = useState<Omit<IUser[], 'appointments'> | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchPatients = () => {
        setIsLoading(true);
        patientAPI
            .getPatients()
            .then(({data}) => {
                setData(data.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(fetchPatients, []);

    useEffect(fetchPatients, [route.params]);

    const onSearch = (e: any) => {
        setSearchValue(e.nativeEvent.text);
    };

    const removePatient = (id: string) => {
        Alert.alert(
            'Удаление пациента',
            'Вы действительно хотите удалить пациента?',
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
                        patientAPI
                            .removePatient(id)
                            .then(() => {
                                fetchPatients();
                            })
                            .catch(() => {
                                setIsLoading(false);
                            });
                    }
                }
            ],
            {cancelable: false}
        );
    };

    return (
        <Container>
            {data && (
                <>
                    <View style={{padding: 20}}>
                        <Item style={{paddingLeft: 15, borderRadius: 30}} regular>
                            <Input onChange={onSearch} placeholder="Поиск..." style={{paddingBottom:0}}/>
                        </Item>
                    </View>
                    <FlatList
                        data={data.filter(
                            item =>
                                item.fullName
                                    .toLowerCase()
                                    .indexOf(searchValue.toLowerCase()) >= 0
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={fetchPatients}
                        refreshing={isLoading}
                        renderItem={({item}) => (
                            <Swipeable
                                rightButtons={[
                                    <SwipeViewButton
                                        onPress={() => navigation.navigate('ChangePatient', {item})}
                                        style={{backgroundColor: '#B4C1CB'}}>
                                        <Ionicons name="md-create" size={28} color="white"/>
                                    </SwipeViewButton>,
                                    <SwipeViewButton
                                        onPress={removePatient.bind(null, item._id)}
                                        style={{backgroundColor: '#F85A5A'}}
                                    >
                                        <Ionicons name="ios-close" size={48} color="white"/>
                                    </SwipeViewButton>
                                ]}
                            >
                                <Appointment
                                    navigate={navigation.navigate}
                                    // @ts-ignore
                                    item={{
                                        user: item,
                                        procedure: phoneFormat((item.phone).toString())
                                    }}
                                    fetchPatients={fetchPatients}
                                    show={true}
                                />
                            </Swipeable>
                        )}
                    />
                </>
            )}
            <PlusButton onPress={() => navigation.navigate('AddPatient')}/>
        </Container>
    );
};


const SwipeViewButton = styled(TouchableOpacity)`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(View)`
  flex: 1;
`;
