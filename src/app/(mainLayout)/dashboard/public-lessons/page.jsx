"use client";
import Image from "next/image";
import { Heart, MessageCircle, ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getPaginatedPublicLessons,
  likeLesson,
  increaseLessonView,
} from "@/lib/lessonServer";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function PublicLessons() {
  const [search, setSearch] = useState("");
  const [publicLessonsData, setPublicLessonsData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState("newest");

  const { data } = useSession();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const result = await getPaginatedPublicLessons(page, data?.user?.id);

        //console.log(result);

        setPublicLessonsData(result.lessons || []);
        setTotalPages(result.totalPages || 1);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchLessons();
  }, [page, data?.user?.id]);

  const filteredLessons = [...publicLessonsData]
    .filter((lesson) => {
      const searchTerm = (search || "").toLowerCase();

      return (
        lesson.title?.toLowerCase().includes(searchTerm) ||
        lesson.category?.toLowerCase().includes(searchTerm) ||
        lesson.name?.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "likes":
          return (b.likes || 0) - (a.likes || 0);

        case "views":
          return (b.views || 0) - (a.views || 0);

        case "az":
          return a.title.localeCompare(b.title);

        case "za":
          return b.title.localeCompare(a.title);

        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  //Like count korar jonno
  const handleLike = async (lessonId) => {
    if (!data?.user) {
      alert("Please login first");
      return;
    }

    try {
      const result = await likeLesson(lessonId, {
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email,
      });

      if (result.success) {
        setPublicLessonsData((prev) =>
          prev.map((item) =>
            item._id === lessonId
              ? { ...item, likes: item.likes + 1, isLiked: true }
              : item,
          ),
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          className="max-w-5xl mx-auto mb-14 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by title, category or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-5 text-gray-700 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm outline-none focus:border-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="likes">Most Liked</option>
            <option value="views">Most Viewed</option>
            <option value="az">Title (A-Z)</option>
            <option value="za">Title (Z-A)</option>
          </select>
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
                <div className="relative">
                  <Image
                    src={lesson.image}
                    width={500}
                    height={300}
                    alt={lesson.title}
                    className="w-full h-56 object-cover"
                  />

                  {lesson.isPremium && (
                    <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Premium
                    </span>
                  )}

                  <span className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                    ⭐ {lesson.rating}
                  </span>
                </div>

                <div className="p-7">
                  <div className="flex justify-between items-center mt-5">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {lesson.category}
                    </span>

                    <span className="text-sm text-gray-500">
                      {lesson.readingTime}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-600 line-clamp-3">
                    {lesson.summary}
                  </p>

                  <div className="flex items-center gap-3 mt-5">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                      {lesson.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold">{lesson.name}</p>

                      <p className="text-sm text-gray-500">
                        {lesson.profession} • {lesson.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5 border-t border-gray-200 pt-4">
                    <div>
                      {lesson.price === 0 ? (
                        <span className="text-lg font-bold text-green-600">
                          Free
                        </span>
                      ) : (
                        <>
                          <span className="text-xl font-bold text-blue-600">
                            ${lesson.finalPrice}
                          </span>

                          <span className="ml-2 text-sm text-gray-400 line-through">
                            ${lesson.price}
                          </span>
                        </>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lesson.isPremium
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {lesson.plan}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-6 text-gray-600">
                    <div
                      onClick={() => handleLike(lesson._id)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <Heart
                        size={16}
                        className={
                          lesson.isLiked
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }
                      />
                      {lesson.likes}
                    </div>

                    <Link
                      href={`/dashboard/public-lessons/${lesson._id}/comments`}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      <MessageCircle size={16} />
                      {lesson.comments}
                    </Link>

                    <div className="flex items-center gap-1">
                      👁 {lesson.views || 0}
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/public-lessons/${lesson._id}`}
                    onClick={() => increaseLessonView(lesson._id)}
                  >
                    <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                      Read Lesson
                    </button>
                  </Link>
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

        <div className="flex justify-center items-center gap-2 mt-16">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === index + 1 ? "bg-blue-600 text-white" : "border"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
