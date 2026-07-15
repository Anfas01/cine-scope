"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-3xl border border-green-500/30 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.15)]">

        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="CineScope"
            width={90}
            height={90}
            priority
          />

          <h1 className="mt-5 text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to continue exploring movies.
          </p>
        </div>

        <form className="mt-8 space-y-5">

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl bg-black border border-zinc-700 py-3 pl-12 pr-4 text-white outline-none transition focus:border-green-500"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-xl bg-black border border-zinc-700 py-3 pl-12 pr-12 text-white outline-none transition focus:border-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-green-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            className="w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400"
          >
            Sign In
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-500 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </main>
  );
}