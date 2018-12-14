import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/lato-font/css/lato-font.min.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import {Provider} from "react-redux";
import "typeface-roboto";

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        color: {
            primary: blue
        }
    },
    typography: {
        useNextVariants: true
    }
});
console.log('theme', theme);

ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
