const width = "600px";

const jss = theme => ({
    "@global": {
        "#root": {
            backgroundColor: theme.palette.primary.dark
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
export default jss;