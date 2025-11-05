"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"; // shadcn button (adjust path if different)

/**
 * Hero.tsx
 * Centered, premium dark glass hero with gold "pulse wave" visualizer.
 * - Background: bg-[#112121]
 * - Accent: Gold (#D4AF37) (uses inline gradients so no Tailwind config changes)
 * - Uses framer-motion for parallax + pulse animation
 * - Built with Tailwind + shadcn/button (TW1 + UI1 as requested)
 */

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // pointer-based parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useTransform(mx, [-200, 200], [12, -12]);
  const rotateX = useTransform(my, [-200, 200], [-8, 8]);
  const translateX = useTransform(mx, [-200, 200], [-10, 10]);
  const translateY = useTransform(my, [-200, 200], [-6, 6]);

  function handlePointerMove(e: React.PointerEvent) {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    mx.set(x);
    my.set(y);
  }
  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
  }

  // small floating animation for CTA/card
  const floatY = { y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const } };

  return (
    <header
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate overflow-hidden bg-[#112121] px-6 py-20 sm:py-28"
      aria-label="PulsePredict — Hero"
    >
      {/* vignette + subtle radial glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#112121] via-transparent to-[#071010] opacity-60" />
        <div
          className="absolute -left-20 -top-24 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle,#3a2b12 0%, transparent 45%)" }}
        />
        <div
          className="absolute -right-8 bottom-6 h-56 w-56 rounded-full blur-2xl opacity-20"
          style={{ background: "radial-gradient(circle,#6b4b08 0%, transparent 45%)" }}
        />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        {/* Top micro label */}
        <div className="inline-block rounded-full px-3 py-1 text-sm font-medium mb-6"
             style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.85)" }}>
          Live on BNB Testnet · Gasless · AI-verified
        </div>

        {/* Headline */}
        <h1
          className="mx-auto max-w-3xl text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          style={{ color: "white", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
        >
          Predict the Future. <span style={{ color: "rgba(212,175,55,1)" }}>Win Together.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-white/85">
          Bet on real-world events — sports, elections, and breaking news — with zero gas fees and AI-verified results.
          Join a social prediction market where accuracy earns rewards, reputation, and influence.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/app" passHref>
            <motion.a
              whileHover={{ translateY: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #F3F3F3 100%)",
                color: "#0b0b0b",
                minWidth: 160,
                textAlign: "center",
              }}
              aria-label="Start Predicting"
            >
              Start Predicting
            </motion.a>
          </Link>

          <Link href="/markets" passHref>
            <motion.a
              whileHover={{ translateY: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.92)",
                minWidth: 140,
                textAlign: "center",
              }}
              aria-label="View Markets"
            >
              View Markets
            </motion.a>
          </Link>
        </div>

        {/* supportive microcopy */}
        <div className="mt-6 text-sm text-white/70">Gasless Bets · Fast AI Oracle · Social Leaderboards</div>

        {/* Visual: Gold pulse wave visualizer centered below text */}
        <div className="mt-12 flex items-center justify-center">
          <motion.div
            style={{
              rotateY,
              rotateX,
              translateX,
              translateY,
            } as any}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
            className="relative w-full max-w-3xl"
          >
            {/* glass container for the visual */}
            <motion.div
              animate={floatY}
              className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/3/ bg-opacity-2"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                padding: "26px",
                backdropFilter: "blur(8px) saturate(1.05)",
              }}
            >
              {/* inner content: subtle mock of market + pulse waves */}
              
              <div className="flex flex-col items-center gap-6">
                {/* small top row: market badges */}
                <div className="flex gap-3">
                  <div className="rounded-md px-3 py-1 text-xs font-semibold" style={{ background: "rgba(212,175,55,0.07)", color: "#D4AF37" }}>
                    LIVE
                  </div>
                  <div className="rounded-md px-3 py-1 text-xs text-white/80" style={{ background: "rgba(255,255,255,0.02)" }}>
                    Gasless · Fast Oracle
                  </div>
                </div>

                {/* center area: pulse wave + small chart mock */}
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  {/* chart mock area (dark card) */}
                  <div className="w-full max-w-2xl rounded-xl px-4 py-4" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.15))", border: "1px solid rgba(255,255,255,0.03)" }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-white/90">Live Market • World Cup</div>
                        <div className="mt-1 text-xs text-white/70">Pool: BNB 1.2k — Odds: Team A 1.8</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold" style={{ color: "#D4AF37" }}>+124% ROI</div>
                        <div className="text-xs text-white/70">Top Predictor</div>
                      </div>
                    </div>

                    {/* pulse wave canvas (SVG) */}
                    <div className="mt-4 h-28 w-full overflow-hidden">
                      <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="w-full h-full">
                        <defs>
                          <linearGradient id="goldGrad" x1="0" x2="1">
                            <stop offset="0%" stopColor="#efe6c8" stopOpacity="1" />
                            <stop offset="45%" stopColor="#D4AF37" stopOpacity="1" />
                            <stop offset="100%" stopColor="#a27b20" stopOpacity="1" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* faint baseline */}
                        <motion.path
                          d="M0 70 L100 70 L200 70 L300 70 L400 70 L500 70 L600 70 L700 70 L800 70"
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="1"
                          fill="none"
                        />

                        {/* animated pulse waves (three layers for depth) */}
                        <motion.path
                          d="M0 72 C60 72 100 40 160 48 C220 56 260 90 320 60 C380 30 420 78 480 66 C540 54 580 38 640 56 C700 74 760 56 800 60"
                          stroke="url(#goldGrad)"
                          strokeWidth="3.2"
                          fill="none"
                          strokeLinecap="round"
                          filter="url(#glow)"
                          style={{ strokeLinejoin: "round" }}
                          animate={{ strokeDashoffset: [0, -400] }}
                          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
                        />

                        <motion.path
                          d="M0 78 C80 78 140 58 200 68 C260 78 320 100 380 78 C440 56 500 88 560 72 C620 56 680 78 740 64 C800 50 860 78 920 70"
                          stroke="rgba(212,175,55,0.28)"
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          animate={{ opacity: [0.6, 0.18, 0.6] }}
                          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        />

                        <motion.path
                          d="M0 66 C90 66 150 44 210 54 C270 64 330 86 390 64 C450 42 510 82 570 68 C630 54 690 48 750 58 C800 66"
                          stroke="rgba(212,175,55,0.12)"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          animate={{ transform: ["translateX(0px)", "translateX(-30px)", "translateX(0px)"] }}
                          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* small action / info row */}
                  <div className="mt-3 flex items-center gap-4 text-sm text-white/75">
                    <div className="rounded-full px-3 py-1 text-xs" style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37" }}>
                      Gasless
                    </div>
                    <div>AI-verified</div>
                    <div>Social Leaderboards</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
