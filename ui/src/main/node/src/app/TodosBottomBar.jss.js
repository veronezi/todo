import injectSheet from "react-jss";

const styles = (theme) => ({
    root: {
        position: "absolute",
        bottom: theme.spacing.unit,
        right: theme.spacing.unit
    }
});

export default ((cls) => injectSheet(styles)(cls));