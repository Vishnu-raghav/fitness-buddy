import mongoose from "mongoose";
const {Schema} = mongoose

const dietSchema = new Schema(
  {
    mealType : {
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
      required : true,
    },
    exercise : [
      {
        name : {
          type : String,
          required : true,
        },
        sets : {
          type : Number,
          default : 4,
        },
        reps : {
          type : Number,
          default : 12
        },
        duration :{
          type : String,
          default : "25 min"
        }
      }
    ]
  },
  {
    id : false
  }
);

const goalSchema = new Schema(
  {
    name : {
      type : String,
      enum : ["Muscle Gain", "Fat Loss", "Stay Fit"],
      required : true,
    },
    diet : [dietSchema],
    workOut : [workOutSchema]
  },
  {timestamps : true}
)

export const Goal = mongoose.model("Goal",goalSchema)