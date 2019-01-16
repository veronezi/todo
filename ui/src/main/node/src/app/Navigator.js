import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import Todos from "./Todos";
import Todo from "./Todo";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import jss from "./Navigator.jss";

const Navigator = ({classes}) => (
    <Route render={({location}) => (
        <div className={classes.root}>
            <TransitionGroup component={null}>
                <CSSTransition key={location.key} timeout={300} classNames={{
                    enter: classes["fade-enter"],
                    enterActive: classes["fade-enter-active"],
                    exit: classes["fade-exit"],
                    exitActive: classes["fade-exit-active"]
                }}>
                    <Switch location={location}>
                        <Route exact path="/" component={Todos}/>
                        <Route path="/todo" component={Todo}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )}/>
);

export default jss(withRouter(Navigator));
