import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      gradient: string;
      cardHover: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      gradient?: string;
      cardHover?: string;
    };
  }
}

export const getTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#90caf9' : '#1976d2',
        light: isDark ? '#e3f2fd' : '#bbdefb',
        dark: isDark ? '#42a5f5' : '#1565c0',
        contrastText: isDark ? 'rgba(0, 0, 0, 0.87)' : '#fff',
      },
      secondary: {
        main: isDark ? '#ce93d8' : '#9c27b0',
        light: isDark ? '#f3e5f5' : '#e1bee7',
        dark: isDark ? '#ab47bc' : '#7b1fa2',
        contrastText: '#fff',
      },
      error: {
        main: isDark ? '#f44336' : '#d32f2f',
        light: isDark ? '#e57373' : '#ef5350',
        dark: isDark ? '#d32f2f' : '#c62828',
        contrastText: '#fff',
      },
      warning: {
        main: isDark ? '#ffa726' : '#ed6c02',
        light: isDark ? '#ffb74d' : '#ff9800',
        dark: isDark ? '#f57c00' : '#e65100',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      info: {
        main: isDark ? '#29b6f6' : '#0288d1',
        light: isDark ? '#4fc3f7' : '#03a9f4',
        dark: isDark ? '#0288d1' : '#01579b',
        contrastText: '#fff',
      },
      success: {
        main: isDark ? '#66bb6a' : '#2e7d32',
        light: isDark ? '#81c784' : '#4caf50',
        dark: isDark ? '#388e3c' : '#1b5e20',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      background: {
        default: isDark ? '#121212' : '#f5f5f5',
        paper: isDark ? '#1e1e1e' : '#fff',
      },
      text: {
        primary: isDark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
        secondary: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
        disabled: isDark ? 'rgba(255, 255, 255, 0.38)' : 'rgba(0, 0, 0, 0.38)',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      custom: {
        gradient: isDark 
          ? 'linear-gradient(45deg, #1e3a8a 0%, #1e40af 100%)' 
          : 'linear-gradient(45deg, #3b82f6 0%, #2563eb 100%)',
        cardHover: isDark 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(0, 0, 0, 0.02)',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.2,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.2,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.2,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.2,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.2,
      },
      subtitle1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
      },
      overline: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        textTransform: 'uppercase',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            WebkitFontSmoothing: 'auto',
          },
          body: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
            boxShadow: '2px 0 10px 0 rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '4px 8px',
            '&.Mui-selected': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
              },
            },
          },
        },
      },
    },
  });
};

export default getTheme;
