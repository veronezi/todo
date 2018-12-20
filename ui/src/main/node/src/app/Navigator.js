import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import Todos from "./Todos";
import Todo from "./Todo";
import sass from "./styles/Page.module.sass";

import {CSSTransition, TransitionGroup} from "react-transition-group";
import jss from "./jss/Navigator.jss";
import withStyles from "@material-ui/core/styles/withStyles";

class Navigator extends Component {
    render() {
        let jss = this.props.classes;
        return (
            <Route render={({location}) => (
                <div className={jss.root}>
                    <TransitionGroup component={null}>
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
                </div>
            )}/>
        );
    }
}

export default withStyles(jss)(withRouter(Navigator));
