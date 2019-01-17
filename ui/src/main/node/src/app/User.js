import React from "react";
import jss from "./User.jss";
import jwt from "jsonwebtoken";
import Icon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";


const getUserName = () => {
    const token = localStorage.getItem("auth-todo");
    if (!token) {
        return "guest";
    }
    return jwt.decode(token).upn;
};

const logout = () => {
    localStorage.removeItem("auth-todo");
    window.location.href = "/login";
};

const User = ({classes}) => (
    <Tooltip title={`Logout`} aria-label={`Logout`}>
        <div className={classes.root} onClick={logout}>
            <Icon className={classes.light}/>
            <Typography variant="body2" className={classes.light}>
                {getUserName()}
            </Typography>
        </div>
    </Tooltip>
);

export default jss(User);
