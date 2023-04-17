import {createSlice} from '@reduxjs/toolkit';

const sessionSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    }
})

export const sessionActions = sessionSlice.actions;

export default sessionSlice;
