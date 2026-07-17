"use client";

import { BookOpen, Users, Eye, Award } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: BookOpen,
    value: "12K+",
    label: "Lessons Shared",
  },
  {
    icon: Users,
    value: "25K+",
    label: "Community Members",
  },
  {
    icon: Eye,
    value: "500K+",
    label: "Lessons Read",
  },
  {
    icon: Award,
    value: "150+",
    label: "Topics Covered",
  },
];

export default function PercentagePage() {
  return (
    //<section className="bg-[#F8F4EE] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
    <section className="max-w-7xl mx-auto w-full px-1 overflow-hidden">
      <div className="bg-[#F8F4EE] p-25 rounded-t-3xl shadow-md">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[4px] text-[#C9794D] font-semibold text-sm">
            COMMUNITY IMPACT
          </p>

          <h2 className="mt-4 text-5xl font-serif font-bold text-[#231815] leading-tight">
            Growing Through
            <span className="text-[#C9794D]"> Shared Experiences</span>
          </h2>

          <p className="mt-5 text-gray-600 font-serif max-w-2xl mx-auto">
            Thousands of people share their real-life experiences every day.
            Learn from others, inspire the community, and become part of a
            growing knowledge platform.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                    },
                  },
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  rotate: 1,
                }}
                className="bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    rotate: 15,
                    scale: 1.15,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center mb-5"
                >
                  <Icon className="w-8 h-8 text-blue-500" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-bold text-[#231815]"
                >
                  {item.value}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600"
                >
                  {item.label}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
