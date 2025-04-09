import dotenv from "dotenv"
import connectDB from "../db/index.js"

dotenv.config({path:"./.env"})

export const runSeeder = async(SeederFunction) =>{
    try {
        await connectDB()
        await SeederFunction()
        console.log("Seeding completed successfully ✅")
        process.exit(0)
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}