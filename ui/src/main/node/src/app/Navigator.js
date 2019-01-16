import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import Todos from "./Todos";
import Todo from "./Todo";
import Config from "./Config";
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
                        <Route path="/config" component={Config}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )}/>
);

export default withRouter(jss(Navigator));
