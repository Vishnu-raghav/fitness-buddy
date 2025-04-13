import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js";
import { Goal } from "../models/goal.model.js";


const getUserPlan = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id).populate("goal")

    if(!user) throw new ApiError(404,"User goal not found")

    if(!user.goal) throw new ApiError(404,"goal not assigned to user")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                goalName : user.goal.name,
                diet : user.goal.diet,
                workout : user.goal.workOut
            }
        )
    )
})

const getGoals = asyncHandler (async(req,res) =>{
 const {goal} = req.body

 if(!goal){
    throw new ApiError(404,"Goal data not found")
 }

 const goalData = await Goal.findOne({name : goal})

 if(!goalData){
    throw new ApiError(404,"Goal data not found")
 }

 return res
 .status(200)
 .json(
    new ApiResponse(
        200,
        goalData,
        "user goaldata fetch successfully"
    )
 )
})

export {getUserPlan,getGoals}