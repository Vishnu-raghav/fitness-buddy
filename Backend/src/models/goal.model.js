import mongoose from "mongoose";
const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["Muscle Gain", "Fat Loss", "Stay Fit"],
      required: true,
    },
    diet: [
      {
        type: String, 
        items: [String], 
      },
    ],
    
    diet: [
      {
        type: {
          type: String, // meal name
        },
        items: [String],
      },
    ],

    workout: [
      {
        day: String,
        exercise: [String],
      },
    ],
  },
  { timestamps: true }
);

export const Goal = mongoose.model("Goal", goalSchema);
