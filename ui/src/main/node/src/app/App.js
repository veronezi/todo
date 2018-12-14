import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './Login';
import Todos from './Todos';
import Todo from "./Todo";
import withStyles from "@material-ui/core/styles/withStyles";
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    "@global": {
        "#root": {
            backgroundColor: theme.palette.primary.dark
        },
        ".page": {
            backgroundColor: grey[50]
        }
    }
});

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path="/" component={Todos}/>
                    <Route exact path="/todo" component={Todo}/>
                    <Route path="/login" component={Login}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(App);
