import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#26a69a', // Teal 500
    },
    secondary: {
      main: '#ffab40', // Amber A200
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  // You can add more customizations here
});

export default theme;