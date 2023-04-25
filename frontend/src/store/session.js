
import { csrfFetch } from './csrf';
// import thunk from 'redux-thunk';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser'
const GRAB_SPOTS = 'session/setSpots'
// const RESTORE_USER = 'session/userRestore'
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = (user) => {
    return {
        type: REMOVE_USER,
        payload: user
    };
}

const setSpots = (spots) => {
    return {
        type: GRAB_SPOTS,
        payload: spots
    };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    window.location.reload(false);
    return response;
};

const initialState = {
    user: null
}
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async dispatch => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const logout = (user) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
};
//SPOTS
export const grabSpots = (spots) => async dispatch => {
    const response = await csrfFetch(`/api/spots`);
    const data = await response.json();
    dispatch(setSpots(data.spots));
    return response;
}

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case GRAB_SPOTS:
            newState = Object.assign({}, state);
            newState.spots = action.payload;
            return newState;
        default:
            return state;
    }
};
export default sessionReducer;
