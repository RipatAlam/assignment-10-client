"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Eye,
  Pencil,
  Trash2,
  Search,
  Calendar,
  Plus,
} from "lucide-react";
import { getPublicLessons, deletePublicLesson } from "@/lib/lessonServer";

export default function MyLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await getPublicLessons();
        setLessons(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lesson?",
    );

    if (!confirmDelete) return;

    try {
      const data = await deletePublicLesson(id);

      if (data.success && data.result.deletedCount > 0) {
        setLessons((prev) => prev.filter((item) => item._id !== id));

        alert("Lesson deleted successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  //Search section
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchTitle = (lesson.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = category === "All" || lesson.category === category;

      return matchTitle && matchCategory;
    });
  }, [lessons, search, category]);
  const totalLessons = lessons.length;

  const totalLikes = lessons.reduce((sum, item) => sum + (item.likes || 0), 0);

  const totalViews = lessons.reduce((sum, item) => sum + (item.views || 0), 0);

  const published = lessons.length;
  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >
          <div>
            <h1 className="text-4xl font-bold">My Lessons</h1>

            <p className="text-gray-500 mt-2">
              Manage all your published lessons
            </p>
          </div>

          <Link
            href="/dashboard/add-lesson"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Lesson
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Total Lessons</p>

            <h2 className="text-4xl font-bold mt-3">{totalLessons}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Published</p>

            <h2 className="text-4xl font-bold mt-3">{published}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Total Likes</p>

            <h2 className="text-4xl font-bold mt-3">{totalLikes}</h2>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10 flex flex-col lg:flex-row gap-5">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl py-3 pl-12 pr-4"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl px-5"
          >
            <option>All</option>

            <option>Career</option>

            <option>Health</option>

            <option>Finance</option>

            <option>Business</option>

            <option>Education</option>

            <option>Relationships</option>

            <option>Mindset</option>

            <option>Family</option>
          </select>
        </div>

        {/* Cards */}

        {filteredLessons.length > 0 ? (
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">Lesson</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Likes</th>
                  <th className="text-left">Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLessons.map((lesson) => (
                  <tr key={lesson._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={lesson.image}
                          alt={lesson.title}
                          width={70}
                          height={70}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div>
                          <h2 className="font-semibold">{lesson.title}</h2>

                          <p className="text-sm text-gray-500 line-clamp-2">
                            {lesson.story}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{lesson.category}</td>

                    <td>❤️ {lesson.likes || 0}</td>

                    <td>{lesson.createdAt}</td>

                    <td>
                      <div className="flex justify-center gap-2">
                        <Link href={`/public-lessons/${lesson._id}`}>
                          <button className="bg-blue-100 p-2 rounded-lg hover:bg-blue-600 hover:text-white">
                            <Eye size={18} />
                          </button>
                        </Link>

                        <Link
                          href={`/dashboard/my-lessons/edit-lesson/${lesson._id}`}
                        >
                          <button className="bg-green-100 p-2 rounded-lg hover:bg-green-600 hover:text-white">
                            <Pencil size={18} />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(lesson._id)}
                          className="bg-red-100 p-2 rounded-lg hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
