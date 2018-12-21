import React, {Component} from "react";
import pageSass from "./styles/Page.module.sass";
import sass from "./styles/Config.module.sass";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import jss from "./jss/Config.jss";
import Color from "./Color";
import {UPDATE_PALETTE} from "../reducer";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography";

class  Config extends Component {

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
        let jss = this.props.classes;
        return (
            <div className={classNames(pageSass.page, sass.config, jss.root)}>
                <Typography variant="subtitle1">
                    Primary
                </Typography>
                <Color onChange={(color) => this.updatePrimary(color) }/>
                <Typography variant="subtitle1">
                    Secondary
                </Typography>
                <Color onChange={(color) => this.updateSecondary(color) }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(jss)(Config));
