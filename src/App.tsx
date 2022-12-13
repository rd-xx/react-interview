import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './utils/themes';
import { ThemeProvider } from '@emotion/react';
import Movies from './features/movies/Movies';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ margin: '4%' }}>
        <Movies />
      </Box>
    </ThemeProvider>
  );
}
