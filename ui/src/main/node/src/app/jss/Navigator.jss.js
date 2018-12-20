const timeout = "150ms";
const jss = () => ({
    root: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative"
    },
    "fade-enter": {
        transition: `transform ${timeout} ease-in-out ${timeout}, opacity ${timeout} ease-in-out ${timeout}`,
        transform: "translate(-100%)",
        opacity: 0
    },
    "fade-enter-active": {
        transform: "translate(0)",
        opacity: 1
    },
    "fade-exit": {
        transition: `transform ${timeout} ease-in-out, opacity ${timeout} ease-in-out`,
        opacity: 1
    },
    "fade-exit-active": {
        transform: "translate(100%)",
        opacity: 0
    }
});
export default jss;