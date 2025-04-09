import mongoose from "mongoose"
import { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
     },
     refreshToken : {
      type : String
     }
    },
    {
    timestamps : true
    }
)

userSchema.pre("save",async function(next){
   if(!this.isModified("password")) return next()

      this.password = await bcrypt.hash(this.password,10)
      next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)