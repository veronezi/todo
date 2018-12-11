import React, {Component} from 'react';
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography/Typography";

class TodosNumbers extends Component {
    render() {
        return (
            <div className="todos-numbers">
                <div className="percentage">
                    <CircularProgress variant="static" value={this.props.percentage}/>
                    <Typography variant="body1" className={"value"}>{this.props.percentage}% done</Typography>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let done = state.todos.filter(todo => todo.done).length;
    let percentage;
    if(state.todos.length) {
        percentage =  Math.round(done * 100 / state.todos.length);
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

export default connect(mapStateToProps, mapDispatchToProps)(TodosNumbers);
