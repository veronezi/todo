import injectSheet from "react-jss";

const styles = (theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        "& > *": {
            marginRight: 5
        },
        "&:hover": {
            cursor: "pointer"
        }
    },
    light: {
        color: theme.palette.secondary[50]
    }
});

export default ((cls) => injectSheet(styles)(cls));