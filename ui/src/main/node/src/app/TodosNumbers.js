import React, {Component} from "react";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";
import classNames from "classnames";
import jss from "./TodosNumbers.jss";

class TodosNumbers extends Component {
    render() {
        let jss = this.props.classes;
        return (
            <div className={classNames(jss.numbers, jss.title)}>
                <div className={jss.percentage}>
                    <CircularProgress variant="static" value={this.props.percentage}/>
                    <Typography variant="caption" className={jss.value}>
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

export default jss(connect(mapStateToProps, mapDispatchToProps)(TodosNumbers));
