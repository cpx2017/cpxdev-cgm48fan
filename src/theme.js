import { createMuiTheme as createTheme } from '@material-ui/core';

const theme = createTheme({
    typography: {
        fontFamily: ['Anakotmai', 'san-serif'].join(',')
    },
    palette: {
      primary: {
          main: "#49C5A8",
        },
        secondary: {
            main: "#fff",
          },
    },
});

export default theme;