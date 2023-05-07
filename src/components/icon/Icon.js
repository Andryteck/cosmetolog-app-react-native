import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import Androw from 'react-native-androw';


import icons from './data';

const Icon = ({ name, size, color, style, highlight }) => {
  const colorHighlighted = color ? color : COLORS.White;

  if (icons[name]) {
    const { w, h, path } = icons[name];

    return (
      <Androw
        style={[
          styles.wr,
          highlight && styles.highlight,
          { shadowColor: colorHighlighted },
          style,
        ]}>
        <Svg
          viewBox={`0 0 ${w} ${h}`}
          style={{ width: size, height: size }}>
          {path && path.length
            ? path.map((item, i) => (
              <Path
                fill={color || item.color}
                d={item.d}
                key={i} />
            ))
            : null}
        </Svg>
      </Androw>
    );
  } else {
    return <Text>NA</Text>;
  }
};

const styles = StyleSheet.create({
  wr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: {
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});

export default Icon;
