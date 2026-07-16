import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import User from "@/models/userModel";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const decoded = await getCurrentUser();

  if (!decoded) {
    redirect("/login");
  }

  const userDoc = await User.findById(decoded.userId)
    .select("name email")
    .lean();

  if (!userDoc) {
    redirect("/login");
  }

  const user = {
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
  };

  return (
    <>
      <Suspense>
        <Navbar user={user} />
      </Suspense>
      {children}
    </>
  );
}