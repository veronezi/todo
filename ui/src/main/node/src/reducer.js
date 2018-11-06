const init = {
    todos: [],
    loadingMarkers: []
};

const UPDATE_TODOS_LIST = 'UPDATE_TODOS_LIST';
const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';
const ADD_LOADING_MARKER = 'ADD_LOADING_MARKER';
const REMOVE_LOADING_MARKER = 'REMOVE_LOADING_MARKER';

const reducer = (state = init, action) => {
    if (action.type === TOGGLE_TODO_STATUS) {
        let newTodos = state.todos.slice(0);
        let todo = newTodos.find(todo => todo.id === action.todo.id);
        todo.done = !todo.done;
        return {
            ...state,
            todos: newTodos
        }
    }
    if (action.type === UPDATE_TODOS_LIST) {
        return {
            ...state,
            todos: action.todos
        }
    }
    if (action.type === ADD_LOADING_MARKER) {
        return {
            ...state,
            loadingMarkers: state.loadingMarkers.concat([action.payload])
        }
    }
    if (action.type === REMOVE_LOADING_MARKER) {
        return {
            ...state,
            loadingMarkers: state.loadingMarkers.filter((marker) => marker !== action.payload)
        }
    }
    return state;
};

export {
    UPDATE_TODOS_LIST,
    TOGGLE_TODO_STATUS,
    ADD_LOADING_MARKER,
    REMOVE_LOADING_MARKER
};
export default reducer;
