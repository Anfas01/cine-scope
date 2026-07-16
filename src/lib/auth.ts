import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "./mongodb";
import User from "@/models/userModel";

interface TokenPayload {
  userId: string;
  email: string;
}

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    await connectDB();

    const user = await User.findById(decoded.userId)
      .select("-password");

    return user;
  } catch {
    return null;
  }
}