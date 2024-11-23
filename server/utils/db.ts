import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.DB_URL as string;
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
  }
};
export default connectDB;
