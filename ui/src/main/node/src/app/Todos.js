import React, {Component} from "react";
import axios from "./Rest";
import {connect} from "react-redux";
import TodosNumbers from "./TodosNumbers"
import Subject from "@material-ui/icons/Subject";
import AddIcon from "@material-ui/icons/Add";
import {TOGGLE_TODO_STATUS, UPDATE_TODOS_LIST} from "../reducer";
import Loading from "./Loading";
import TodosListEntry from "./TodosListEntry";
import TodosDates from "./TodosDates";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import jss from "./Todos.jss";
import Fab from "@material-ui/core/Fab";

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
                            <Subject className={classes.light}/>
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
                <Fab className={classes.add} color="primary" aria-label="Add"
                     onClick={() => this.openTodoPage()}>
                    <AddIcon/>
                </Fab>
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

export default jss(connect(mapStateToProps, mapDispatchToProps)(withRouter(Todos)));
