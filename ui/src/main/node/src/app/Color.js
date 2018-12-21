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
import sass from "./styles/Color.module.sass";

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

const Color = (props) => (
    <div className={sass.color}>
        {Object.keys(colors).filter((color) => colors[color].main || colors[color]["500"]).map(color => (
            <div style={{
                backgroundColor: colors[color].A400
            }} key={color} onClick={() => props.onChange(colors[color])}/>
        ))}
    </div>
);

export default Color;
