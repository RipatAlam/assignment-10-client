"use client";

import { getPublicComments } from "@/lib/lessonServer";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Animation Variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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
    },
  },
};

export default function TestimonialsSection() {
  // Testimonials Data
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const data = await getPublicComments();
      setComments(data);
    };

    loadComments();
  }, []);

  return (
    <section className="bg-[#F9F7F3] max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-20">
      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="uppercase tracking-[4px] text-[#C9794D] text-sm font-semibold">
          TESTIMONIALS
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#231815]">
          What Our Users Say
        </h2>

        <p className="mt-6 text-gray-600 text-lg leading-8">
          Discover authentic experiences shared by learners, creators, and
          dreamers around the world.
        </p>
      </motion.div>

      {/* Cards */}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      >
        {comments.slice(0, 3).map((item) => (
          <motion.div
            key={item._id}
            variants={card}
            whileHover={{ y: -10, scale: 1.03 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300"
          >
            <Quote className="w-12 h-12 text-blue-500 mb-6" />

            <p className="text-gray-600 leading-8 italic">"{item.comment}"</p>

            <div className="flex items-center gap-4 mt-8">
              <Image
                src={item.userImage || "/Images/users/user1.jpg"}
                width={60}
                height={60}
                alt={item.userName}
                className="rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg text-[#231815]">
                  {item.userName}
                </h3>

                <p className="text-gray-500 text-sm">Community Member</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mt-14"
      >
        <Link
          href="/testimonials"
          className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          View All Reviews
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
