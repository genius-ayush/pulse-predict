"use client";

import Link from "next/link";
import { Trophy, User, LayoutGrid, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const BottomTab = ({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className={clsx(
        "flex flex-col items-center justify-center text-xs gap-0.5 py-2 px-3",
        active ? "text-white" : "text-muted-foreground/80"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNav = () => {
  const pathname = usePathname() ?? "/";

  return (
    <div className="md:hidden">
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg bg-[#0f2a2a]/80 border border-[#01333f] backdrop-blur rounded-2xl px-3 py-2 flex items-center justify-between shadow-lg">
        <BottomTab href="/markets" active={pathname.startsWith("/markets")}>
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[11px]">Markets</span>
        </BottomTab>

        <BottomTab href="/leaderboard" active={pathname.startsWith("/leaderboard")}>
          <Trophy className="w-5 h-5" />
          <span className="text-[11px]">Leaderboard</span>
        </BottomTab>

        <BottomTab href="/create" active={pathname.startsWith("/create")}>
          <PlusCircle className="w-6 h-6" />
          <span className="text-[11px]">Create</span>
        </BottomTab>

        <BottomTab href="/profile" active={pathname.startsWith("/profile")}>
          <User className="w-5 h-5" />
          <span className="text-[11px]">Profile</span>
        </BottomTab>
      </div>
    </div>
  );
};

export default MobileNav;