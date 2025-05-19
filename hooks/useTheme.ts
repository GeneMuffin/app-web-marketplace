import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  
  const theme = {
    colors: {
      primary: '#6B7DB3',
      secondary: '#E6F3FF',
      background: colorScheme === 'dark' ? '#000' : '#FFF',
      text: colorScheme === 'dark' ? '#FFF' : '#000',
      border: colorScheme === 'dark' ? '#333' : '#E0E0E0',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    },
  };

  return { theme };
}; 