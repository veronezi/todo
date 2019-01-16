import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import Todos from "./Todos";
import Todo from "./Todo";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import jss from "./Navigator.jss";

class Navigator extends Component {
    render() {
        let jss = this.props.classes;
        return (
            <Route render={({location}) => (
                <div className={jss.root}>
                    <TransitionGroup component={null}>
                        <CSSTransition key={location.key} timeout={300} classNames={{
                            enter: jss["fade-enter"],
                            enterActive: jss["fade-enter-active"],
                            exit: jss["fade-exit"],
                            exitActive: jss["fade-exit-active"]
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

export default jss(withRouter(Navigator));
