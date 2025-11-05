"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // adjust path if different

export default function CTASection() {
  return (
    <section className="bg-[#112121] py-20 px-6">
      <div className="mx-auto max-w-3xl text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          Start Predicting Today
        </h2>

        {/* Subheading */}
        <p className="mt-4 text-white/70 text-lg">
          Join PulsePredict and bet on real-world events with zero gas fees, AI verification, and social rewards.
        </p>

        {/* CTA Button */}
        <motion.div
          className="mt-8 inline-block"
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            className="bg-[#ffffff] text-black px-8 py-4 rounded-xl hover:bg-white"
          >
            <a href="#get-started">
              Get Started
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
