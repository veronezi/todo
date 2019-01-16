import React from "react";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";
import classNames from "classnames";
import jss from "./TodosNumbers.jss";

const TodosNumbers = ({classes, percentage}) => (
    <div className={classNames(classes.numbers, classes.title)}>
        <div className={classes.percentage}>
            <CircularProgress variant="static" value={percentage}/>
            <Typography variant="caption" className={classes.value}>
                {percentage}% done
            </Typography>
        </div>
    </div>
);

const mapStateToProps = state => {
    let done = state.todos.filter(todo => todo.done).length;
    let percentage;
    if (state.todos.length) {
        percentage = Math.round(done * 100 / state.todos.length);
    } else {
        percentage = 100;
    }
    return {
        percentage: percentage
    };
};
const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(jss(TodosNumbers));
