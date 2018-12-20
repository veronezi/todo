import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import jss from './jss/TodosDates.jss';

// we will mock this later to make tests not random
const functions = {
    getNow: () => new Date()
};

const options = {
    year: 'numeric', month: 'numeric', day: 'numeric'
};

class TodosDates extends Component {
    render() {
        let jss = this.props.classes;
        return (
            <Typography className={jss.light} variant="subtitle1">
                {new Intl.DateTimeFormat('en-US', options).format(functions.getNow())}
            </Typography>
        );
    }
}

export default withStyles(jss)(TodosDates);
export {functions};
