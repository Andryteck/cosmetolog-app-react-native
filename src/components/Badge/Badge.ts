import styled, {ThemedStyledProps} from 'styled-components';
import {Text, TextProps} from 'react-native';
import {RefAttributes} from "react";
import {COLORS} from "../../constants";

export interface Props {
    isActive?: boolean | undefined,
    color?: string | undefined
}

const getColor = ({isActive, color}: Props) => {
    const colors = {
        green: {
            background: 'rgba(132,210,105,0.21)',
            color: '#61BB42',
        },
        active: {
            background: '#2A86FF',
            color: '#fff',
        },
        dashed: {
            background: 'transparent',
            color: COLORS.White_50,
        },
        darkGreen: {
            background:  COLORS.Green1,
            color: COLORS.White,
        },
        default: {
            background: '#E9F5FF',
            color: '#4294FF',
        }
    };

    if (isActive) {
        return colors.active;
    } else { // @ts-ignore
        if (color && colors[color]) {
            // @ts-ignore
            return colors[color];
        } else {
            return colors.default;
        }
    }
};

export default styled(Text)<Props>`
  background: ${(props: ThemedStyledProps<TextProps & RefAttributes<Text> & Props, any>) => getColor(props).background};
  color: ${(props: ThemedStyledProps<TextProps & RefAttributes<Text> & Props, any>) => getColor(props).color};
  font-weight: 600;
  font-size: 14px;
  min-width: 70px;
  height: 32px;
  text-align: center;
  line-height: 30px;
`;
