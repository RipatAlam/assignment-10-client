"use client";
import Image from "next/image";
import { Brain, Briefcase, Heart, Activity, Wallet } from "lucide-react";
import { motion } from "framer-motion";

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
// Animation Variants
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
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
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function BannerPage() {
  return (
    <section
      className="relative max-w-7xl mx-auto h-[90vh] bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/Images/BannerImage.png')",
        backgroundSize: "cover",
        backgroundPosition: "73% center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:px-8 md:px-60 lg:px-25 w-full h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm mb-6 backdrop-blur"
            >
              ✨ Learn. Share. Grow.
            </motion.span>

            <motion.h1
              variants={fadeLeft}
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-white"
            >
              Every Experience
              <br />
              Teaches
              <br />
              <span className="text-blue-400">Something Valuable.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-gray-300 text-lg max-w-lg"
            >
              Read inspiring life lessons shared by people around the world.
              Learn from their experiences and share your own story to help
              others grow.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl text-white font-semibold"
              >
                Explore Lessons →
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl text-white font-semibold"
              >
                Share Your Lesson
              </motion.button>
            </motion.div>

            {/* Avatar Section */}

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mt-10"
            >
              <div className="flex -space-x-3">
                <img
                  src="https://i.pravatar.cc/50?img=1"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/50?img=2"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/50?img=3"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/50?img=4"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>

              <p className="text-gray-300">
                Trusted by{" "}
                <span className="text-white font-semibold">10,000+</span>
                <br />
                learners worldwide
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative h-[650px] hidden lg:flex items-center justify-center"
          >
            {/* Circle */}
            <div className="absolute w-[550px] h-[550px] rounded-full border border-purple-400/30"></div>

            {/* Top */}
            <Card
              title="Mindset"
              lessons="12.4K Lessons"
              icon={Brain}
              className="top-6 left-1/2 -translate-x-1/2 animate-float"
            />

            {/* Left */}
            <Card
              title="Relationships"
              lessons="8.7K Lessons"
              icon={Heart}
              className="top-45 left-[-50px] animate-float2"
            />

            {/* Bottom Left */}
            <Card
              title="Health"
              lessons="6.2K Lessons"
              icon={Activity}
              className="bottom-30 left-1 animate-float"
            />

            {/* Right */}
            <Card
              title="Career"
              lessons="9.3K Lessons"
              icon={Briefcase}
              className="top-45 right-[-50px] animate-float2"
            />

            {/* Bottom Right */}
            <Card
              title="Finance"
              lessons="7.7K Lessons"
              icon={Wallet}
              className="bottom-30 right-1 animate-float"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, lessons, icon: Icon, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.1,
        y: -8,
      }}
      transition={{ duration: 0.5 }}
      className={`absolute ${className}
      w-48 rounded-2xl
      bg-white/10 backdrop-blur-xl
      border border-white/20
      px-5 py-4
      shadow-[0_0_30px_rgba(147,51,234,0.35)]`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>

        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-gray-300 text-sm">{lessons}</p>
        </div>
      </div>
    </motion.div>
  );
}
