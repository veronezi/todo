import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import {Provider} from "react-redux";
import {MuiThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import "typeface-roboto";

ReactDOM.render((<Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </MuiThemeProvider>
</Provider>), document.getElementById("root"));
registerServiceWorker();
