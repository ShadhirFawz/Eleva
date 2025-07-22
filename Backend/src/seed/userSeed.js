import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedUser = async () => {
  try {
    const email = "test@example.com";
    const password = "password123";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Test User",
      email,
      password: hashedPassword,
    });

    console.log("✅ Static user created successfully.");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed user:", error);
    process.exit(1);
  }
};

seedUser();
