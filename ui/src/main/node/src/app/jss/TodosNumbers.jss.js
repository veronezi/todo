import hexRgb from "hex-rgb";

const jss = theme => {
    const backgroundColorRgb = hexRgb(theme.palette.primary.dark);
    return {
        value: {
            color: theme.palette.secondary[50],
            width: "80px",
            margin: "0 0 0 10px",
            textAlign: "right",
            whiteSpace: "nowrap"
        },
        title: {
            backgroundColor: `rgba(${backgroundColorRgb.red}, ${backgroundColorRgb.green}, ${backgroundColorRgb.blue}, 0.6)`
        },
        numbers: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "140px",
            padding: "20px"
        },
        percentage: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-end"
        }
    };
};
export default jss;