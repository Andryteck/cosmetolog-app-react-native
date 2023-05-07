import React, {memo, useState, useRef, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

import DayItem from '../components/DayItem';
import {dh, dhp, dwp} from "../../../utils/sizes";
import IconTouchable from "../../../components/IconTouchable";
import {COLORS, FONTS} from "../../../constants";

// TODO make correct day display when i make reload data
const Calendar = ({handleDayPress, selectedDate}) => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDay, setSelectedDay] = useState(today);
  const calenderRef = useRef(null);

  const dayComponent = ({ date, selectedDate }) => {
    return (
      <DayItem
        date={date}
        selectedDate={selectedDate}
        onPress={handleDayPress}
      />
    );
  };

  const handleGetPreviousWeek = () => {
    calenderRef.current.getPreviousWeek();
  };

  const handleGetNextWeek = () => {
      calenderRef.current.getNextWeek();
  };

  useEffect(() => {
    setSelectedDay(selectedDate);
    return () => {
        setSelectedDay(today);
    }
  }, [selectedDate]);

  return (
    <View style={styles.root}>
      <CalendarStrip
        ref={calenderRef}
        style={styles.mainContainer}
        calendarHeaderStyle={styles.headerStyle}
        calendarHeaderContainerStyle={styles.headerContainerStyle}
        selectedDate={selectedDay}
        dayComponent={dayComponent}
        leftSelector={
          <TouchableOpacity
            style={styles.iconLeftWr}
            onPress={handleGetPreviousWeek}>
            <IconTouchable
              disabled
              name="arrowBack"
              size="xs"
              style={styles.iconLeft}
            />
          </TouchableOpacity>
        }
        rightSelector={
          <TouchableOpacity
            style={styles.iconRightWr}
            onPress={handleGetNextWeek}>
            <IconTouchable
              disabled
              name="arrowForward"
              size="xs"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0.3,
    marginTop: dhp(35),
    backgroundColor: COLORS.Dark2,
    paddingHorizontal: dwp(16),
  },
  mainContainer: {
    width: '100%',
    height: dh(160),
  },
  headerContainerStyle: {
    height: dh(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    marginTop: dhp(5),
    fontFamily: FONTS.PNSB,
    fontSize: dh(15),
    lineHeight: dh(18),
    color: COLORS.White,
    textAlign: 'center',
  },
  iconLeftWr: {
    position: 'absolute',
    left: 10,
    top: dh(-80),
    zIndex: 100,
    paddingRight: dh(15),
    paddingBottom: dh(15),
  },
  iconRightWr: {
    position: 'absolute',
    right: 10,
    top: dh(-80),
    zIndex: 100,
    paddingLeft: dh(15),
    paddingBottom: dh(15),
  },
});

export default memo(Calendar);
