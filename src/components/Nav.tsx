'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Heart, Bookmark } from "lucide-react";

const Nav = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: House,
      label: "Home",
    },
    {
      href: "/favorites",
      icon: Heart,
      label: "Favorites",
    },
    {
      href: "/watchlist",
      icon: Bookmark,
      label: "Watchlist",
    },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2 rounded-2xl border border-green-900/50 bg-neutral-950/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:hidden">
      <ul className="flex items-center justify-between">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all duration-300 ${
                  active
                    ? "bg-green-500/15 text-green-500"
                    : "text-gray-400 hover:bg-neutral-900 hover:text-green-400"
                }`}
              >
                <Icon
                  size={22}
                  className={active ? "fill-green-500/10" : ""}
                />

                <span className="text-[11px] font-medium">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;