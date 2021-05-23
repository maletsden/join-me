import { SET_USER, REMOVE_USER } from '../constants/user-types';


export function setUser(user) {
    return { type: SET_USER, payload: user }
}

export function removeUser(user) {
    return { type: REMOVE_USER, payload: user }
}