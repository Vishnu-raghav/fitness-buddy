import {createSlice} from "@reduxjs/toolkit"

import {
    loginThunk,
    logoutThunk,
    registerThunk,
    fetchCurrentUser,} from "./authThunk.js"

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        loading : null,
        isAuthenticated: false,
        error : null,
    },

    reducers : {},

    extraReducers:(builder)=>{
        builder
        .addCase(registerThunk.pending,(state) =>{
            state.loading = true;
        })
        .addCase(registerThunk.fulfilled,(state,action) =>{
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = true
        })
        .addCase(registerThunk.rejected,(state,action) =>{
            state.error = action.payload;
            state.loading = true;
        })
        .addCase(loginThunk.fulfilled,(state,action) =>{
            state.user = action.payload 
            state.isAuthenticated = true
        })
        .addCase(logoutThunk.fulfilled,(state) =>{
            state.user = null 
            state.isAuthenticated = false
        })
        .addCase(fetchCurrentUser.fulfilled,(state) =>{
            state.user = action.payload
            state.isAuthenticated = true
        })
    }
})

export default authSlice.reducer