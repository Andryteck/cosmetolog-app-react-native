import styled from 'styled-components';
import { Text } from 'react-native';

export interface Props {
  isActive?: boolean | undefined,
  color?: string | undefined
}

const getColor = ({ isActive, color }: Props) => {
  const colors = {
    green: {
      background: 'rgba(132,210,105,0.21)',
      color: '#61BB42',
    },
    active: {
      background: '#2A86FF',
      color: '#fff',
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
background: ${(props: any) => getColor(props).background};
color: ${(props: any) => getColor(props).color};
font-weight: 600;
font-size: 14px;
width: 70px;
height: 32px;
text-align: center;
line-height: 30px;
`;
