import React, {Component} from "react";
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

class Loading extends Component {
    render() {
        return (
            <LinearProgress value={100} variant={this.props.loading ? "indeterminate" : "determinate"}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loadingMarkers.length > 0
    };
};
export default connect(mapStateToProps)(Loading);
