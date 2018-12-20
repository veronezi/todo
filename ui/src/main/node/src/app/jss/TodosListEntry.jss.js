const jss = () => {
    const spacing = "20px";
    return {
        li: {
            padding: `${spacing} ${spacing} 0 ${spacing}`,
            "&:hover": {
                cursor: "pointer"
            }
        },
        content: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: `0 0 ${spacing} 0`
        },
        icon: {
            position: "relative",
            overflow: "visible",
            marginRight: "10px"
        },
        check: {
            position: "absolute",
            bottom: 0,
            right: 0,
            opacity: 0,
            height: "18px",
            width: "auto"
        },
        done: {
            opacity: 1
        }
    };
};
export default jss;