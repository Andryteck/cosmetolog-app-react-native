import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Icon from "../../../components/icon";
import {dh} from "../../../utils/sizes";
import {COLORS, FONTS} from "../../../constants";


const DayItem = ({ date, selectedDate, onPress }) => {
  const today = moment().format('YYYY-MM-DD');
  const currentDate = moment(today).isSame(date, 'day');
  const selected = moment(selectedDate).isSame(date, 'day');
  const day = moment(date).format('ddd').toUpperCase();
  const number = moment(date).format('DD');

  const handleDayPress = useCallback(() => {
    const month = -moment().diff(date, 'months');
    onPress(moment(date).format('YYYY-MM-DD'), month);
  }, [date, onPress]);

  return (
    <View style={styles.dayContainerStyle}>
      <View style={styles.dayContainer}>
        <Text style={styles.dayTitle}>
          {day}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleDayPress}
        style={[
          styles.numberContainer,
          currentDate && styles.numberContainerCurrent,
          selected && styles.numberContainerSelected,
        ]}>
        <Text
          style={[
            styles.numberTitle,
            currentDate && styles.numberTitleCurrent,
            selected && styles.numberTitleSelected,
          ]}>
          {number}
        </Text>
      </TouchableOpacity>
      {selected ? (
        <Icon
          name="triangle"
          size={16}
          color={COLORS.White}
          style={styles.triangle}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainerStyle: {
    minWidth: dh(45),
    minHeight: dh(85),
    alignItems: 'center',
  },
  dayContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTitle: {
    fontFamily: FONTS.PNSB,
    fontSize: dh(11),
    lineHeight: dh(34),
    textAlign: 'center',
    color: COLORS.White,
  },
  numberContainer: {
    width: dh(40),
    height: dh(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.Dark2,
  },
  numberContainerCurrent: {
    width: dh(40),
    height: dh(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: COLORS.White_60,
  },
  numberContainerSelected: {
    width: dh(40),
    height: dh(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.White,
    shadowColor: COLORS.White,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  numberContainerDisabled: {
    width: dh(40),
    height: dh(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  numberTitle: {
    fontFamily: FONTS.PNR,
    fontSize: dh(18),
    lineHeight: dh(34),
    textAlign: 'center',
    color: COLORS.White,
  },
  numberTitleCurrent: {
    fontFamily: FONTS.PNR,
    fontSize: dh(17),
    lineHeight: dh(34),
    textAlign: 'center',
    color: COLORS.White,
  },
  numberTitleSelected: {
    fontFamily: FONTS.PNSB,
    fontSize: dh(17),
    lineHeight: dh(34),
    textAlign: 'center',
    color: COLORS.Dark2,
  },
  titleDisabled: {
    color: COLORS.White_50,
  },
  triangle: {
    position: 'absolute',
    bottom: -15,
  },
});

export default memo(DayItem);
