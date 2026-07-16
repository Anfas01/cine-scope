import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Suspense>
        <Navbar
          user={{
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }}
        />
      </Suspense>

      {children}
    </>
  );
}