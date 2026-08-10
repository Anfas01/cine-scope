import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineScope",
  description:
    "Discover trending movies and manage your personal watchlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#0a0a0a] antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0a]">
        {children}

        <Toaster
          position="top-right"
          offset={80}
          richColors
          closeButton={false}
        />
      </body>
    </html>
  );
}