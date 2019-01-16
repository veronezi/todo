import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "./Rest";
import {TOGGLE_TODO_STATUS} from "../reducer";
import ReminderIcon from "@material-ui/icons/CalendarToday";
import CheckIcon from "@material-ui/icons/CheckCircle";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid/Grid";
import Divider from "@material-ui/core/Divider/Divider";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import jss from "./TodosListEntry.jss";

class TodosListEntry extends Component {
    handleToggle = value => () => {
        axios.put("/api/todo", {...value, done: !value.done}).then(() => {
            this.props.onTodoToggle(value);
            this.updateTitle();
        });
    };

    updateTitle() {
        let pending = this.props.todos.filter(todo => !todo.done).length;
        document.title = `TODOs - ${pending ? pending + " to go" : "All done!"}`;
    }

    render() {
        let todo = this.props.todo;
        let jss = this.props.classes;
        return (
            <Grid item xs={12} sm={12} onClick={this.handleToggle(todo)}
                  className={classNames(jss.li, "list-entry")}>
                <div className={jss.content}>
                    <Avatar className={jss.icon}>
                        <ReminderIcon color={"primary"}/>
                        <CheckIcon color={"action"} className={classNames({
                            [jss.done]: todo.done,
                            [jss.check]: true
                        })}/>
                    </Avatar>
                    <Typography variant="body1">
                        {todo.text}
                    </Typography>
                </div>
                <Divider/>
            </Grid>
        );
    }
}


const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onTodoToggle: (todo) => dispatch({type: TOGGLE_TODO_STATUS, todo: todo})
    };
};

export default jss(connect(mapStateToProps, mapDispatchToProps)(TodosListEntry));
