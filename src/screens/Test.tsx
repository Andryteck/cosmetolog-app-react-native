// import React, {useState} from 'react';
// import {SafeAreaView, View, Text, StyleSheet, FlatList, Image} from "react-native";
//
// type TCompanies = {
//     id: string,
//     name: string,
//     status: string,
//     logo: string,
//     smallLogo: string,
// }
//
// export const Test: React.FC = () => {
//     const [companies, setCompanies] = useState<TCompanies[]>([1, 2, 3, 4] as TCompanies[])
//     const [showCloseIcon, setShowCloseIcon] = useState<boolean>(true)
//
//     return (
//         <SafeAreaView style={{flex: 1}}>
//             <View style={styles.container}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>Companies</Text>
//
//                 </View>
//                 <View style={styles.searchContainer}>
//                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                         <View style={styles.searchIcon}></View>
//                         <Text style={styles.searchText}>Search</Text>
//                     </View>
//                     {showCloseIcon && <View style={styles.searchIcon}></View>}
//                 </View>
//                 <FlatList data={companies} renderItem={({item, index}) => (
//                     <>
//                         <View style={styles.company}>
//                             <View style={styles.companyLogo}><Image
//                                 source={index === companies.length ? {uri: '',} : {uri: item.logo,}}/></View>
//                             <View style={{marginLeft: 20}}>
//                                 <Text
//                                     style={styles.companyTitle}>{index === companies.length ? 'Find your employer' : item.name}</Text>
//                                 <Text
//                                     style={styles.companySubTitle}>{index === companies.length ? 'Search the full list' : item.status}</Text>
//                             </View>
//                         </View>
//                     </>
//
//                 )}
//                           style={{marginVertical: 20}}
//                           keyExtractor={item => item.id}
//                 />
//             </View>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         padding: 15
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         paddingVertical: 10,
//     },
//     headerText: {
//         fontSize: 20,
//         fontWeight: '500',
//         fontFamily: 'Roboto',
//     },
//     searchContainer: {
//         backgroundColor: 'rgb(244, 244, 244)',
//         borderColor: 'rgb(244, 244, 244)',
//         borderWidth: 1,
//         borderRadius: 5,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     searchIcon: {
//         width: 40,
//         height: 40,
//         backgroundColor: 'red',
//     },
//     searchText: {
//         fontFamily: 'Roboto',
//         fontSize: 16,
//         color: 'rgb(59, 59, 59)',
//         fontWeight: '500',
//         marginLeft: 5,
//     },
//     company: {
//         height: 60,
//         flexDirection: 'row',
//     },
//     companyLogo: {
//         width: 50,
//         height: 50,
//         backgroundColor: 'black',
//         borderRadius: 100,
//     },
//     companyTitle: {
//         fontSize: 16,
//         lineHeight: 22,
//         fontWeight: '500',
//     },
//     companySubTitle: {
//         fontSize: 13,
//         lineHeight: 22,
//         opacity: 0.3,
//         color: 'rgb(0, 0, 0)',
//     }
// })
