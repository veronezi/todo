import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./Login";
import Navigator from "./Navigator";
import jss from "./App.jss";

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

export default jss(App);
