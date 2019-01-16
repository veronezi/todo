import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./Login";
import Navigator from "./Navigator";
import jss from "./App.jss";

const App = ({classes}) => (
    <BrowserRouter>
        <div className={classes.application}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Navigator}/>
        </div>
    </BrowserRouter>
);

export default jss(App);
