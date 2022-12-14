import { messages as enMessages } from './locales/en/messages';
import { messages as frMessages } from './locales/fr/messages';
import { messages as ptMessages } from './locales/pt/messages';
import { createContext, useMemo, useState } from 'react';
import { getThemeByMode } from './utils/themes';
import { ThemeProvider } from '@emotion/react';
import Movies from './features/movies/Movies';
import { I18nProvider } from '@lingui/react';
import { en, fr, pt } from 'make-plural';
import { i18n } from '@lingui/core';
import Box from '@mui/material/Box';
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  useMediaQuery
} from '@mui/material';

i18n.load('en', enMessages);
i18n.load('fr', frMessages);
i18n.load('pt', ptMessages);
i18n.activate('fr');

i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr },
  pt: { plurals: pt }
});

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'),
    [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light'),
    colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          const newMode = mode === 'light' ? 'dark' : 'light';
          setMode(newMode);
          console.log('toggleColorMode');
        }
      }),
      [mode]
    ),
    theme = useMemo(() => createTheme(getThemeByMode(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
          <CssBaseline />
          <Box sx={{ margin: '4%' }}>
            <Movies />
          </Box>
        </I18nProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function changeLocale(locale: string) {
  i18n.activate(locale);
}

export function getLocale() {
  return i18n.locale;
}

export const availableLocales = [
  {
    id: 'en',
    label: 'English',
    code: 'us'
  },
  {
    id: 'fr',
    label: 'Français',
    code: 'fr'
  },
  {
    id: 'pt',
    label: 'Português',
    code: 'pt'
  }
];
