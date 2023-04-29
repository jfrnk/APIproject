
import { csrfFetch } from './csrf';
// import thunk from 'redux-thunk';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser'
const GRAB_SPOTS = 'session/setSpots'
const ADD_SPOT = 'session/addSpot';
const ADD_IMAGE = 'session/addImage';
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

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        payload: image
    }
}

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

export const createSpot = (spot) => async dispatch => {
    const { name, address, city, state, country, lat, lng, description, price } = spot;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            name,
            address,
            city,
            state,
            country,
            lat,
            lng,
            description,
            price
        }),
    });
    const data = await response.json();
    dispatch(addSpot(data.spot));
    return response;
}


export const createImage = (image) => async dispatch => {
    const { url, preview } = image;

    const lastResponse = await csrfFetch('/api/spots');
    const lastData = await lastResponse.json();
    const lastspot = lastData.spots.pop();
    // console.log(lastData);
    const lastSpotId = lastspot.id;

    const response = await csrfFetch(`/api/spots/${lastSpotId}/images`, {
        method: 'POST',
        body: JSON.stringify({
            url,
            preview,
        }),
    });
    const data = await response.json();
    dispatch(addImage(data.image));
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
        case ADD_SPOT:
            newState = Object.assign({}, state);
            newState.spot = action.payload;
            return newState;
        case ADD_IMAGE:
            newState = Object.assign({}, state);
            newState.image = action.payload;
            return newState;
        default:
            return state;
    }
};
export default sessionReducer;
