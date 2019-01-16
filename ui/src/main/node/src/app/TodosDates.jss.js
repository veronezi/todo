import injectSheet from "react-jss";

const styles = theme => ({
    light: {
        color: theme.palette.secondary[50]
    }
});

export default ((cls) => injectSheet(styles)(cls));