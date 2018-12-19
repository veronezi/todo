import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './Login';
import Navigator from './Navigator';
import withStyles from "@material-ui/core/styles/withStyles";

class App extends Component {

    render() {
        let jss = this.props.classes;
        return (
            <BrowserRouter>
                <div className={jss.application}>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Navigator}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default withStyles(theme => {
    let width = "600px";
    return {
        "@global": {
            "#root": {
                backgroundColor: theme.palette.primary.dark
            }
        },
        application: {
            width: width,
            height: "100%",
            [`@media only screen and (max-width: ${width})`]: {
                width: "100%"
            },
            "> div": {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative"
            }
        }
    };
})(App);
