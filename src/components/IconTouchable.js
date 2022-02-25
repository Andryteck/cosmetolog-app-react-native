import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {SIZES, THEMES} from "../constants/styles";
import Icon from "./icon";
import {COLORS} from "../constants";


const IconTouchable = props => {
  const { name, size, iconColor, theme, style, onPress, disabled } = props;

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  const iconSize = SIZES[size] || SIZES.default;
  const wrapperStyle = {
    height: iconSize,
    width: iconSize,
    backgroundColor: THEMES[theme] || THEMES.default,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.root, wrapperStyle, style]}
      onPress={handlePress}>
      <Icon name={name} size={iconSize} color={iconColor || COLORS.White} />
    </TouchableOpacity>
  );
};

IconTouchable.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default memo(IconTouchable);
