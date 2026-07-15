"use client";
import Image from "next/image";
import { Users, ChevronRight, BookOpen, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
// Animation Variants
const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
// Animation Variants
const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="bg-[#F8F4EE] py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20 lg:mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="uppercase tracking-[4px] text-[#C9794D] text-sm font-semibold">
            FEATURES
          </p>

          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#231815] leading-tight">
            Everything You Need
            <br />
            to Share & Learn
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-600 leading-7 md:leading-8">
            Discover inspiring life lessons, share your own experiences, and
            learn practical wisdom from people around the world.
          </p>
        </motion.div>

        {/* ================= Feature One ================= */}

        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          {/* Image */}

          <motion.div
            className="relative"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="overflow-hidden rounded-[34px] shadow-xl">
              <div className="">
                <Image
                  src="/images/PersonWritingLesson.jpg"
                  width={650}
                  height={800}
                  alt="Interview"
                  className="w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover hover:scale-105 duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-6 md:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-16 rounded-2xl lg:rounded-3xl bg-[#FFE8DB] flex items-center justify-center">
                <BookOpen className="text-[#C9794D]" size={30} />
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#231815] leading-tight">
                Share Your Life Lessons
              </h3>
            </div>

            <p className="text-gray-600 text-base sm:text-lg leading-7 md:leading-8 mb-6 md:mb-8">
              Share your real-life experiences and the valuable lessons you
              learned to inspire others and make a positive impact.
            </p>

            <div className="space-y-3 md:space-y-5">
              {[
                "Create detailed life lessons",
                "Choose categories easily",
                "Add cover images",
                "Inspire thousands of readers",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  className="flex items-center gap-3"
                >
                  <ChevronRight size={18} className="text-[#C9794D]" />
                  <p className="text-gray-700 text-base sm:text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================= Feature Two ================= */}

        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center mt-20 md:mt-24 lg:mt-32">
          {/* Left Content */}

          <motion.div
            className="order-2 lg:order-1"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-6 md:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-16 rounded-2xl lg:rounded-3xl bg-[#FFE8DB] flex items-center justify-center">
                <Users className="text-[#C9794D]" size={30} />
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#231815] leading-tight">
                Explore Public Lessons
              </h3>
            </div>

            <p className="text-gray-600 text-base sm:text-lg leading-7 md:leading-8 mb-6 md:mb-8">
              Browse inspiring stories shared by people around the world and
              learn valuable life lessons.
            </p>

            <div className="space-y-3 md:space-y-5">
              {[
                "Browse public lessons",
                "Read inspiring stories",
                "Search by category",
                "Learn from real experiences",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  className="flex items-center gap-3"
                >
                  <ChevronRight size={18} className="text-[#C9794D]" />
                  <p className="text-gray-700 text-base sm:text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}

          <motion.div
            className="relative order-1 lg:order-2"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-[34px] shadow-xl">
              <Image
                src="/images/ReadingStories.jpg"
                width={800}
                height={650}
                alt="Family"
                className="w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover hover:scale-105 duration-700"
              />
            </div>
          </motion.div>
        </div>

        {/* ================= Feature Three ================= */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center mt-20 md:mt-24 lg:mt-32">
          {/* Image */}

          <motion.div
            className="relative"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-[34px] shadow-xl">
              <Image
                src="/images/MyLessonsDashboard.jpg"
                width={800}
                height={650}
                alt="Digital Legacy"
                className="w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover hover:scale-105 duration-700"
              />
            </div>
          </motion.div>

          {/* Content */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-6 md:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-16 rounded-2xl lg:rounded-3xl bg-[#FFE8DB] flex items-center justify-center">
                <FolderOpen className="text-[#C9794D]" size={30} />
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#231815] leading-tight">
                Manage Your Lessons
              </h3>
            </div>

            <p className="text-gray-600 text-base sm:text-lg leading-7 md:leading-8 mb-6 md:mb-8">
              Manage all your published lessons from one place. Update, edit, or
              delete them whenever you want.
            </p>

            <div className="space-y-3 md:space-y-5">
              {[
                "View your lessons",
                "Edit anytime",
                "Delete unwanted lessons",
                "Track your contributions",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  className="flex items-center gap-3"
                >
                  <ChevronRight size={18} className="text-[#C9794D]" />
                  <p className="text-gray-700 text-base sm:text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
