import {dh} from "../utils/sizes";
import {COLORS} from "./index";


export const SIZE_IDS = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

export const SIZES = {
  [SIZE_IDS.XS]: dh(18),
  [SIZE_IDS.SM]: dh(28),
  [SIZE_IDS.MD]: dh(36),
  [SIZE_IDS.LG]: dh(40),
  [SIZE_IDS.XL]: dh(56),
  default: dh(36),
};

export const THEME_IDS = {
  EXTRA_LIGHT: 'extra-light',
  EXTRA_DARK: 'extra-dark',
  LIGHT: 'light',
  DARK: 'dark',
  YELLOW: 'yellow',
};

export const THEMES = {
  [THEME_IDS.EXTRA_LIGHT]: COLORS.White,
  [THEME_IDS.LIGHT]: COLORS.White_20,
  [THEME_IDS.DARK]: COLORS.Dark2_50,
  [THEME_IDS.EXTRA_DARK]: COLORS.Dark2_70,
  [THEME_IDS.YELLOW]: COLORS.Yellow1,
  default: COLORS.Trans,
};
