import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import CheckIcon from '@material-ui/icons/Check'
import axios from 'axios';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";

class Login extends Component {

    state = {
        username: '',
        password: ''
    };

    componentDidMount() {
        document.title = "TODOs - Login";
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handlePasswordEnter = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    };

    handleLogin = () => {
        axios.post('/api/login', {
            username: this.state.username,
            password: this.state.password,
            expiresIn: "24h"
        }).then((resp) => {
            localStorage.setItem('auth-todo', resp.data);
            window.location.href = '/';
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="login">
                <Card>
                    <CardContent className={"fields"}>
                        <TextField className="field"
                                   label="Username"
                                   onChange={this.handleUsernameChange}
                                   value={this.state.username}
                        />
                        <TextField className="field"
                                   label="Password"
                                   type="password"
                                   onChange={this.handlePasswordChange}
                                   onKeyPress={this.handlePasswordEnter}
                                   value={this.state.password}
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="fab" color="primary" aria-label="Login" onClick={this.handleLogin}>
                            <CheckIcon/>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Login;
