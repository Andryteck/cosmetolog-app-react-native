import React, {useMemo, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import { Input } from 'native-base';

type TForm = {
    name: string,
    type: string,
    constraints: [
        {
            name: string,
            options: [
                {
                    property1: string,
                    property2: string
                }
            ]
        }
    ]
}
type TPartners = {
    id: string,
    name: string,
    status: string,
    logo: string,
    smallLogo: string
}
type TFormProps = {
    partner: TPartners
}

const AuthForm: React.FC<TFormProps> = props => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={{uri: props.partner.smallLogo}}/>
                </View>
                <Text style={styles.label}>Password</Text>
                <Input
                    onChange={() => {}}
                    value={''}
                    style={{marginTop: 5}}
                    autoFocus
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>CONTINUE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20}]}>
                        <View style={{width: 10, height: 10, backgroundColor: 'red', marginRight: 10}}></View>
                        <Text style={styles.btnText}>Get help signing in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default AuthForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15
    },
    logo: {width: 50, height: 50, backgroundColor: 'black'},
    label: {
        color: 'rgba(0, 0, 0, 0.3)',
    },
    btnContainer: {
        flexDirection: 'row',
        marginVertical: 25,
    },
    btn: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 10,
    },
    btnText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.3)'
    },
})
