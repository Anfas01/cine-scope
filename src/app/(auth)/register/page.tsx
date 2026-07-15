"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-green-500/20 bg-zinc-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_35px_rgba(34,197,94,0.15)]">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="CineScope"
            width={80}
            height={80}
            priority
            className="sm:w-24 sm:h-24"
          />

          <h1 className="mt-5 text-center font-bold leading-tight text-white text-3xl sm:text-4xl">
            Create{" "}
            <span className="text-green-500">
              Account
            </span>
          </h1>

          <p className="mt-3 text-center text-sm text-zinc-400">
            Join CineScope and start your movie journey.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500"
            />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border border-zinc-700 bg-black py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-green-500"
            />
          </div>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-zinc-700 bg-black py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-green-500"
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
              className="w-full rounded-xl border border-zinc-700 bg-black py-3.5 pl-12 pr-12 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-green-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-green-500 py-3.5 font-semibold text-black transition-all duration-200 hover:bg-green-400 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-500 transition hover:text-green-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}