"use client";

import { motion } from "framer-motion";
import { Wallet, Sparkles } from "lucide-react";

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

export default function FinanceStory() {
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
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full mb-5">
            <Wallet className="w-5 h-5" />
            <span className="font-medium">Finance & Money</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Smart Financial Decisions
            <span className="text-blue-600"> Build a Secure Future</span>
          </h2>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-lg leading-8">
            Every financial decision, whether big or small, shapes your future.
            Learning from real experiences helps us spend wisely, save
            confidently, and prepare for life's opportunities and challenges.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-3xl p-8 md:p-14 shadow-lg border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="text-emerald-600 w-8 h-8 flex-shrink-0" />

            <h3 className="text-3xl font-bold text-slate-900">
              Digital Life Lessons
            </h3>
          </div>

          <p className="text-slate-700 text-lg leading-9">
            At <strong>Digital Life Lessons</strong>, we believe that financial
            wisdom grows through real-life experiences. Whether it's creating a
            budget, paying off debt, building savings, investing for the future,
            or recovering from financial setbacks, every journey offers lessons
            that can inspire and guide others.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Our community shares authentic stories about managing money,
            developing healthy financial habits, making informed decisions, and
            achieving long-term financial goals. These experiences remind us
            that financial success is built through consistency, discipline, and
            continuous learning rather than quick results.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Every smart financial choice creates new opportunities, every
            challenge teaches valuable lessons, and every shared story can help
            someone else build a more confident, secure, and financially
            independent future.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
