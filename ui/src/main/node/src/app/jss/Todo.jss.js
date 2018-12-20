const jss = theme => ({
    button: {
        width: "100%",
        marginTop: "10px"
    },
    content: {
        backgroundColor: theme.palette.secondary[50],
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: "20px"
    },
    field: {
        width: "100%"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    back: {
        transition: "transform 200ms ease-in-out",
        "&:hover": {
            cursor: "pointer",
            transform: "translate(-5px)"
        }
    },
    form: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});
export default jss;