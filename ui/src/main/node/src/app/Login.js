import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import CheckIcon from '@material-ui/icons/Check'
import axios from 'axios';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import withStyles from "@material-ui/core/styles/withStyles";
import grey from '@material-ui/core/colors/grey';
import classNames from 'classnames';

const styles = theme => ({
    theme: {
        backgroundColor: theme.palette.primary[50]
    },
    dark: {
        color: grey.A700
    }
});

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
            <div className={classNames("login", "content")}>
                <Card className={this.props.classes.theme}>
                    <CardContent className={"fields"}>
                        <TextField className="field"
                                   label="Username"
                                   onChange={this.handleUsernameChange}
                                   value={this.state.username}
                                   required
                        />
                        <TextField className="field"
                                   label="Password"
                                   type="password"
                                   onChange={this.handlePasswordChange}
                                   onKeyPress={this.handlePasswordEnter}
                                   value={this.state.password}
                                   required
                        />
                        <span className={this.props.classes.dark}>Hey, any username/password works here. This is just a demo. :)</span>
                    </CardContent>
                    <CardActions>
                        <Button disabled={this.state.username.trim() === '' || this.state.password.trim() === ''}
                                variant="fab" color="primary" aria-label="Login" onClick={() => this.handleLogin()}>
                            <CheckIcon/>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Login);
