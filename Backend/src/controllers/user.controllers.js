import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import {Goal} from "../models/goal.model.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId)=>{
try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
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
        new ApiResponse(200,createdUser,"User Register Successfully")
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

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid User Credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user?._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : false,
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
             user:loggedInUser,accessToken,refreshToken
            },
             "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set :{
                refreshToken : undefined,
            }
        },
        {
            new : true
        },
    )
    const options = {
        httpOnly : true,
        secure : false,
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User Logout SuccessFully")
    )
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorized request")
    }

    try {
        const decodedToken = await jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401,"Invalid refresh Tokem")
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"expire refresh token")
        }

        const options = {
            httpOnly : true,
            secure : true
        }

        const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(user._id)

        return res
        .status(201)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken : newRefreshToken},
                "Accessed token is refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Refresh Token")
    }
})


const changeCurrentPassword = asyncHandler(async(req,res) =>{
    const {oldPassword,newPassword} = req.body

    const user = await User.findById(req.user._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid old Password")
    }

    user.password = newPassword
    user.save({validateBeforeSave : false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.user,"User fetched successfully")
    )
})

const updateAccountDetail = asyncHandler(async (req,res) =>{
    const {fullName,email} = req.body

    if(!fullName || !email){
        throw new ApiError(400 , "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                fullName,
                email,
            }
        },
        {new : true}
    ).select("-password")
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Account Detailed updated successfully")
    )

})

const updateUserGoal = asyncHandler(async(req,res) =>{
    const {goal} = req.body
    
    if (!goal) throw new ApiError(400, "Goal ID is required");

    const newGoal = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                goal
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,{goal : newGoal}, "Gaol changed successFully")
    )
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetail,
    updateUserGoal,
}