// import React, {useEffect, useMemo, useState} from 'react';
// import {SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput} from 'react-native';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import { MainAPI } from '../../services/CommsLayer'
//
// type TForm = {
//     name: string,
//     type: string,
//     constraints: [
//         {
//             name: string,
//             options: [
//                 {
//                     property1: string,
//                     property2: string
//                 }
//             ]
//         }
//     ]
// }
//
// type TPartners = {
//     id: string,
//     name: string,
//     status: string,
//     logo: string,
//     smallLogo: string
// }
// type TFormProps = {
//     partner: TPartners
// }
//
// const AuthForm: React.FC<TFormProps> = props => {
//     const navigation = useNavigation()
//     const [text, onChangeText] = React.useState<{[name: string]: {text:string}} | string>('');
//     console.log('text', text)
//     const onChange = (name: string) => {
//         return (text: string) => onChangeText({[name]: text});
//     };
//
//     const onSubmit = () => {
//         const {username, password, email} = text
//         MainAPI.postCurrentStepOfAuth(AppEvents.user.jwtToken, props.partner, {[username]: text})
//         .then((data:any) => {MainAPI.getCurrentStepOfAuth(AppEvents.user.jwtToken,props.partner))
//         .then((data) => console.log(data))
//     }
//     const resetAuthState = (token: string | undefined, partner: string) => {
//
//     }
//
//         return (
//         <SafeAreaView style={{flex: 1}}>
//             <View style={styles.container}>
//                 <TouchableOpacity style={styles.back} onPress={() => resetAuthState(AppEvents.user.jwtToken, props.partner)}>
//                     <View style={{width: 5, height: 20, backgroundColor: 'black'}}>
//
//                     </View>
//                     <Text style={styles.backText}>Back</Text>
//                 </TouchableOpacity>
//                 <View style={styles.logo}>
//                     <Image source={{uri: props?.partner?.smallLogo}} style={styles.logoIcon}/>
//                     <Text style={styles.logoText}>{props?.partner?.name || 'Logo'}</Text>
//                 </View>
//                 {
//                     [].map((form) => (
//                         <>
//                             <View>
//                                 <Text style={styles.label}>{form.name}</Text>
//                                 <TextInput
//                                     onChangeText={onChange(form.name)}
//                                     value={text}
//                                     style={styles.input}
//                                     autoFocus
//                                 />
//                             </View>
//                         </>
//                     ))
//                 }
//                 <View style={styles.btnContainer}>
//                     <TouchableOpacity style={styles.btn} onPress={() => onSubmit()}>
//                         <Text style={styles.btnText}>Send</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };
// export default AuthForm
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'rgba(251,247,246,255)',
//         paddingHorizontal: 40,
//         justifyContent: "center",
//     },
//     back: {
//         flexDirection: "row",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderRadius: 15,
//         height: 50,
//         width: 150,
//     },
//     backText: {
//         marginLeft: 10,
//         fontSize: 15,
//     },
//     logo: {
//         justifyContent: "center",
//         alignItems: 'center',
//     },
//     logoIcon: {
//         width: 60, height: 60, backgroundColor: 'black', marginTop: 30,
//     },
//     logoText: {
//         marginTop: 15,
//         fontSize: 25,
//     },
//     label: {fontSize: 15},
//     input: {
//         backgroundColor: 'white',
//         height: 50,
//         borderWidth: 1,
//         borderColor: '#ececec',
//         borderRadius: 20,
//         marginVertical: 15,
//         padding: 15,
//     },
//     btnContainer: {
//         height: 50,
//         marginTop: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 20,
//         borderWidth: 1,
//         borderColor: '#d05966',
//         backgroundColor: '#fc3f53',
//     },
//     btn: {
//         padding: 10,
//     },
//     btnText: {
//         color: 'white',
//         fontWeight: '600',
//     },
// })
