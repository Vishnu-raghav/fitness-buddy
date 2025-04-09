import mongoose from "mongoose";
const {Schema} = mongoose

const dietSchema = new Schema(
  {
    mealType :{
      type : String,
      enum : ["BreakFast","Lunch","Snacks","Dinner"],
      required : true,
    },
    items : [
      {
        type : String,
        required : true
      }
    ]
  },
  {id:false}
)

const workOutSchema = new Schema(
  {
    day : {
      type : String,
      enum : [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required : true
    }
  }
)