"use client";

import { motion } from "framer-motion";

// Animation Variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
// Animation Variants
const card = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Features Data
const lessons = [
  {
    id: "01",
    title: "Share Your Story",
    description:
      "Write about meaningful moments from your life and share the valuable lessons you learned to inspire others.",
  },
  {
    id: "02",
    title: "Explore Public Lessons",
    description:
      "Read inspiring life lessons shared by people around the world and discover practical wisdom for everyday life.",
  },
  {
    id: "03",
    title: "Manage Your Lessons",
    description:
      "Keep all your published lessons organized in one place. Edit, update, or delete them whenever you want.",
  },
  {
    id: "04",
    title: "Browse by Categories",
    description:
      "Find lessons related to Career, Health, Finance, Relationships, Education, Business, and more.",
  },
  {
    id: "05",
    title: "Inspire Others",
    description:
      "Your experiences can help someone avoid mistakes, make better decisions, and stay motivated during difficult times.",
  },
  {
    id: "06",
    title: "Learn Every Day",
    description:
      "Discover new lessons every day from real people and continue growing through practical life experiences.",
  },
];

// Animation Variants
const fadeUp = {
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

export default function WhyDigitalLifeLessonsPage() {
  return (
    <section className="bg-[#F8F4EE] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        {/* Heading */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14 sm:mb-16 md:mb-20"
        >
          <p className="uppercase tracking-[4px] text-[#C9794D] text-xs sm:text-sm font-semibold ">
            WHY DIGITAL LIFE LESSONS
          </p>

          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#231815] leading-tight max-w-3xl">
            Learn from real experiences,
            <br />
            not just theories.
          </h2>
        </motion.div>

        {/* Grid */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#DDD3C7]"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {lessons.map((item, index) => (
            <motion.div
              key={item.id}
              variants={card}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              className="group border-r border-b border-[#DDD3C7] p-6 sm:p-8 md:p-10 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <motion.span
                whileHover={{
                  scale: 1.2,
                  color: "#9A4E22",
                }}
                className="text-[#C9794D] text-sm font-semibold tracking-widest"
              >
                {item.id}
              </motion.span>

              <h3 className="mt-4 text-2xl sm:text-3xl font-serif font-bold text-[#231815] group-hover:text-[#C9794D] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="mt-5 text-gray-600 text-base sm:text-lg leading-7 sm:leading-8">
                {item.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: 80 }}
                transition={{ duration: 0.3 }}
                className="h-[2px] bg-[#C9794D] mt-6"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
