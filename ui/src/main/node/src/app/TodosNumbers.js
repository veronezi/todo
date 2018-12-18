import React, {Component} from 'react';
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import hexRgb from "hex-rgb";
import classNames from "classnames";

const styles = theme => {
    const backgroundColorRgb = hexRgb(theme.palette.primary.dark);
    return {
        value: {
            color: theme.palette.secondary[50]
        },
        title: {
            backgroundColor: `rgba(${backgroundColorRgb.red}, ${backgroundColorRgb.green}, ${backgroundColorRgb.blue}, 0.6)`
        }
    };
};

class TodosNumbers extends Component {
    render() {
        return (
            <div className={classNames("todos-numbers", this.props.classes.title)}>
                <div className="percentage">
                    <CircularProgress variant="static" value={this.props.percentage}/>
                    <Typography variant="body1" className={this.props.classes.value}>{this.props.percentage}%
                        done</Typography>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TodosNumbers));
