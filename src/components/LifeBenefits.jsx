"use client";

import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  Lightbulb,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "Preserve Wisdom",
    description:
      "Capture real-life experiences so future generations can learn from your journey and avoid common mistakes.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: BookOpen,
    title: "Faster Growth",
    description:
      "Learn faster by studying real human experiences instead of repeating the same life mistakes.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Lightbulb,
    title: "Real Insights",
    description:
      "Life gives lessons that books cannot teach — real decisions, real consequences, and real wisdom.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: HeartHandshake,
    title: "Inspire Others",
    description:
      "Your personal story can inspire thousands of people around the world and create meaningful impact.",
    color: "from-pink-500 to-rose-600",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function LifeMattersSection() {
  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
  <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="uppercase tracking-[4px] text-[#C9794D] font-semibold text-sm">
            WHY LIFE LESSONS MATTER
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#231815] leading-tight">
            Why Learning From Life Matters
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            Real experiences shape real wisdom. Capture, learn, and grow from
            life lessons that truly matter.
          </p>

          <p className="mt-3 text-[#C9794D] font-medium">
            Hover over each card to reveal its meaning.
          </p>
        </motion.div>

        {/* Cards */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="group relative h-[360px] rounded-3xl overflow-hidden bg-white shadow-lg cursor-pointer"
              >
                {/* Front */}

                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 group-hover:-translate-y-full">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-[#231815]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-gray-500 text-center px-6">
                    Hover to reveal insights
                  </p>
                </div>

                {/* Back */}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color}
                  text-white p-8 flex flex-col justify-between
                  translate-y-full group-hover:translate-y-0
                  transition-all duration-500`}
                >
                  <div>
                    <Icon className="w-12 h-12 mb-6" />

                    <h3 className="text-2xl font-bold">{card.title}</h3>

                    <p className="mt-5 leading-8">
                      {card.description}
                    </p>
                  </div>

                  <button className="flex items-center gap-2 font-semibold">
                    Explore
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}