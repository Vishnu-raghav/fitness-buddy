import axios from "axios"

const Api = axios.create({
    baseUrl : "http://localhost:5000/api/v1",
    withCredentials : true
})

export const registerUser = (data) => Api.post("/register",data)

export const loginUser = (data) => Api.post("/login",data)

export const logoutUser = () => Api.post("/logout")

export const getCurrentUser = () => Api.get("/current-user")

export const changePassword = (data) => Api.put("/change-password",data)

export const updateAccount = (data) => Api.put("/update-account",data)

export const updateGoal = (data) => Api.put("/update-goal",data)
