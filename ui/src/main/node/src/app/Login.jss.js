import injectSheet from "react-jss";

const styles = theme => ({
    theme: {
        backgroundColor: theme.palette.secondary[50]
    },
    hint: {
        color: theme.palette.text.hint,
        fontStyle: "italic"
    },
    login: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    loginChild: {
        maxWidth: "400px"
    },
    fields: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "270px"
    },
    center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    fieldsChild: {
        margin: "0 0 20px 0",
        "&:last-child": {
            margin: 0
        }
    },
    content: {
        alignItems: "center"
    }

});

export default ((cls) => injectSheet(styles)(cls));