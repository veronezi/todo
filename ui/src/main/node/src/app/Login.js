import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import CheckIcon from '@material-ui/icons/Check'
import axios from 'axios';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import sass from './styles/Login.module.sass';
import Fab from "@material-ui/core/Fab/Fab";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    theme: {
        backgroundColor: theme.palette.secondary[50]
    },
    hint: {
        color: theme.palette.text.hint
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
            <div className={classNames(sass.login, sass.content)}>
                <Card className={this.props.classes.theme}>
                    <CardContent className={sass.fields}>
                        <TextField className={"field"} label="Username"
                                   onChange={this.handleUsernameChange}
                                   value={this.state.username}
                                   required
                        />
                        <TextField className={"field"} label="Password"
                                   type="password"
                                   onChange={this.handlePasswordChange}
                                   onKeyPress={this.handlePasswordEnter}
                                   value={this.state.password}
                                   required
                        />
                        <Typography variant="caption" className={classNames(this.props.classes.hint, sass.hint)} gutterBottom>
                            Hey, any username/password works here. This is just a demo. :)
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Fab disabled={this.state.username.trim() === '' || this.state.password.trim() === ''}
                             color="primary" aria-label="Login" onClick={() => this.handleLogin()}>
                            <CheckIcon/>
                        </Fab>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Login);
