import injectSheet from "react-jss";

const styles = theme => ({
    "root": {
        backgroundColor: theme.palette.secondary[50],
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    page: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
});

export default ((cls) => injectSheet(styles)(cls));