"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  House,
  Bookmark,
  X,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  useState,
  useEffect,
  useRef,
} from "react";
import { logout } from "@/actions/logout";

interface NavbarProps {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const navItems = [
    { name: "Home", href: "/", icon: House },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
  ];

  const currentQuery = searchParams.get("query") ?? "";

  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const showClearButton =
    currentQuery !== "" &&
    searchQuery.trim() === currentQuery;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleLogout = async () => {
    await logout();
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
              placeholder={
                pathname === "/"
                  ? "Search movies..."
                  : placeholder
              }
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />

            <button
              onClick={
                showClearButton
                  ? handleClear
                  : handleSearch
              }
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
            {navItems.map(
              ({ name, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-300 sm:px-3 ${pathname === href
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
              )
            )}

            {/* Account */}
            <li
              className="relative"
              ref={accountRef}
            >
              <button
                onClick={() =>
                  setAccountOpen(!accountOpen)
                }
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-300 transition-all duration-300 hover:bg-white/5 hover:text-green-500 sm:px-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-black">
                  {user?.name[0].toUpperCase()}
                </div>

                <span className="hidden xl:block">
                  Account
                </span>

                <ChevronDown
                  size={16}
                  className={`hidden transition duration-300 xl:block ${accountOpen
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-green-900/40 bg-neutral-950 shadow-2xl shadow-green-900/20">
                  {/* User */}
                  <div className="border-b border-white/10 p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-black">
                        {user?.name[0].toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {user && (
                            user.name.charAt(0).toUpperCase() +
                            user.name.slice(1).toLowerCase()
                          )}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="p-2">
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-gray-300 transition hover:bg-white/5 hover:text-green-500">
                      <Settings size={18} />
                      Settings
                    </button>

                    <button onClick={handleLogout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-400 transition hover:bg-red-500/10 hover:text-red-300">
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;