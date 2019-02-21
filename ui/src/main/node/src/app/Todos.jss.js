import hexRgb from "hex-rgb";
import headerImg from "../images/header.png";
import injectSheet from "react-jss";

const styles = theme => {
    const backgroundColorRgb = hexRgb(theme.palette.primary.dark);
    return {
        light: {
            color: theme.palette.secondary[50]
        },
        title: {
            backgroundColor: `rgba(${backgroundColorRgb.red}, ${backgroundColorRgb.green}, ${backgroundColorRgb.blue}, 0.5)`,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column"
        },
        titleChild: {
            padding: "20px",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between"
        },
        content: {
            backgroundColor: theme.palette.secondary[50],
            flexGrow: 1,
            overflow: "auto"
        },
        header: {
            flexShrink: 0,
            height: "250px",
            background: `url(${headerImg}) no-repeat`,
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "row"
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
    };
};

export default ((cls) => injectSheet(styles)(cls));