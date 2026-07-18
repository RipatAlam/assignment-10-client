"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MessageCircle, ArrowRight } from "lucide-react";
import { getPublicLessonsHome } from "@/lib/lessonServer";

export default function PublicLessonsHomePage() {
  const [publicLessonsData, setPublicLessonsData] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getPublicLessonsHome();
        setPublicLessonsData(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchLessons();
  }, []);

  return (
    <section className="bg-[#F8F4EE] py-24 sm:py-28 md:py-32 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[4px] text-[#C9794D] font-semibold">
            FEATURED STORIES
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#231815]">
            Wisdom From Real Life Experiences
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Explore handpicked life lessons shared by inspiring people and
            discover practical wisdom you can apply to your own journey.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicLessonsData.map((lesson, index) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-[#F8F4EE] rounded-3xl overflow-hidden shadow-lg"
            >
              <Image
                src={lesson.image}
                width={500}
                height={300}
                alt={lesson.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-7">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {lesson.category}
                </span>

                <h3 className="mt-5 text-xl font-bold text-[#231815] line-clamp-2">
                  {lesson.title}
                </h3>

                <div className="flex items-center gap-3 mt-5">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <p className="font-medium">{lesson.name}</p>
                </div>

                <div className="flex justify-between mt-7">
                  <div className="flex gap-5 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Heart size={18} />
                      {lesson.likes}
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageCircle size={18} />
                      {lesson.comments}
                    </div>
                  </div>

                  <Link href={`/dashboard/public-lessons/${lesson._id}`}>
                    <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                      Read
                      <ArrowRight size={18} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Link href="/dashboard/public-lessons">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
              View All Lessons
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
