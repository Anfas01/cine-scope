import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface TokenPayload {
  userId: string;
  email: string;
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    return decoded;
  } catch {
    return null;
  }
}