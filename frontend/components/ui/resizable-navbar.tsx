"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Activity } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  compact?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
  visible?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // `scrolled` becomes true once user scrolls down > 40px — controls shrink + blur
  const [scrolled, setScrolled] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 40 && !scrolled) {
      setScrolled(true);
    } else if (latest <= 40 && scrolled) {
      setScrolled(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // it's fixed and sits on top; keep some top spacing so it doesn't hug the viewport edge
      className={cn(
        "fixed inset-x-0 top-4 z-40 w-full flex items-center justify-center",
        className
      )}
      // animate small layout shift for the container (helps parent spacing)
      animate={{
        y: scrolled ? -2 : 0,
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible: scrolled }
            )
          : child
      )}
    </motion.div>
  );
};

/**
 * NavBody - desktop navbar container
 *
 * Tall by default (1C: cinematic) => ~88px height
 * When `visible` is true (scrolled), it will shrink to ~64px and increase blur + glass
 */
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const tallHeight = 88;
  const compactHeight = 64;

  return (
    <motion.div
      animate={{
        height: visible ? compactHeight : tallHeight,
        backdropFilter: visible ? "blur(12px) saturate(1.05)" : "blur(6px)",
        boxShadow: visible
          ? "0 8px 30px rgba(2,6,23,0.45)"
          : "0 6px 20px rgba(2,6,23,0.25)",
        y: visible ? -4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 24,
      }}
      style={{
        minWidth: 320,
      }}
      className={cn(
        // center container with glass-like rounded card
        "relative mx-auto hidden w-full max-w-7xl items-center justify-between rounded-2xl px-6 py-3 lg:flex",
        // backdrop + subtle border
        "bg-white/6 border border-white/6",
        className
      )}
    >
      <div
        // vertical center alignment inside the animated container
        className="flex w-full items-center justify-between"
        style={{ gap: 20 }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
  visible,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden lg:flex flex-1 items-center justify-center gap-6 text-lg font-medium",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          key={`link-${idx}`}
          href={item.link}
          className={cn(
            "relative px-4 py-2 rounded-full transition-all duration-200",
            // text styling - slightly translucent white for the glass look
            "text-white/90"
          )}
          aria-label={item.name}
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hover"
              initial={false}
              animate={{ opacity: 1 }}
              className="absolute inset-0 h-full w-full rounded-full bg-white/8 backdrop-blur-sm"
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(6px)",
        boxShadow: visible
          ? "0 8px 30px rgba(2,6,23,0.45)"
          : "0 6px 20px rgba(2,6,23,0.25)",
        y: visible ? -4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 24,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-2 lg:hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className={cn(
            "absolute inset-x-4 top-[calc(100%+8px)] z-50 flex w-[calc(100%-32px)] flex-col items-start justify-start gap-4 rounded-xl bg-white/95 px-4 py-6 shadow-lg dark:bg-neutral-950",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white w-6 h-6" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white w-6 h-6" onClick={onClick} />
  );
};

/**
 * NavbarLogo - Apple-style larger typography (A3)
 * Uses system-font stack so Apple devices get SF Pro automatically (F1)
 */
export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-6 flex items-center space-x-3 rounded px-2 py-1 text-sm font-normal"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      {/* subtle filled icon */}
      <Activity className="w-7 h-7 text-white/95" />
      <span
        className="font-semibold text-2xl leading-none text-white/95"
        style={{ letterSpacing: 0.2 }}
      >
        PulsePredict
      </span>
    </a>
  );
};

/**
 * NavbarButton - primary button is a white pill (3B)
 */
export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap select-none rounded-full px-5 py-2.5 text-sm font-semibold transition transform will-change-transform";

  const variantStyles: Record<string, string> = {
    primary:
      // white pill with subtle shadow and slight inner sheen for the "Apple" feel
      "bg-white text-black shadow-[0_6px_18px_rgba(2,6,23,0.18)]",
    secondary:
      // transparent glassy button for secondary actions
      "bg-white/6 text-white/90 border border-white/8",
    dark:
      "bg-black/70 text-white",
    gradient:
      "bg-gradient-to-r from-sky-500 to-cyan-500 text-white",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      {children}
    </Tag>
  );
};
