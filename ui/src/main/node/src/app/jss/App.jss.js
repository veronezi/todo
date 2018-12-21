const jss = theme => {
    console.log("primary color", theme.palette.primary);
    return ({
        "@global": {
            "#root": {
                backgroundColor: theme.palette.primary.dark
            }
        }
    });
};
export default jss;