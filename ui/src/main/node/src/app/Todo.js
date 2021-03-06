import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import axios from "./Rest";
import Loading from "./Loading";
import Back from "@material-ui/icons/ArrowBack";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from "@material-ui/core/Button/Button";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography/Typography";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import jss from "./Todo.jss";

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
        const {classes} = this.props;
        return (
            <div className={classNames(classes.page)}>
                <Loading/>
                <div className={classNames(classes.content)}>
                    <div className={classes.header}>
                        <Back className={classes.back} onClick={this.handleGoBack}/>
                        <Typography variant="h6">Add new thing</Typography>
                        <DashboardIcon/>
                    </div>
                    <div className={classes.form}>
                        <TextField className={classNames(classes.field, "field")}
                                   label="New todo"
                                   value={this.state.newTodo}
                                   onChange={this.handleNewTodoChange}
                                   onKeyPress={this.handleAddNewTodo}
                                   autoFocus={true}
                        />
                        <Button variant="contained" className={classes.button} color="primary" aria-label="Add your thing"
                                onClick={() => this.addNewTodo()}>
                            Add your thing
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(jss(Todo)));
