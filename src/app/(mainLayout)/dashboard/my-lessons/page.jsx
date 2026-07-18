"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  Pencil,
  Trash2,
  Eye,
  BookOpen,
  Search,
} from "lucide-react";
import { useState } from "react";

const myLessons = [
  {
    _id: "1",
    title: "The Biggest Career Mistake I Made at 25",
    category: "Career",
    image: "https://i.ibb.co/HD5fDn15/ACKWU.jpg",
    story:
      "At the age of 25, I focused only on earning money instead of developing my skills. Looking back, I realized experience and learning are far more valuable...",
    likes: 245,
    createdAt: "2026-01-12",
  },
  {
    _id: "2",
    title: "How Exercise Changed My Life",
    category: "Health",
    image: "https://i.ibb.co/HD5fDn15/ACKWU.jpg",
    story:
      "For years I ignored my health until I decided to exercise every morning. That one habit completely changed my energy and confidence...",
    likes: 180,
    createdAt: "2026-03-08",
  },
];

export default function MyLessonsPage() {
  const [search, setSearch] = useState("");

  const filteredLessons = myLessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
            <BookOpen size={18} />
            My Lessons
          </div>

          <h1 className="text-5xl font-bold text-[#231815] mt-5">
            Manage Your Lessons
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            View, edit or delete the life lessons you've shared with the
            community.
          </p>
        </motion.div>

        {/* Search */}

        <div className="max-w-xl mx-auto mb-14">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search your lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-2xl py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Cards */}

        {filteredLessons.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <Image
                  src={lesson.image}
                  alt={lesson.title}
                  width={500}
                  height={300}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {lesson.category}
                    </span>

                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar size={16} />
                      {lesson.createdAt}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mt-5 text-[#231815]">
                    {lesson.title}
                  </h2>

                  <p className="text-gray-600 mt-4 line-clamp-3">
                    {lesson.story}
                  </p>

                  <div className="flex items-center gap-2 mt-5 text-gray-600">
                    <Heart size={18} />
                    {lesson.likes} Likes
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-7">
                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                      <Eye size={18} />
                    </button>

                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition">
                      <Pencil size={18} />
                    </button>

                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <BookOpen size={70} className="mx-auto text-gray-400" />

            <h2 className="text-3xl font-bold mt-6">No Lessons Found</h2>

            <p className="text-gray-500 mt-3">
              You haven't shared any lessons yet.
            </p>

            <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition">
              Add New Lesson
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
