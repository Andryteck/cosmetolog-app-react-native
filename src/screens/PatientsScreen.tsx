import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Alert, View, TouchableOpacity, NativeSyntheticEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import { Input } from 'native-base';
import { patientAPI } from '../api/patients';
import Appointment from '../components/SectionAppointment/Appointment/Appointment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GlobalContext } from '../context/Provider';
import getPatients from '../context/actions/patients/getPatients';


export const PatientsScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const {
    patientsDispatch,
    patientsState: {
      getPatients: { data, loading },
    },
  } = useContext(GlobalContext);

  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getPatients()(patientsDispatch)
  }, []);
  useEffect(
    () => {
      getPatients()(patientsDispatch)
    }, [route.params]);

  const onSearch = (e: NativeSyntheticEvent<any>) => {
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
                getPatients()(patientsDispatch)
              })
              .catch(() => {
                setIsLoading(false);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <View style={{ padding: 20 }}>
        <Input
          onChange={onSearch}
          placeholder="Поиск..."
          autoCorrect={false}
          style={{  height: 40,
            fontSize: 18, }}/>
      </View>

      <>
        <FlatList
          data={data && data.filter(
            item =>
              item.fullName
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) >= 0 ||
                            item.phone
                              .toLowerCase()
                              .indexOf(searchValue.toLowerCase()) >= 0
          )}
          keyExtractor={item => item._id}
          onRefresh={() => getPatients()(patientsDispatch)}
          refreshing={loading}
          renderItem={({ item }) => (
            <Swipeable
              rightButtons={[
                <SwipeViewButton
                  onPress={() => navigation.navigate('ChangePatient', { item })}
                  style={{ backgroundColor: '#B4C1CB' }}>
                  <Ionicons
                    name="md-create"
                    size={28}
                    color="white"/>
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={removePatient.bind(null, item._id)}
                  style={{ backgroundColor: '#F85A5A' }}
                >
                  <Ionicons
                    name="ios-close"
                    size={48}
                    color="white"/>
                </SwipeViewButton>
              ]}
            >
              <Appointment
                navigate={navigation.navigate}
                // @ts-ignore
                item={{
                  user: item,
                  procedure: item.phone
                }}
                // @ts-ignore
                fetchPatients={() => getPatients()(patientsDispatch)}
                show={true}
              />
            </Swipeable>
          )}
        />
      </>
      {/*<PlusButton onPress={() => navigation.navigate('AddPatient')}/>*/}
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
