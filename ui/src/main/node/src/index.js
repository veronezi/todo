import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import {Provider} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.css";
import "typeface-roboto";

ReactDOM.render(<Provider store={store}>
    <CssBaseline/>
    <App/>
</Provider>, document.getElementById("root"));
registerServiceWorker();
