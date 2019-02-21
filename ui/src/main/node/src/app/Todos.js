import React, {Component} from "react";
import axios from "./Rest";
import {connect} from "react-redux";
import TodosNumbers from "./TodosNumbers"
import {TOGGLE_TODO_STATUS, UPDATE_TODOS_LIST} from "../reducer";
import Loading from "./Loading";
import TodosListEntry from "./TodosListEntry";
import TodosDates from "./TodosDates";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import jss from "./Todos.jss";
import User from "./User";
import TodosBottomBar from "./TodosBottomBar";

class Todos extends Component {

    updateTitle() {
        let pending = this.props.todos.filter(todo => !todo.done).length;
        document.title = `TODOs - ${pending ? pending + " to go" : "All done!"}`;
    }

    loadTodos() {
        axios.get("/api/todo").then(resp => {
            let list = resp.data || [];
            this.props.onTodosChange(list);
            this.updateTitle();
        });
    }

    componentDidMount() {
        this.loadTodos();
    }

    openConfigPage = () => {
        this.props.history.push("/config");
    };

    openTodoPage = () => {
        this.props.history.push("/todo");
    };

    render() {
        let {classes, todos} = this.props;
        return (
            <div className={classNames(classes.page)}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <div className={classes.titleChild}>
                            <User/>
                            <Typography className={classes.light} variant="h4" color={"primary"}>
                                Your Things
                            </Typography>
                            <TodosDates/>
                        </div>
                        <Loading/>
                    </div>
                    <TodosNumbers/>
                </div>
                <div className={classes.content}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        {todos.map(todo => (<TodosListEntry todo={todo} key={todo.id}/>))}
                    </Grid>
                </div>
                <TodosBottomBar onSettings={this.openConfigPage} onAdd={this.openTodoPage}/>
            </div>
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
        onTodoToggle: (todo) => dispatch({type: TOGGLE_TODO_STATUS, todo: todo}),
        onTodosChange: (todos) => dispatch({type: UPDATE_TODOS_LIST, todos: todos})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(jss(Todos)));
