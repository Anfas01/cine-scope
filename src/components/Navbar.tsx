"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  CircleUser,
  House,
  Bookmark,
  X,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/", icon: House },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
    { name: "Account", href: "/account", icon: CircleUser },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  const showClearButton =
    currentQuery !== "" &&
    searchQuery.trim() === currentQuery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (e.target.value === "") {
      router.push("/");
    }
  };

  const handleSearch = () => {
    const query = searchQuery.trim();

    if (!query) {
      router.push("/");
      return;
    }

    router.push(`/?query=${encodeURIComponent(query)}`);
  };

  const handleClear = () => {
    setSearchQuery("");
    router.push("/");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const placeholder =
    pathname === "/favorites"
      ? "Search favorites..."
      : pathname === "/watchlist"
      ? "Search watchlist..."
      : "Search movies...";

  return (
    <header className="sticky top-0 z-50 border-b border-green-900/40 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-3 sm:h-18 sm:px-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="CineScope Logo"
            width={40}
            height={40}
            priority
            className="h-8 w-8 sm:h-10 sm:w-10"
          />

          <h1 className="hidden text-xl font-semibold sm:block lg:text-2xl">
            <span className="text-white">Cine</span>
            <span className="text-green-500">Scope</span>
          </h1>
        </Link>

        {/* Search */}
        <div className="flex flex-1 justify-center px-2">
          <div className="flex w-full max-w-[180px] items-center rounded-full border border-green-900 bg-neutral-900 px-3 py-2 transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-xl">
            <input
              value={searchQuery}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder={pathname === "/" ? "Search movies..." : placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />

            <button
              onClick={showClearButton ? handleClear : handleSearch}
              className="ml-2 shrink-0 text-gray-400 transition hover:text-green-500"
            >
              {showClearButton ? (
                <X size={18} />
              ) : (
                <Search size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="shrink-0">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map(({ name, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-300 sm:px-3 ${
                    pathname === href
                      ? "bg-green-500/15 text-green-500 shadow-[0_0_12px_rgba(34,197,94,0.25)]"
                      : "text-gray-300 hover:bg-white/5 hover:text-green-500"
                  }`}
                >
                  <Icon size={18} />

                  <span className="hidden xl:block">
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;