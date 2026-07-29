"use client";

import { motion } from "framer-motion";
import { HeartPulse, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function HealthStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-5">
            <HeartPulse className="w-5 h-5" />
            <span className="font-medium">Health & Wellness</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Every Healthy Choice
            <span className="text-blue-600"> Creates a Better Tomorrow</span>
          </h2>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-lg leading-8">
            Good health is built through daily habits, informed decisions, and
            the lessons we learn from life's experiences. Every journey toward
            wellness has the power to inspire someone else.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-50 via-white to-blue-50 rounded-3xl p-8 md:p-14 shadow-lg border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="text-red-600 w-8 h-8 flex-shrink-0" />

            <h3 className="text-3xl font-bold text-slate-900">
              Digital Life Lessons
            </h3>
          </div>

          <p className="text-slate-700 text-lg leading-9">
            At <strong>Digital Life Lessons</strong>, we believe that every
            health journey tells a meaningful story. Whether it's overcoming an
            illness, building healthier habits, improving mental well-being, or
            finding the motivation to live a balanced life, each experience
            carries valuable lessons that can inspire others.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Our community shares authentic stories about fitness, nutrition,
            mental health, recovery, self-care, and personal growth. These
            experiences remind us that good health is not about perfection—it's
            about making consistent choices that improve our quality of life,
            one step at a time.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Every healthy habit starts with a single decision, and every shared
            lesson has the power to encourage someone else to begin their own
            journey toward a stronger, happier, and healthier life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
