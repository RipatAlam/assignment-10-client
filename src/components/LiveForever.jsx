"use client";
import { BookOpen, Users, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Features Data
const features = [
  {
    id: "01",
    title: "Share Real Experiences",
    description:
      "Write about meaningful moments from your life and share the lessons you learned to inspire others.",
    icon: BookOpen,
    bg: "bg-orange-100",
  },
  {
    id: "02",
    title: "Learn From Others",
    description:
      "Explore real stories and practical life lessons shared by people from different backgrounds.",
    icon: Users,
    bg: "bg-blue-100",
  },
  {
    id: "03",
    title: "Grow Every Day",
    description:
      "Discover valuable insights that help you improve your career, relationships, health, and personal growth.",
    icon: Lightbulb,
    bg: "bg-yellow-100",
  },
  {
    id: "04",
    title: "Inspire the Community",
    description:
      "Your experiences can guide others to make better decisions and avoid common mistakes in life.",
    icon: Sparkles,
    bg: "bg-purple-100",
  },
];

//Animation: Fade In
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};
//Animation: Fade In
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};
//Animation: Fade In
const headingVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function LiveForeverPage() {
  return (
    <section className="bg-[#F8F4EE] py-25">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[4px] text-[#C9794D] font-semibold text-sm">
            About Digital Life Lessons
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#231815] leading-tight">
            Every Experience
            <br />
            Has a Lesson
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Digital Life Lessons is a community where people share real-life
            experiences and the valuable lessons they learned. Discover
            inspiring stories, gain practical wisdom, and help others grow by
            sharing your own journey.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl"
              >
                {/* Background Number */}
                <h1 className="absolute left-8 top-4 text-8xl font-bold text-gray-100">
                  {item.id}
                </h1>

                <motion.div
                  whileHover={{
                    rotate: 12,
                    scale: 1.15,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-20 h-20 rounded-2xl ${item.bg} flex items-center justify-center mx-auto relative z-10`}
                >
                  <Icon size={38} className="text-gray-800" />
                </motion.div>

                <h3 className="mt-8 text-3xl font-semibold text-center text-[#231815]">
                  {item.title}
                </h3>

                <p className="mt-5 text-center text-gray-600 leading-8 text-lg">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
