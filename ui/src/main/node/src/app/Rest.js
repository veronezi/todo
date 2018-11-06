import axios from 'axios';
import store from "../store";
import {ADD_LOADING_MARKER, REMOVE_LOADING_MARKER} from "../reducer";

const instance = axios.create({});

const getAddLoadingAction = (marker) => {
    return {
        type: ADD_LOADING_MARKER,
        payload: marker
    };
};

const getRemoveLoadingAction = (marker) => {
    return {
        type: REMOVE_LOADING_MARKER,
        payload: marker
    };
};

instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem('auth-todo');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    store.dispatch(getAddLoadingAction(config.marker));
    return config;
}, function (error) {
    store.dispatch(getRemoveLoadingAction(error.config.marker));
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    store.dispatch(getRemoveLoadingAction(response.config.marker));
    return response;
}, function (error) {
    store.dispatch(getRemoveLoadingAction(error.config.marker));
    if (error.response.status >= 400 && error.response.status <= 499) {
        localStorage.removeItem('auth-todo');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default instance;