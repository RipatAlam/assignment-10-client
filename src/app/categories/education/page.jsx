"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";

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

export default function EducationStory() {
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
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-600 px-4 py-2 rounded-full mb-5">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium">Education & Learning</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Every Lesson Learned
            <span className="text-blue-600"> Opens New Opportunities</span>
          </h2>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-lg leading-8">
            Education is more than earning degrees—it's about gaining knowledge,
            building skills, and discovering the confidence to overcome life's
            challenges.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-violet-50 via-white to-blue-50 rounded-3xl p-8 md:p-14 shadow-lg border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="text-violet-600 w-8 h-8 flex-shrink-0" />

            <h3 className="text-3xl font-bold text-slate-900">
              Digital Life Lessons
            </h3>
          </div>

          <p className="text-slate-700 text-lg leading-9">
            At <strong>Digital Life Lessons</strong>, we believe that every
            learning journey has the power to inspire others. Whether it's
            mastering a new skill, overcoming academic challenges, earning a
            degree, or embracing lifelong learning, every educational experience
            carries valuable lessons worth sharing.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Our platform brings together stories from students, teachers,
            professionals, and lifelong learners who have discovered that
            education extends far beyond the classroom. Through perseverance,
            curiosity, and continuous growth, these experiences encourage others
            to pursue knowledge with confidence and purpose.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Every book read, every challenge overcome, and every lesson shared
            becomes a stepping stone toward a brighter future. Together, we
            create a community where knowledge empowers individuals and shared
            experiences inspire lifelong learning.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
