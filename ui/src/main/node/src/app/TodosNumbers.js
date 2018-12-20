import React, {Component} from "react";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import sass from "./styles/TodosNumbers.module.sass";
import jss from "./jss/TodosNumbers.jss";

class TodosNumbers extends Component {
    render() {
        let jss = this.props.classes;
        return (
            <div className={classNames(sass.numbers, jss.title)}>
                <div className={sass.percentage}>
                    <CircularProgress variant="static" value={this.props.percentage}/>
                    <Typography variant="caption" className={classNames(jss.value, sass.value)}>
                        {this.props.percentage}% done
                    </Typography>
                </div>
            </div>
        );
    }
}

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

export default withStyles(jss)(connect(mapStateToProps, mapDispatchToProps)(TodosNumbers));
