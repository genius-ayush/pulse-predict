"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // adjust path if different
import {
  IconBolt,
  IconRobot,
  IconUserPlus,
  IconStar,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";

// Accent color
const ACCENT = "#00E5FF";

// Feature list
const features = [
  {
    id: "gasless",
    title: "Gasless Predicting",
    desc: "Place bets with zero gas fees — instant, frictionless trades using meta-transactions and relayers.",
    icon: IconBolt,
  },
  {
    id: "ai-resolve",
    title: "AI-Verified Resolution",
    desc: "Fast, evidence-driven market resolution using our AI oracle that ingests verified sources.",
    icon: IconRobot,
  },
  {
    id: "onboarding",
    title: "Web2 Easy Onboarding",
    desc: "Phone / Google login + meta-transaction flow — no crypto knowledge required to start betting.",
    icon: IconUserPlus,
  },
  {
    id: "rewards",
    title: "Earn Rewards & Badges",
    desc: "Gain reputation, badges and NFT rewards for accurate predictions — follow top predictors and copy bets.",
    icon: IconStar,
  },
  {
    id: "integrity",
    title: "Secure Market Integrity",
    desc: "Dispute staking, simple bot detection and transparent dispute flow protect market fairness.",
    icon: IconShieldCheck,
  },
  {
    id: "social-copy",
    title: "Social Copy-Predict",
    desc: "Follow top predictors, copy their bets, and climb leaderboards — the social way to win together.",
    icon: IconUsers,
  },
];

export default function FeatureSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative bg-[#112121] px-6 py-20"
    >
      <div className="mx-auto max-w-7xl text-center">
        {/* Section Heading */}
        <h2
          id="features-heading"
          className="text-3xl sm:text-4xl font-semibold text-white"
        >
          Why PulsePredict
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-white/70 text-base">
          A next-gen, gasless and AI-powered social prediction experience.
        </p>

        {/* Feature grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <motion.article
              key={f.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.06, duration: 0.45 }}
              whileHover={{ scale: 1.02 }}
              className="relative mx-auto w-full max-w-[420px]"
            >
              {/* Soft Neomorphic Card */}
              <div
                className="group relative overflow-hidden rounded-2xl border border-white/6 px-6 py-6"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  backdropFilter: "blur(8px) saturate(1.05)",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/6"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    }}
                  >
                    <f.icon
                      size={20}
                      strokeWidth={1.8}
                      className="text-white"
                      style={{
                        filter: `drop-shadow(0 4px 8px ${hexAlpha(ACCENT, 0.12)})`,
                        transition: "filter 0.2s ease",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-white/70">{f.desc}</p>

                {/* Soft hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `0 4px 20px ${hexAlpha(ACCENT, 0.06)}`,
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper: hex to rgba with alpha
function hexAlpha(hex: string, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
