import { createMuiTheme } from '@material-ui/core/styles';
import { purple, cyan, lightGreen } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: cyan,
  },
});

export default theme;
