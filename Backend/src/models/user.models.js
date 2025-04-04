import mongoose from "mongoose"
import { Schema } from "mongoose"
// import jwt from "jwt"

const userSchema = new Schema(
    {
     FullName : {
        type : String,
        required : true
     },
     email : {
        type : String,
        required : true
     },
     password : {
        type : String,
        required : true
     },
     goal : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Goal"
     }
    },
    {
    timestamps : true
    }
)


export const User = mongoose.model("User",userSchema)