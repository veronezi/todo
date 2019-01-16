import injectSheet from "react-jss";

const size = 40;
const styles = () => ({
    "root": {
        display: "flex",
        flexWrap: "wrap",
        "& > div": {
            width: size,
            height: size
        }
    }
});

export default ((cls) => injectSheet(styles)(cls));
