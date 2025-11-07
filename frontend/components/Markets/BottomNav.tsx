"use client";

import Link from "next/link";
import { LayoutGrid, Trophy, User } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { href: "/markets", label: "Markets", Icon: LayoutGrid },
  { href: "/leaderboard", label: "Leaderboard", Icon: Trophy },
  { href: "/profile", label: "Profile", Icon: User },
];

const BottomNav: React.FC = () => {
  const pathname = usePathname() || "/";

  return (
    // Container uses a centered max-width and sits above the bottom edge slightly.
    <div
      aria-hidden={false}
      className="fixed inset-x-0 bottom-4 z-50 pointer-events-auto"
    >
      <div className="max-w-3xl mx-auto px-4">
        {/* Glassmorphism bar */}
        <nav
          aria-label="Primary"
          className="w-full bg-white/6 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg py-2 px-3 flex justify-around items-center"
        >
          {navItems.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex flex-col items-center justify-center gap-1 px-3 py-1 transition-transform`}
              >
                <span
                  className={`flex items-center justify-center rounded-md transition-all transform ${
                    active ? "scale-105" : "scale-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all ${
                      active ? "text-white" : "text-white/70"
                    }`}
                    aria-hidden="true"
                  />
                </span>

                <span
                  className={`text-xs transition-colors ${
                    active ? "text-white font-medium" : "text-white/70"
                  }`}
                >
                  {label}
                </span>

                {/* Glow + ring for active state (A1) */}
                <span
                  className={`absolute pointer-events-none -z-10 rounded-full ${
                    active
                      ? "w-24 h-10 opacity-80 blur-2xl bg-[rgba(0,245,255,0.09)] animate-fadeIn"
                      : "opacity-0"
                  }`}
                />
                {/* We use an extra element with absolute positioned glow if necessary;
                    the Tailwind class above is a quick visual glow. */}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;
