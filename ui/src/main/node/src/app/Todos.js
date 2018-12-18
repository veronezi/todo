import React, {Component} from 'react';
import axios from './Rest';
import {connect} from "react-redux";
import TodosNumbers from './TodosNumbers'
import Subject from '@material-ui/icons/Subject';
import AddIcon from '@material-ui/icons/Add';
import {TOGGLE_TODO_STATUS, UPDATE_TODOS_LIST} from '../reducer';
import Loading from './Loading';
import Button from "@material-ui/core/Button/Button";
import TodosListEntry from './TodosListEntry';
import TodosDates from './TodosDates';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import hexRgb from 'hex-rgb';
import {withRouter} from "react-router-dom";

const styles = theme => {
    const backgroundColorRgb = hexRgb(theme.palette.primary.dark);
    return {
        light: {
            color: theme.palette.secondary[50]
        },
        title: {
            backgroundColor: `rgba(${backgroundColorRgb.red}, ${backgroundColorRgb.green}, ${backgroundColorRgb.blue}, 0.5)`
        }
    };
};

class Todos extends Component {

    updateTitle() {
        let pending = this.props.todos.filter(todo => !todo.done).length;
        document.title = `TODOs - ${pending ? pending + ' to go' : 'All done!'}`;
    }

    loadTodos() {
        axios.get('/api/todo').then(resp => {
            let list = resp.data || [];
            this.props.onTodosChange(list);
            this.updateTitle();
        });
    }

    componentDidMount() {
        this.loadTodos();
    }

    openTodoPage = () => {
        this.props.history.push('/todo');
    };

    render() {
        return (
            <div className="todos page">
                <div className="header">
                    <div className={classNames(this.props.classes.title, 'title')}>
                        <div>
                            <Subject className={this.props.classes.light}/>
                            <Typography className={this.props.classes.light} variant="h4" color={"primary"}>Your Things</Typography>
                            <TodosDates className={this.props.classes.light}/>
                        </div>
                        <Loading/>
                    </div>
                    <TodosNumbers/>
                </div>
                <div className={"content"}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        {this.props.todos.map(todo => (<TodosListEntry todo={todo} key={todo.id}/>))}
                    </Grid>
                </div>
                <Button className="add-todo-btn" variant="fab" color="primary" aria-label="Add"
                        onClick={() => this.openTodoPage()}>
                    <AddIcon/>
                </Button>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Todos)));
