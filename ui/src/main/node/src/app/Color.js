import React from "react";
import {
    amber,
    blue,
    blueGrey,
    brown,
    common,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow
} from "@material-ui/core/colors";
import jss from "./Color.jss";

const colors = {
    amber,
    blue,
    blueGrey,
    brown,
    common,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow
};

const Color = ({onChange, classes}) => (
    <div className={classes.root}>
        {Object.keys(colors).filter((color) => colors[color].main || colors[color]["500"]).map(color => (
            <div style={{
                backgroundColor: colors[color].A400
            }} key={color} onClick={() => onChange(colors[color])}/>
        ))}
    </div>
);

export default jss(Color);
