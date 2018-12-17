import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './Login';
import Navigator from './Navigator';
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
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Navigator}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(App);
