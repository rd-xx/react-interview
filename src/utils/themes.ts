import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  }),
  lightTheme = createTheme({});

export { darkTheme, lightTheme };

export function getThemeByMode(mode: string) {
  return mode === 'dark' ? darkTheme : lightTheme;
}
