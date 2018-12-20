import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import axios from "./Rest";
import Loading from "./Loading";
import Back from "@material-ui/icons/ArrowBack";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from "@material-ui/core/Button/Button";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import jss from "./jss/Todo.jss";

class Todo extends Component {
    state = {
        newTodo: ""
    };

    handleNewTodoChange = (event) => {
        this.setState({
            newTodo: event.target.value
        });
    };

    handleGoBack = () => {
        this.props.history.push("/");
    };

    addNewTodo = () => {
        axios.post("/api/todo", {
            text: this.state.newTodo
        }).then(() => {
            this.props.history.push("/");
        });
    };

    handleAddNewTodo = (event) => {
        if (event.key === "Enter") {
            this.addNewTodo();
        }
    };

    render() {
        let jss = this.props.classes;
        return (
            <div className={classNames(jss.page)}>
                <Loading/>
                <div className={classNames(jss.content)}>
                    <div className={jss.header}>
                        <Back className={jss.back} onClick={this.handleGoBack}/>
                        <Typography variant="h6">Add new thing</Typography>
                        <DashboardIcon/>
                    </div>
                    <div className={jss.form}>
                        <TextField className={classNames(jss.field, "field")}
                                   label="New todo"
                                   value={this.state.newTodo}
                                   onChange={this.handleNewTodoChange}
                                   onKeyPress={this.handleAddNewTodo}
                        />
                        <Button variant="contained" className={jss.button} color="primary" aria-label="Add your thing"
                                onClick={() => this.addNewTodo()}>
                            Add your thing
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(jss)(connect()(withRouter(Todo)));
