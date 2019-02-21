import React from "react";
import jss from "./TodosBottomBar.jss";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import classNames from "classnames";

const TodosBottomBar = ({className, onAdd, onSettings, classes}) => (
    <Fab className={classNames({
        [classes.root]: true,
        [className]: className
    })} color="primary" aria-label="Add" onClick={() => onAdd()}>
        <AddIcon/>
    </Fab>
);

export default jss(TodosBottomBar);
