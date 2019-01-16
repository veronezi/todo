import React from "react";
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

const Loading = ({loading}) => (
    <LinearProgress value={100} variant={loading ? "indeterminate" : "determinate"}/>
);

const mapStateToProps = state => {
    return {
        loading: state.loadingMarkers.length > 0
    };
};
export default connect(mapStateToProps)(Loading);
