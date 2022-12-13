import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { messages as enMessages } from './locales/en/messages';
import { messages as frMessages } from './locales/fr/messages';
import { messages as ptMessages } from './locales/pt/messages';
import { darkTheme, lightTheme } from './utils/themes';
import { ThemeProvider } from '@emotion/react';
import Movies from './features/movies/Movies';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

i18n.load('en', enMessages);
i18n.load('fr', frMessages);
i18n.load('pt', ptMessages);
i18n.activate('fr');

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <I18nProvider i18n={i18n}>
        <CssBaseline />
        <Box sx={{ margin: '4%' }}>
          <Movies />
        </Box>
      </I18nProvider>
    </ThemeProvider>
  );
}
