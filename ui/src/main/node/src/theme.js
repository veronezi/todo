import {createMuiTheme} from "@material-ui/core/styles";
import primaryColor from "@material-ui/core/colors/indigo";
import secondaryColor from "@material-ui/core/colors/red";

const theme = createMuiTheme({
    palette: {
        primary: primaryColor,
        secondary: secondaryColor
    },
    typography: {
        useNextVariants: true
    }
});

export default theme;