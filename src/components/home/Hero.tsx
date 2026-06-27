"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getStats } from "@/lib/mock-data";
import { MapPin, Star, Users, Zap } from "lucide-react";

const stats = getStats();

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent"
          >
            <MapPin className="h-3 w-3" />
            New York City Nightlife
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Rate the night.{" "}
            <span className="gradient-text">Share the vibe.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted leading-relaxed max-w-xl"
          >
            Rave Reviews is your community guide to NYC clubs, parties, and
            artists. Read real experiences from the dance floor before you buy
            that ticket.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button size="lg" href="/events">
              <Zap className="h-4 w-4" />
              Browse Events
            </Button>
            <Button variant="secondary" size="lg" href="/write-review">
              Write a Review
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-4 text-xs text-muted"
          >
            A project by{" "}
            <span className="text-foreground font-medium">Overcast Productions</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: "Reviews", value: `${stats.totalReviews}+`, icon: Star },
            { label: "Venues", value: stats.totalVenues, icon: MapPin },
            { label: "Events", value: stats.totalEvents, icon: Zap },
            { label: "Avg Rating", value: stats.avgRating, icon: Users },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-elevated rounded-2xl p-4 text-center glow-accent"
            >
              <stat.icon className="mx-auto h-4 w-4 text-accent mb-2" />
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
