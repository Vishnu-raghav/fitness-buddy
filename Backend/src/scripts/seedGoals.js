import { runSeeder } from "./seedRunner.js";
import { Goal } from "../models/goal.model.js";

// utility to convert string exercises into required object format
const formatExercises = (exerciseArr) =>
  exerciseArr.map((ex) => ({ name: ex }));

const goalData = [
  {
    name: "Muscle Gain",
    diet: [
      { mealType: "Breakfast", items: ["Oats", "Boiled Eggs", "Banana"] },
      { mealType: "Lunch", items: ["Brown Rice", "Grilled Chicken", "Salad"] },
      { mealType: "Snacks", items: ["Dry Fruits", "Greek Yogurt"] },
      { mealType: "Dinner", items: ["Paneer", "Sweet Potato", "Veggies"] },
    ],
    workOut: [
      { day: "Monday", exercise: formatExercises(["Chest Press", "Push Ups", "Triceps"]) },
      { day: "Tuesday", exercise: formatExercises(["Back Rows", "Lat Pulldown", "Biceps"]) },
      { day: "Wednesday", exercise: formatExercises(["Leg Press", "Lunges", "Squats"]) },
      { day: "Thursday", exercise: formatExercises(["Shoulder Press", "Lateral Raises"]) },
      { day: "Friday", exercise: formatExercises(["Deadlifts", "Barbell Rows"]) },
      { day: "Saturday", exercise: formatExercises(["Full Body HIIT"]) },
      { day: "Sunday", exercise: formatExercises(["Rest or Stretching"]) },
    ],
  },

  {
    name: "Fat Loss",
    diet: [
      { mealType: "Breakfast", items: ["Green Tea", "Apple", "Boiled Egg"] },
      { mealType: "Lunch", items: ["Quinoa", "Grilled Fish", "Veggies"] },
      { mealType: "Dinner", items: ["Soup", "Salad", "Tofu"] },
    ],
    workOut: [
      { day: "Monday", exercise: formatExercises(["HIIT Cardio", "Jumping Jacks", "Burpees"]) },
      { day: "Tuesday", exercise: formatExercises(["Treadmill", "Cycling", "Plank"]) },
      { day: "Wednesday", exercise: formatExercises(["HIIT Full Body", "Mountain Climbers"]) },
      { day: "Thursday", exercise: formatExercises(["Stair Climb", "Box Jump", "Rope Skip"]) },
      { day: "Friday", exercise: formatExercises(["Fat Burn Circuit"]) },
      { day: "Saturday", exercise: formatExercises(["Yoga + Cardio Mix"]) },
      { day: "Sunday", exercise: formatExercises(["Stretch & Relax"]) },
    ],
  },

  {
    name: "Stay Fit",
    diet: [
      { mealType: "Breakfast", items: ["Smoothie", "Oats", "Dry Fruits"] },
      { mealType: "Lunch", items: ["Dal", "Rice", "Veggies", "Curd"] },
      { mealType: "Dinner", items: ["Light Sabzi", "Roti", "Milk"] },
    ],
    workOut: [
      { day: "Monday", exercise: formatExercises(["Jogging", "Plank", "Push-ups"]) },
      { day: "Tuesday", exercise: formatExercises(["Stretching", "Surya Namaskar"]) },
      { day: "Wednesday", exercise: formatExercises(["Skipping", "Cycling"]) },
      { day: "Thursday", exercise: formatExercises(["Stair Climbing", "Yoga"]) },
      { day: "Friday", exercise: formatExercises(["Zumba", "Dance Workout"]) },
      { day: "Saturday", exercise: formatExercises(["Walk", "Meditation"]) },
      { day: "Sunday", exercise: formatExercises(["Active Rest", "Foam Rolling"]) },
    ],
  },
];

const seedGoals = async () => {
  await Goal.deleteMany(); // clean first
  await Goal.insertMany(goalData);
  console.log("🎯 Goals with 7-day diet and workout seeded successfully!");
};

runSeeder(seedGoals);

export default seedGoals;
