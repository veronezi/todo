import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Todos from "./Todos";
import Todo from "./Todo";

class Navigator extends Component {
    render() {
        let page = null;
        let path = this.props.location.pathname;
        if(path === '/') {
            page = (<Todos/>);
        }
        if(path === '/todo') {
            page = (<Todo/>);
        }
        return (
            <div>{page}</div>
        );
    }
}

export default withRouter(Navigator);
