import hexRgb from "hex-rgb";

const jss = theme => {
    const backgroundColorRgb = hexRgb(theme.palette.primary.dark);
    return {
        light: {
            color: theme.palette.secondary[50]
        },
        title: {
            backgroundColor: `rgba(${backgroundColorRgb.red}, ${backgroundColorRgb.green}, ${backgroundColorRgb.blue}, 0.5)`
        },
        content: {
            backgroundColor: theme.palette.secondary[50]
        }
    };
};
export default jss;