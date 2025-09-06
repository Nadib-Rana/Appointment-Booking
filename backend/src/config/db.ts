// config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import { url } from "inspector";

dotenv.config();

const uri = process.env.MONGO_URI

if (!uri) {
  throw new Error("Missing MONGO_URI in .env");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};