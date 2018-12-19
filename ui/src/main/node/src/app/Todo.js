import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import axios from "./Rest";
import Loading from "./Loading";
import Back from '@material-ui/icons/ArrowBack';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from "@material-ui/core/Button/Button";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import pageSass from "./styles/Page.module.sass";
import todoSass from "./styles/Todo.module.sass";

class Todo extends Component {
    state = {
        newTodo: ''
    };

    handleNewTodoChange = (event) => {
        this.setState({
            newTodo: event.target.value
        });
    };

    handleGoBack = () => {
        this.props.history.push('/');
    };

    addNewTodo = () => {
        axios.post('/api/todo', {
            text: this.state.newTodo
        }).then(() => {
            this.props.history.push('/');
        });
    };

    handleAddNewTodo = (event) => {
        if (event.key === 'Enter') {
            this.addNewTodo();
        }
    };

    render() {
        return (
            <div className={classNames(todoSass.todo, pageSass.page)}>
                <Loading/>
                <div className={classNames(this.props.classes.content, todoSass.content)}>
                    <div className={todoSass.header}>
                        <Back className={todoSass.back} onClick={this.handleGoBack}/>
                        <Typography variant="h6">Add new thing</Typography>
                        <DashboardIcon/>
                    </div>
                    <div className={todoSass.form}>
                        <TextField className={classNames(todoSass.field, "field")}
                                   label="New todo"
                                   value={this.state.newTodo}
                                   onChange={this.handleNewTodoChange}
                                   onKeyPress={this.handleAddNewTodo}
                        />
                        <Button variant="contained" color="primary" aria-label="Add your thing"
                                onClick={() => this.addNewTodo()}>
                            Add your thing
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(theme => ({
    "content": {
        backgroundColor: theme.palette.secondary[50]
    }
}))(connect()(withRouter(Todo)));
