import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/lato-font/css/lato-font.min.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import {Provider} from "react-redux";
import "typeface-roboto";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
