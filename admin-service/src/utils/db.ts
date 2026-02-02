import mongoose from "mongoose";
import dotenv from "dotenv";
import { ServerConfig } from "../config";
dotenv.config();

export const connectDB = async () => {
    try{
        await mongoose.connect(ServerConfig.MONGO_URI as string);
        console.log("MongoDB connected");
    }catch(error : any){
        console.log("Error connecting to MongoDB", error.message);
        process.exit(1); //exit the process 
    }
}
