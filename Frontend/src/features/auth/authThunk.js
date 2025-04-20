import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./authApi.js"

// register
export const registerThunk = createAsyncThunk("auth/register",async(data, {rejectWithValue}) => {
    try {
        const res = await api.registerUser(data)
        return res.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

// login
export const loginThunk = createAsyncThunk("auth/login",async(data, {rejectWithValue})=>{
    try {
        const res = await api.loginUser(data)
        return res.data.user
    } catch (error) {
        return rejectWithValue(err.response.data.message);
    }
})

//logout
export const logoutThunk = createAsyncThunk("auth/logout",async(data, {rejectWithValue})=>{
    try {
        await api.logoutUser()
    } catch (error) {
        return rejectWithValue(err.response.data.message);
    }
})

//current-user
export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
    try {
       const res = await api.getCurrentUser();
       return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    } 
});