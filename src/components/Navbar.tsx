"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, CircleUser, House, Heart, Bookmark, X, } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/", icon: House },
    { name: "Favorites", href: "/favorites", icon: Heart },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
    { name: "Profile", href: "/profile", icon: CircleUser },
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="CineScope Logo"
            width={40}
            height={40}
            priority
            className="h-8 w-8 sm:h-10 sm:w-10"
          />

          <h1 className="hidden text-2xl font-semibold tracking-wide sm:block">
            <span className="text-white">Cine</span>
            <span className="text-green-500">Scope</span>
          </h1>
        </Link>

        {/* Search */}
        <div className="flex justify-center">
          {/* Mobile */}
          <div className="mx-auto flex w-full max-w-[220px] items-center rounded-full border border-green-900 bg-neutral-900 px-3 py-2 transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 sm:hidden">
            <input
              value={searchQuery}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              type="text"
              placeholder="Search..."
              className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />

            <button
              onClick={showClearButton ? handleClear : handleSearch}
              type="button"
              className="ml-2 text-gray-400 transition hover:text-green-500"
            >
              {showClearButton ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>

          {/* Desktop */}
          <div className="hidden w-full max-w-xs items-center rounded-full border border-green-900 bg-neutral-900 px-4 py-2 transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 sm:flex md:max-w-sm lg:max-w-md xl:max-w-xl">
            <input
              value={searchQuery}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              type="text"
              placeholder={placeholder}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />

            <button
              onClick={showClearButton ? handleClear : handleSearch}
              type="button"
              className="ml-2 text-gray-400 transition hover:text-green-500"
            >
              {showClearButton ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-2">
            {navItems.map(({ name, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all duration-300 ${pathname === href
                    ? "bg-green-500/15 text-green-500 shadow-[0_0_12px_rgba(34,197,94,0.25)]"
                    : "text-gray-300 hover:bg-white/5 hover:text-green-500"
                    }`}
                >
                  <Icon size={18} />
                  <span className="hidden xl:block">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Profile */}
        <Link
          href="/profile"
          className="rounded-full p-1 text-gray-300 transition hover:bg-neutral-900 hover:text-green-500 sm:hidden"
        >
          <CircleUser
            size={34}
            className="stroke-green-500 transition hover:stroke-green-400"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
