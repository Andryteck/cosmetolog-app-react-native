import React, {useEffect, useState} from 'react';
import {
    Keyboard, NativeSyntheticEvent, SafeAreaView,
    ScrollView,
    Text, TextInputChangeEventData, TouchableOpacity,
    View, StyleSheet, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Item, Label} from "native-base";
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import {Ionicons} from "@expo/vector-icons";
import styled from "styled-components";
import {firestore} from "../../App";
import {doc, setDoc, getDoc, collection, getDocs, deleteDoc, addDoc} from "firebase/firestore";
import _ from "lodash";

type TData = {
    id: string,
    name: string,
    value: number
}
export const AvailabilityPreparationsScreen = () => {
    const [values, setValues] = useState('')
    const [data, setData] = useState<TData[] | null>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    // const navigation = useNavigation()

    const storeDataToStorage = async (value: Partial<{ ([key]: string): string }>) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const storeData = () => {

    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    async function addConsumable(item, id: string) {
        if (item) {
            await setDoc(doc(firestore, "Consumables", id), item);
        }

    }

    async function changeConsumable(item, id: string) {
        if (item && id) {
            await setDoc(doc(firestore, "Consumables", id), item);
        }
    }

    async function deleteData(id: string) {
        await deleteDoc(doc(firestore, "Consumables", id));
    }

    const clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // clear error
        }
    }

    // clearAll()
    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        if (error !== null) {
            setError(null)
        }
        const {text} = e.nativeEvent;
        setValues(text)
    }

    const addNewField = () => {
        const newId = new Date().getMilliseconds().toString()
        if (values.trim() !== '') {
            setData([...data, {name: values, value: 0, id: newId}])
            // storeData([...data, {name: values, id: new Date().getMilliseconds(), value: 0}])
            addConsumable({name: values, value: 0}, newId)
            setValues('')
        } else {
            setError(' Нужно ввести название препарата или расходника')
        }
    }

    const increaseData = (id: string) => {
        const filteredData = data && data.map(item => {
            const newValue = {...item, value: item.value + 1}
            if (item.id === id) {
                changeConsumable(_.omit(newValue, ['id']), id)
                return newValue
            } else return item
        })
        setData(filteredData)
        // storeDataToStorage(filteredData)
    }

    const decreaseData = (id: string) => {
        const filteredData = data && data.map(item => {
            const newValue = {...item, value: item.value - 1}
            if (item.id === id && item.value !== 0) {
                changeConsumable(_.omit(newValue, ['id']), id)
                return newValue
            } else return item
        })
        setData(filteredData)
    }

    const onDelete = (id: string) => {
        const filteredData = data && data.filter(item => item.id !== id)
        setData(filteredData)
        deleteData(id)
    }

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const querySnapshot = await getDocs(collection(firestore, "Consumables"));
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                let id = doc.id;
                setData((prev) => [...prev, {...data, id: id}])
                setLoading(false)
            });
        }
        getData()

    }, [])


    return (
        <ScrollView style={{padding: 25}}>
            <View style={{}}>
                <Label>Введите препарат или расходник</Label>
                <Item>
                    <Input
                        onChange={value => {
                            onChange(value)
                        }}
                        value={values}
                    />
                </Item>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={addNewField}>
                <Text>
                    Добавить
                </Text>
            </TouchableOpacity>
            <View>
                <>
                    {
                    loading ?
                    <>
                        <ActivityIndicator size={'large'}/>
                    </>
                    :
                        data && data.length ? data.map((item: any) => (
                            <Swipeable
                                // TODO change id from db
                                key={item.id}
                                rightButtons={[
                                    <SwipeViewButton style={{backgroundColor: '#B4C1CB'}}
                                                     onPress={() => onDelete(item.id)}
                                    >
                                        <Ionicons name="ios-close" size={25} color="white"/>
                                    </SwipeViewButton>,
                                ]}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: 45
                                }} key={item.id}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styles.text}>
                                            {item.name}:
                                        </Text>
                                        <Text style={[styles.text, {marginLeft: 15}]}>
                                            {item.value}
                                        </Text>
                                    </View>
                                    {
                                        data?.length && (
                                            <View style={{flexDirection: "row"}}>
                                                <TouchableOpacity style={styles.btn}
                                                                  onPress={() => increaseData(item.id)}>
                                                    <Text>
                                                        +
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.btn}
                                                                  onPress={() => decreaseData(item.id)}>
                                                    <Text>
                                                        -
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                </View>
                            </Swipeable>
                        )) : null
                    }
                </>
                {/*<>*/}
                {/*    {*/}
                {/*        test && test.map(i => <Text>{`${i.name} : ${i.value}`}</Text>)*/}
                {/*    }*/}
                {/*</>*/}
                <>
                    {error && <Text>{error}</Text>}
                </>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    addBtn: {
        width: '100%',
        height: 35,
        backgroundColor: 'rgb(229,229,234)',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
    },
    text: {
        fontSize: 18,
    }
})

const SwipeViewButton = styled(TouchableOpacity)`
  width: 45px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
`;
