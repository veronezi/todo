import hexRgb from "hex-rgb";

const jss = theme => {
    const backgroundColorRgb = hexRgb(theme.palette.primary.dark);
    return {
        value: {
            color: theme.palette.secondary[50]
        },
        title: {
            backgroundColor: `rgba(${backgroundColorRgb.red}, ${backgroundColorRgb.green}, ${backgroundColorRgb.blue}, 0.6)`
        }
    };
};
export default jss;