import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Todos from "./Todos";
import Todo from "./Todo";
import sass from "./styles/Page.module.sass";

import {CSSTransition, TransitionGroup,} from 'react-transition-group';

class Navigator extends Component {
    render() {
        return (
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition key={location.key} timeout={300} classNames={{
                        enter: sass["fade-enter"],
                        enterActive: sass["fade-enter-active"],
                        exit: sass["fade-exit"],
                        exitActive: sass["fade-exit-active"]
                    }}>
                        <Switch location={location}>
                            <Route exact path="/" component={Todos}/>
                            <Route path="/todo" component={Todo}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}/>
        );
    }
}

export default withRouter(Navigator);
