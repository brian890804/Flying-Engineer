import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7B5035',
      light: '#A0704F',
      dark: '#5A3620',
      contrastText: '#FAF7F4',
    },
    secondary: {
      main: '#C4956A',
      light: '#D9B090',
      dark: '#A87A52',
      contrastText: '#3D2B1F',
    },
    background: {
      default: '#FAF7F4',
      paper: '#F0E6D8',
    },
    text: {
      primary: '#3D2B1F',
      secondary: '#6B4A36',
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", "微軟正黑體", "Microsoft JhengHei", sans-serif',
    h1: { fontWeight: 900 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    button: { fontWeight: 700, letterSpacing: '0.05em' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          padding: '10px 28px',
          '&.MuiButton-containedPrimary': {
            boxShadow: '0 4px 14px rgba(123,80,53,0.35)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(123,80,53,0.45)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 16px rgba(61,43,31,0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 32px rgba(61,43,31,0.16)',
          },
        },
      },
    },
  },
});

export default theme;
