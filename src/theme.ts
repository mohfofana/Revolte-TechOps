// src/theme.ts
// Supprime la ligne suivante car elle n'est pas utilisée
// import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark') => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette clair
            primary: { main: '#1976d2' },
            background: { default: '#f5f5f5', paper: '#fff' },
          }
        : {
            // palette sombre
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#1d1d1d' },
          }),
    },
  });
  