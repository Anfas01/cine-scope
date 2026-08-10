import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
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
      <Navbar
        user={{
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }}
      />

      <main>
        {children}
      </main>
    </>
  );
}