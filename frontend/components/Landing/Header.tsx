"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export function Header() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    
    {
      name: "FAQs",
      link: "#faqs",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // keep the overall background consistent with your app
    <div className="relative w-full bg-[#112121] h-10">
      <Navbar className="">
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center gap-4">
            <NavbarLogo />
          </div>

          {/* center nav items */}
          <NavItems items={navItems} />

          {/* right side actions */}
          <div className="flex items-center gap-4">
            {/* Example secondary action - optional */}
            {/* <NavbarButton variant="secondary">Log in</NavbarButton> */}

            <NavbarButton className="min-w-[120px]">
              Get Started
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-3">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full rounded-md px-4 py-3 text-neutral-900"
                >
                  <span className="block text-base font-medium">
                    {item.name}
                  </span>
                </a>
              ))}

              <div className="pt-2">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  Get Started
                </NavbarButton>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
