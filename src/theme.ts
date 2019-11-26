import { createMuiTheme } from '@material-ui/core/styles';
import { cyan, lightGreen } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: cyan,
  },
});

export default theme;
