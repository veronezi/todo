import React, {Component} from "react";
import classNames from "classnames";
import jss from "./Config.jss";
import Color from "./Color";
import {UPDATE_PALETTE} from "../reducer";

import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";

class Config extends Component {

    updatePrimary = (color) => {
        this.props.onUpdatePalette({
            ...this.props.palette,
            primary: color
        });
    };

    updateSecondary = (color) => {
        this.props.onUpdatePalette({
            ...this.props.palette,
            secondary: color
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.page, classes.root)}>
                <Typography variant="subtitle1">
                    Primary
                </Typography>
                <Color onChange={(color) => this.updatePrimary(color)}/>
                <Typography variant="subtitle1">
                    Secondary
                </Typography>
                <Color onChange={(color) => this.updateSecondary(color)}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        palette: state.palette
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onUpdatePalette: (palette) => dispatch({type: UPDATE_PALETTE, palette: palette})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(jss(Config));
