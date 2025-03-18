
import { connect } from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/alumniDB");
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
