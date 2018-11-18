import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function books(state = [], action) {
    switch (action.type) {
        case 'BOOKS':
            return action.data;
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case 'USER_LIST':
            return action.data;
        default:
            return state;
    }
}

function session(state = null, action) {
    switch (action.type) {
        case 'NEW_SESSION':
            return action.data;
        case 'CLEAR_SESSION':
            return null;
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    console.log("reducer", state0, action);

    let reducer = combineReducers({books, users, session});
    let state1 = reducer(state0, action);

    console.log("reducer1", state1);

    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;