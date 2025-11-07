"use client";
import Link from "next/link";
import { NavbarLogo, NavbarButton } from "../ui/resizable-navbar";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#112121] border-b border-[#01333f] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="min-w-10 min-h-10 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-primary flex items-center justify-center overflow-hidden"> */}
              
              {/* <div className="w-5 h-5 sm:w-6 sm:h-6"> */}
              <NavbarLogo  />
              {/* </div> */}
            {/* </div> */}
          </Link>

          {/* Right: Get Started Button */}
          <div className="flex items-center">
            <NavbarButton className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap">
              Get Started
            </NavbarButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
