import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./Login";
import Navigator from "./Navigator";
import withStyles from "@material-ui/core/styles/withStyles";
import sass from "./styles/App.module.sass";
import jss from "./jss/App.jss";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {connect} from "react-redux";

class App extends Component {

    render() {
        return (
            <MuiThemeProvider theme={this.props.theme}>
                <BrowserRouter>
                    <div className={sass.application}>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={Navigator}/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    let theme = {
        palette: {
            ...state.palette
        },
        typography: {
            useNextVariants: true
        }
    };
    return {
        theme: createMuiTheme(theme)
    };
};
export default connect(mapStateToProps)(withStyles(jss)(App));
