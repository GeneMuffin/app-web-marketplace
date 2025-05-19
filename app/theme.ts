import { ThemeType } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export const theme: ThemeType = {
  ...eva.light,
  color: {
    ...eva.light.color,
    primary: '#6B7DB3',
    background: '#F5F5F5',
  },
};

export const mapping = eva.mapping; 