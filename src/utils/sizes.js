import { Dimensions } from 'react-native';

export const WINDOW = Dimensions.get('window');

/* Scaling */
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const round = number => {
  return number > 0 && number <= 1 ? 1 : Math.floor(number);
};

// Use for text, images, etc
export const dw = (number, isRound = false) => {
  const result = number * Math.sqrt(WINDOW.width / DESIGN_WIDTH);
  return isRound ? round(result) : result;
};

export const dh = (number, isRound = false) => {
  const result = number * Math.sqrt(WINDOW.height / DESIGN_HEIGHT);
  return isRound ? round(result) : result;
};

// Use for paddings, margins, etc
export const dwp = (number, isRound = false) => {
  const result = number * (WINDOW.width / DESIGN_WIDTH);
  return isRound ? round(result) : result;
};

export const dhp = (number, isRound = false) => {
  const result = number * (WINDOW.height / DESIGN_HEIGHT);
  return isRound ? round(result) : result;
};
