import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import {Goal} from "../models/goal.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId)=>{
try {
        const user = await User.findById({userId})
        const accessToken = user.generateAccessToken()
        const refreshToken = user.genrateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
    
        return {accessToken,refreshToken}
} catch (error) {
    throw new ApiError(500,"Something went wrong while generating access and refresh Tokens")
}
}


const registerUser = asyncHandler(async (req,res)=>{
    const {fullName,email,password,goal} = req.body

    if (!(fullName && email && password && goal)) {
        throw new ApiError("All fields are required");
    }
    
    const existUser = await User.findOne({email})

    if(existUser){
        throw new ApiError("User already exist")
    }

    const goalDoc = await Goal.findOne({name:goal})

    if (!goalDoc) {
        throw new ApiError("Invalid goal selected");
    }

    const user = await User.create({
     fullName,
     email,
     password,
     goal:goalDoc._id
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went Wrong while registering")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )
})


const loginUser = asyncHandler(async(req,res)=>{
    // user data = req.body
    // check password 
    // generate accesstoken

    const {email,password} = req.body

    if(!(email && password)){
        throw new ApiError("all fields are required")
    }
    
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"user not found")
    }

    const isPasswordValid = await user.isPaswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid User Credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user?._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true,
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
             user,loggedInUser,accessToken,refreshToken
            },
             "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {},

    )
})

export {
    registerUser,
    loginUser,
}