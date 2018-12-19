import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './Login';
import Navigator from './Navigator';
import withStyles from "@material-ui/core/styles/withStyles";
import sass from './styles/App.module.sass';
console.log(sass);

const styles = theme => ({
    "@global": {
        "body": {
            margin: 0,
            padding: 0
        },
        "html, body": {
            height: "100vh"
        },
        "#root": {
            backgroundColor: theme.palette.primary.dark,
            height: "100%",
            display: "flex",
            "flex-direction": "column",
            "align-items": "center"
        },
        ".page": {
            backgroundColor: theme.palette.secondary[50]
        }
    }
});

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className={sass.App}>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Navigator}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(App);
