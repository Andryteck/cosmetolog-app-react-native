import React, {useEffect, useState} from 'react';
import {
    Keyboard, NativeSyntheticEvent, SafeAreaView,
    ScrollView,
    Text, TextInputChangeEventData, TouchableOpacity,
    View, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Item, Label} from "native-base";
import {Users} from "../components/Users/Users";
import {Schedule} from "../components/Schedule/Schedule";
import {useNavigation} from "@react-navigation/native";

type TData = {
    id: number,
    name: string,
    value: number
}
export const AvailabilityPreparationsScreen = () => {
    const [values, setValues] = useState('')
    const [data, setData] = useState<TData[] | null>([])
    const [error, setError] = useState<string | null>(null)
    // const navigation = useNavigation()

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Users/>
    //         ),
    //     });
    // }, [navigation]);

    const storeData = async (value: Partial<{ ([key]: string): string }>) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
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
        if (values.trim() !== '') {
            setData([...data, {name: values, id: new Date().getMilliseconds(), value: 0}])
            storeData([...data, {name: values, id: new Date().getMilliseconds(), value: 0}])
            setValues('')
        } else {
            setError(' Нужно ввести название препарата или расходника')
        }
    }

    const increaseData = (id: number) => {
        const filteredData = data && data.map(item => item.id === id ? {...item, value: item.value + 1} : item)
        setData(filteredData)
    }

    const decreaseData = (id: number) => {
        const filteredData = data && data.map(item => item.id === id && item.value !== 0 ? {
            ...item,
            value: item.value - 1
        } : item)
        setData(filteredData)
    }
    console.log('data', data)
    useEffect(() => {
        getData().then(data => data && setData(data))
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
                        data && data.length ? data.map((item: any) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={item.id}>
                                <View style={{marginTop: 20, flexDirection: 'row'}}>
                                    <Text style={styles.text}>
                                        {item.name}:
                                    </Text>
                                    <Text style={[styles.text, { marginLeft: 15}]}>
                                        {item.value}
                                    </Text>
                                </View>
                                {
                                    data?.length && (
                                        <View style={{flexDirection: "row"}}>
                                            <TouchableOpacity style={styles.btn} onPress={() => increaseData(item.id)}>
                                                <Text>
                                                    +
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btn} onPress={() => decreaseData(item.id)}>
                                                <Text>
                                                    -
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                        )) : null
                    }
                </>
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
        height: 30,
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
        marginTop: 20,
    },
    text: {
        fontSize: 18,
    }
})
