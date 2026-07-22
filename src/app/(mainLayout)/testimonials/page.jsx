"use client";

import {
  deleteComment,
  getPublicComments,
  updateComment,
} from "@/lib/lessonServer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, ArrowLeft, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function TestimonialCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openMenu, setOpenMenu] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getPublicComments();
        console.log("Comments:", data);
        setComments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading reviews...</p>
      </div>
    );
  }

  //Delete Section
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this comment?");

    if (!ok) return;

    try {
      const result = await deleteComment(id);

      if (result.success) {
        setComments((prev) => prev.filter((item) => item._id !== id));

        setOpenMenu(null);

        alert("Comment deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Edit Section
  const handleUpdate = async () => {
    const result = await updateComment(editingId, editComment);

    if (result.success) {
      setComments((prev) =>
        prev.map((item) =>
          item._id === editingId ? { ...item, comment: editComment } : item,
        ),
      );

      setEditingId(null);
      setEditComment("");

      alert("Comment updated successfully");
    }
  };

  return (
    <section className="bg-[#F9F7F3] min-h-screen max-w-7xl mx-auto py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-[#C9794D] text-sm font-semibold">
            TESTIMONIALS
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#231815]">
            What Our Users Say
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Real experiences shared by our amazing community members.
          </p>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-10 text-blue-600 font-semibold"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        {/* Comments */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-end relative">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === item._id ? null : item._id)
                  }
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <MoreHorizontal size={20} />
                </button>

                {openMenu === item._id && (
                  <div className="absolute top-10 right-0 w-36 bg-white rounded-xl shadow-lg border z-50">
                    <button
                      onClick={() => {
                        setEditingId(item._id);
                        setEditComment(item.comment);
                        setOpenMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <Quote className="w-12 h-12 text-blue-500 mb-6" />
              //Comment section
              {editingId === item._id ? (
                <>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full border rounded-lg p-3"
                  />

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 leading-8 italic">
                  "{item.comment}"
                </p>
              )}
              <div className="flex items-center gap-4 mt-8">
                <Image
                  src={item.userImage || "/Images/users/user1.jpg"}
                  width={60}
                  height={60}
                  alt={item.userName || "User"}
                  className="rounded-full object-cover w-[60px] h-[60px]"
                />

                <div>
                  <h3 className="font-bold text-lg text-[#231815]">
                    {item.userName}
                  </h3>

                  <p className="text-gray-500 text-sm">Community Member</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {comments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No reviews found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
