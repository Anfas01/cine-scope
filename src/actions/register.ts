"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";

type RegisterState = {
  error: string;
};

export async function register(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  await connectDB();

  const name = (formData.get("name") as string).trim().toLowerCase();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = (formData.get("password") as string).trim();

  // Validate input
  if (!name || !email || !password) {
    return {
      error: "All fields are required.",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters.",
    };
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      error: "Email is already registered.",
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Redirect after successful registration
  redirect("/login");
}