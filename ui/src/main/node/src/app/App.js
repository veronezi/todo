import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './Login';
import Navigator from './Navigator';
import withStyles from "@material-ui/core/styles/withStyles";
import sass from './styles/App.module.sass';
import jss from './jss/App.jss';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className={sass.application}>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Navigator}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default withStyles(jss)(App);
