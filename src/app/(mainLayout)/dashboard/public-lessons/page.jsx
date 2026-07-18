"use client";
import Image from "next/image";
import { Heart, MessageCircle, ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPublicLessons } from "@/lib/lessonServer";
import Link from "next/link";

export default function PublicLessons() {
  const [search, setSearch] = useState("");
  const [publicLessonsData, setPublicLessonsData] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getPublicLessons();
        setPublicLessonsData(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchLessons();
  }, []);

  const filteredLessons = publicLessonsData.filter((lesson) => {
    const searchTerm = (search || "").toLowerCase();

    return (
      lesson.title?.toLowerCase().includes(searchTerm) ||
      lesson.category?.toLowerCase().includes(searchTerm) ||
      lesson.name?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[4px] text-[#C9794D] font-semibold">
            PUBLIC LESSONS
          </p>

          <h2 className="text-5xl font-bold mt-4 text-[#231815]">
            Learn From Real Experiences
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Read inspiring life lessons shared by people from around the world
            and discover practical wisdom you can apply in your own life.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-14"
        >
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by title, category or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-5 text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson, index) => (
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

                  <h3 className="mt-5 text-2xl font-bold text-[#231815]">
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
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h2 className="text-3xl font-bold text-gray-700">
                😔 No Lessons Found
              </h2>

              <p className="mt-3 text-gray-500">
                We couldn't find any lessons matching your search.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
            View All Lessons
          </button>
        </div>
      </div>
    </section>
  );
}
