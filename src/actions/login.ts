"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";

type LoginState = {
  error: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  await connectDB();

  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = (formData.get("password") as string).trim();

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const user = await User.findOne({ email });

  if (!user) {
    return {
      error: "Invalid email or password.",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      error: "Invalid email or password.",
    };
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/");
}