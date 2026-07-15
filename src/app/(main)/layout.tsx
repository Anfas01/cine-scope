import Nav from "@/components/Nav";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      {children}
    </>
  );
}