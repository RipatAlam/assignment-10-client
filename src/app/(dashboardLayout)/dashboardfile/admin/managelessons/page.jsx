"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle, Trash2, Search, XCircle } from "lucide-react";
import {
  approveLesson,
  getAdminLessons,
  publishLesson,
  unapproveLesson,
} from "@/lib/lessonServer";

export default function ManageLessons() {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);

  const [showApproved, setShowApproved] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const fetchLessons = async () => {
    try {
      const data = await getAdminLessons();

      setLessons(data);
      setFilteredLessons(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  // Search + Filter

  useEffect(() => {
    let data = [...lessons];

    if (search) {
      data = data.filter(
        (lesson) =>
          lesson.title?.toLowerCase().includes(search.toLowerCase()) ||
          lesson.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      data = data.filter((lesson) => lesson.category === category);
    }

    setFilteredLessons(data);
  }, [search, category, lessons]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this lesson?");

    if (!confirmDelete) return;

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons/${id}`, {
      method: "DELETE",
    });

    setLessons(lessons.filter((lesson) => lesson._id !== id));
  };

  //HandleApprove
  const handleApprove = async (id) => {
    console.log("Approve button clicked:", id);

    try {
      const result = await approveLesson(id);
      console.log(result);

      await fetchLessons();
    } catch (error) {
      console.log(error);
    }
  };

  //HandlePublish
  const handlePublish = async (id) => {
    try {
      await publishLesson(id);
      await fetchLessons();
    } catch (error) {
      console.log(error);
    }
  };

  //HandleUnapprove
  const handleUnapprove = async (id) => {
    try {
      await unapproveLesson(id);
      await fetchLessons();
    } catch (error) {
      console.log(error);
    }
  };

  const categories = ["All", ...new Set(lessons.map((item) => item.category))];

  const totalLessons = filteredLessons;

  const approvedLessons = filteredLessons.filter(
    (lesson) => lesson.status === "Approved",
  );

  const pendingLessons = filteredLessons.filter(
    (lesson) => lesson.status === "Pending",
  );

  if (loading) {
    return <div className="p-6">Loading lessons...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto bg-[#F8F4EE] p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Lessons</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Total Lessons</p>

          <h2 className="text-3xl font-bold">{lessons.length}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Approved</p>

          <h2 className="text-3xl font-bold">
            {lessons.filter((l) => l.status === "Approved").length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <p className="text-gray-500">Pending</p>

          <h2 className="text-3xl font-bold">
            {lessons.filter((l) => l.status === "Pending").length}
          </h2>
        </div>
      </div>

      {/* Search Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lesson..."
            className="w-full border rounded-xl py-3 pl-10 px-4"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Lesson Section Button */}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => {
            setShowApproved(false);
            setShowPending(false);
          }}
          className={`w-full sm:w-auto px-5 py-3 rounded-xl ${
            !showApproved && !showPending
              ? "bg-gray-900 text-white"
              : "bg-white"
          }`}
        >
          All Lessons
        </button>

        <button
          onClick={() => {
            setShowApproved(true);
            setShowPending(false);
          }}
          className={`w-full sm:w-auto px-5 py-3 rounded-xl ${
            showApproved ? "bg-green-600 text-white" : "bg-white"
          }`}
        >
          Approved Lessons ({approvedLessons.length})
        </button>

        <button
          onClick={() => {
            setShowApproved(false);
            setShowPending(true);
          }}
          className={`w-full sm:w-auto px-5 py-3 rounded-xl ${
            showPending ? "bg-yellow-500 text-white" : "bg-white"
          }`}
        >
          Pending Lessons ({pendingLessons.length})
        </button>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Title</th>

              <th className="p-4">Category</th>

              <th className="p-4">Status</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {(showApproved
              ? approvedLessons
              : showPending
                ? pendingLessons
                : totalLessons
            ).map((lesson) => (
              <tr key={lesson._id} className="border-b">
                <td className="p-4">
                  <Image
                    src={lesson.image}
                    width={60}
                    height={60}
                    alt={lesson.title}
                    className="rounded-xl object-cover"
                  />
                </td>

                <td className="p-4 font-semibold">
                  {lesson.title}
                  <p className="text-sm text-gray-500">{lesson.name}</p>
                </td>

                <td className="text-center">{lesson.category}</td>

                <td className="text-center">{lesson.status || "Pending"}</td>

                <td className="p-4 flex gap-2 justify-center">
                  {lesson.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(lesson._id)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}

                  {lesson.status === "Approved" && (
                    <>
                      <button
                        onClick={() => handlePublish(lesson._id)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                        title="Publish"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        onClick={() => handleUnapprove(lesson._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                        title="Unapprove"
                      >
                        <XCircle size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
