import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl)
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1)
  }
}