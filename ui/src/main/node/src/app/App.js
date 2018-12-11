import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './Login';
import Todos from './Todos';
import Todo from "./Todo";

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

export default App;
