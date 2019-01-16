import injectSheet from "react-jss";

const width = "600px";

const styles = theme => ({
    "@global": {
        "body": {
            margin: 0,
            padding: 0,
            height: "100vh"
        },
        "#root": {
            backgroundColor: theme.palette.primary.dark,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    },
    application: {
        width: width,
        height: "100%",
        [`@media only screen and (max-width: ${width})`]: {
            width: "100%"
        }
    },
    child: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative"
    }

});

export default ((cls) => injectSheet(styles)(cls));