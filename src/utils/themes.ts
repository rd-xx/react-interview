import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  }),
  lightTheme = createTheme({});

export { darkTheme, lightTheme };
