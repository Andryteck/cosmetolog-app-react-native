import React, { memo, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

// import { selectGroupedNotesByDate } from 'store/user';

// import { MentalNoteTile, IconTouchable } from 'components';

import DayItem from '../components/DayItem';
import {dh, dhp, dwp} from "../../../utils/sizes";
import IconTouchable from "../../../components/IconTouchable";
import {COLORS, FONTS} from "../../../constants";

const Calendar = () => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDay, setSelectedDay] = useState(today);
  const [nextWeekIsAvailable, setNextWeekIsAvailable] = useState(false);
  const calenderRef = useRef(null);
  const groupedNotes = {}

  const getMentalNotesByDate = () => {
    return groupedNotes[selectedDay] || [];
  };

  const dayComponent = ({ date, selectedDate }) => {
    return (
      <DayItem
        date={date}
        selectedDate={selectedDate}
        onPress={handleDayPress}
      />
    );
  };

  const handleDayPress = (day, month) => {
    const isEmpty = !groupedNotes[day]?.length;
    setSelectedDay(day);
  };

  const handleWeekChange = (start, end) => {
    if (moment(end).isSameOrAfter(today, 'day')) {
      setNextWeekIsAvailable(false);
    } else {
      setNextWeekIsAvailable(true);
    }
  };

  const handleGetPreviousWeek = () => {
    calenderRef.current.getPreviousWeek();
  };

  const handleGetNextWeek = () => {
    if (nextWeekIsAvailable) {
      calenderRef.current.getNextWeek();
    }
  };

  return (
    <View style={styles.root}>
      <CalendarStrip
        ref={calenderRef}
        style={styles.mainContainer}
        calendarHeaderStyle={styles.headerStyle}
        calendarHeaderContainerStyle={styles.headerContainerStyle}
        selectedDate={selectedDay}
        dayComponent={dayComponent}
        onWeekChanged={handleWeekChange}
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
              iconColor={nextWeekIsAvailable ? COLORS.White : COLORS.White_20}
            />
          </TouchableOpacity>
        }
      />
      {/*<MentalNoteTile notes={getMentalNotesByDate()} disabled />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: dhp(35),
    backgroundColor: COLORS.Dark2,
    paddingHorizontal: dwp(16),
  },
  mainContainer: {
    width: '100%',
    height: dh(145),
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
