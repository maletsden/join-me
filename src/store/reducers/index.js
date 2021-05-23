import {SET_USER, REMOVE_USER} from '../constants/user-types';

const initialState = {
    user: {}
};


function rootReducer(state = initialState, action) {
    if (action.type === SET_USER) {
        return {user: action.payload};
    }

    if (action.type === REMOVE_USER) {
        return {user: {}};
    }

    return state;
}

export default rootReducer;