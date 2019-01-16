import React, {Component} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import CheckIcon from "@material-ui/icons/Check"
import axios from "axios";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import classNames from "classnames";
import jss from "./Login.jss";
import Fab from "@material-ui/core/Fab/Fab";
import Typography from "@material-ui/core/Typography";

class Login extends Component {

    state = {
        username: "",
        password: ""
    };

    componentDidMount() {
        document.title = "TODOs - Login";
    }

    handleUsernameChange = (event) => {
        this.setState({
            ...this.state,
            username: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            ...this.state,
            password: event.target.value
        });
    };

    handlePasswordEnter = (event) => {
        if (event.key === "Enter") {
            this.handleLogin();
        }
    };

    handleLogin = () => axios.post("/api/login", {
        username: this.state.username,
        password: this.state.password,
        expiresIn: "24h"
    }).then((resp) => {
        localStorage.setItem("auth-todo", resp.data);
        window.location.href = "/";
    }).catch((error) => console.log(error));

    render() {
        const {classes} = this.props;
        const {username, password} = this.state;
        return (
            <div className={classNames(classes.login, classes.content)}>
                <Card className={classNames(classes.loginChild, classes.theme)}>
                    <CardContent className={classes.fields}>
                        <TextField className={classNames(classes.fieldsChild, "field")} label="Username"
                                   onChange={(event) => this.handleUsernameChange(event)}
                                   value={username}
                                   required
                        />
                        <TextField className={classNames(classes.fieldsChild, "field")} label="Password"
                                   type="password"
                                   onChange={(event) => this.handlePasswordChange(event)}
                                   onKeyPress={(event) => this.handlePasswordEnter(event)}
                                   value={password}
                                   required
                        />
                        <Typography variant="caption" className={classNames(classes.hint)} gutterBottom>
                            Hey, any username/password works here. This is just a demo. :)
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.center}>
                        <Fab disabled={username.trim() === "" || password.trim() === ""}
                             color="primary" aria-label="Login" onClick={() => this.handleLogin()}>
                            <CheckIcon/>
                        </Fab>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default jss(Login);
