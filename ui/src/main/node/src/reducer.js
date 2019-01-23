import primaryColor from "@material-ui/core/colors/indigo";
import secondaryColor from "@material-ui/core/colors/red";

const tokenKey = "auth-todo";
const init = {
    accessToken: localStorage.getItem(tokenKey),
    todos: [],
    loadingMarkers: [],
    palette: {
        primary: primaryColor,
        secondary: secondaryColor
    }
};

const ADD_ACCESS_TOKEN = "ADD_ACCESS_TOKEN";
const REMOVE_ACCESS_TOKEN = "REMOVE_ACCESS_TOKEN";
const UPDATE_PALETTE = "UPDATE_PALETTE";
const UPDATE_TODOS_LIST = "UPDATE_TODOS_LIST";
const TOGGLE_TODO_STATUS = "TOGGLE_TODO_STATUS";
const ADD_LOADING_MARKER = "ADD_LOADING_MARKER";
const REMOVE_LOADING_MARKER = "REMOVE_LOADING_MARKER";

const reducer = (state = init, action) => {
    switch (action.type) {
        case ADD_ACCESS_TOKEN: {
            localStorage.setItem(tokenKey, action.payload);
            return {
                ...state,
                accessToken: action.payload
            }
        }
        case REMOVE_ACCESS_TOKEN: {
            localStorage.removeItem(tokenKey);
            return {
                ...state,
                accessToken: null
            }
        }
        case TOGGLE_TODO_STATUS: {
            let newTodos = state.todos.slice(0);
            let todo = newTodos.find(todo => todo.id === action.todo.id);
            todo.done = !todo.done;
            return {
                ...state,
                todos: newTodos
            }
        }
        case UPDATE_TODOS_LIST: {
            return {
                ...state,
                todos: action.todos
            }
        }
        case ADD_LOADING_MARKER: {
            return {
                ...state,
                loadingMarkers: state.loadingMarkers.concat([action.payload])
            }
        }
        case REMOVE_LOADING_MARKER: {
            return {
                ...state,
                loadingMarkers: state.loadingMarkers.filter((marker) => marker !== action.payload)
            }
        }
        case UPDATE_PALETTE: {
            console.log("new palette", action.palette);
            return {
                ...state,
                palette: action.palette
            }
        }
        default: {
            return state;
        }
    }
};

export {
    ADD_ACCESS_TOKEN,
    REMOVE_ACCESS_TOKEN,
    UPDATE_PALETTE,
    UPDATE_TODOS_LIST,
    TOGGLE_TODO_STATUS,
    ADD_LOADING_MARKER,
    REMOVE_LOADING_MARKER
};
export default reducer;
