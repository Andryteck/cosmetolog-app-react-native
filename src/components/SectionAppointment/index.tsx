import {TouchableOpacity, View} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import {useNavigation} from "@react-navigation/native";
import Appointment from "./Appointment/Appointment";
import styled from "styled-components";
import {IAppointment} from "../../api/patients";

type TProps = {
    removeAppointment: (id: string) => void
    item: IAppointment
    index: number
    id: string
    // swipeableItemRefs: any,
    // toggleSwipeable: any
}

export const SectionAppointment = React.memo(({removeAppointment, item, index, id }: TProps) => {
    const navigation = useNavigation()
    return (
       <>
           <Swipeable
               // @ts-ignore
               // ref={(ref) =>
               //     swipeableItemRefs.current.push({
               //         id,
               //         swipeable: ref,
               //     })
               // }
               // onSwipeableWillOpen={() => toggleSwipeable(id)}
               rightButtons={[
                   <SwipeViewButton style={{backgroundColor: '#B4C1CB'}}
                                    onPress={() => navigation.navigate('ChangeAppointment', item)}
                   >
                       <Ionicons name="md-create" size={28} color="white"/>
                   </SwipeViewButton>,
                   <SwipeViewButton
                       onPress={() => removeAppointment(id)}
                       style={{backgroundColor: '#F85A5A'}}
                   >
                       <Ionicons name="ios-close" size={48} color="white"/>
                   </SwipeViewButton>
               ]}>
               <Appointment navigate={navigation.navigate} item={item} index={index} show={false}/>
           </Swipeable>
       </>
    );
})

const SwipeViewButton = styled(TouchableOpacity)`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

