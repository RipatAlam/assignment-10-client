"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Sparkles } from "lucide-react";

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

export default function CareerStory() {
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
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-5">
            <BriefcaseBusiness className="w-5 h-5" />
            <span className="font-medium">Career & Success</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Every Career Journey
            <span className="text-blue-600"> Begins with One Step</span>
          </h2>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-lg leading-8">
            Success isn't built overnight. Every challenge, opportunity, and
            lesson along the way helps shape a meaningful and fulfilling career.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-3xl p-8 md:p-14 shadow-lg border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="text-blue-600 w-8 h-8 flex-shrink-0" />

            <h3 className="text-3xl font-bold text-slate-900">
              Digital Life Lessons
            </h3>
          </div>

          <p className="text-slate-700 text-lg leading-9">
            At <strong>Digital Life Lessons</strong>, we believe that every
            career journey has a story worth sharing. Whether it's landing your
            first job, changing careers, starting a business, overcoming
            workplace challenges, or achieving a lifelong dream, every
            experience offers valuable lessons that can inspire others.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Our platform brings together real stories from professionals,
            entrepreneurs, students, and lifelong learners who have faced
            setbacks, embraced opportunities, and continued to grow. These
            experiences provide practical insights into leadership, teamwork,
            resilience, and personal development.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Every achievement starts with courage, every setback brings a new
            lesson, and every shared experience can motivate someone else to
            pursue their goals with confidence. Together, we learn, grow, and
            build careers that create lasting impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
