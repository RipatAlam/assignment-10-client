"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Calendar, User, MessageCircle } from "lucide-react";
import {
  addComment,
  deletePublicLesson,
  getComments,
  getPublicLessonsId,
  likeLesson,
} from "@/lib/lessonServer";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function LessonDetails() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullStory, setShowFullStory] = useState(false);

  const router = useRouter();
  const { data } = useSession();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getPublicLessonsId(id);
        setLesson(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  //Like count korar jonno
  const handleLike = async () => {
    if (!data?.user) {
      alert("Please login first");
      return;
    }

    try {
      const result = await likeLesson(lesson._id, {
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email,
      });

      if (result.success) {
        setLesson((prev) => ({
          ...prev,
          likes: prev.likes + 1,
        }));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Comment add korar jonno
  const handleComment = async () => {
    if (!data?.user) {
      alert("Please login first");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    try {
      const result = await addComment(lesson._id, {
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email,
        comment,
      });

      if (result.success) {
        // নতুন comment load করবে
        const updatedComments = await getComments(lesson._id);

        setComments(updatedComments);

        // comment count update
        setLesson((prev) => ({
          ...prev,
          comments: prev.comments + 1,
        }));

        setComment("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete korar jonno
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lesson?",
    );

    if (!confirmDelete) return;

    try {
      const data = await deletePublicLesson(id);

      if (data.success && data.result.deletedCount > 0) {
        alert("Lesson deleted successfully");

        setLesson(null);

        router.push("/dashboard/public-lessons");
      }
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Image */}
          <div>
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src={lesson.image}
                    alt={lesson.title}
                    width={700}
                    height={700}
                    className="w-full h-[350px] sm:h-[450px] md:h-[700px] lg:h-[800px] xl:h-[900px] object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {lesson.isPremium && (
                  <span className="absolute top-5 left-5 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Premium
                  </span>
                )}

                <span className="absolute top-5 right-5 bg-black/70 text-white px-4 py-2 rounded-full">
                  ⭐ {lesson.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                {lesson.category}
              </span>

              <span className="text-gray-500">⏱ {lesson.readingTime}</span>
            </div>

            <h1 className="text-4xl font-bold mt-6 leading-tight text-[#231815]">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-4 mt-8 border-y py-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
                {lesson.name?.charAt(0)}
              </div>

              <div>
                <h3 className="font-bold text-xl">{lesson.name}</h3>

                <p className="text-gray-500">{lesson.email}</p>

                <p className="text-sm text-gray-400">{lesson.country}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-10">Story</h2>

            <div className="mt-5">
              <p
                className={`leading-9 text-gray-700 ${
                  showFullStory ? "" : "line-clamp-2"
                }`}
              >
                {lesson.story}
              </p>

              <button
                onClick={() => setShowFullStory(!showFullStory)}
                className="mt-2 text-blue-600 font-semibold hover:underline"
              >
                {showFullStory ? "Show Less" : "Read More"}
              </button>
            </div>

            {/* Lesson Box */}
            <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center gap-3">
                <div className="text-3xl">💡</div>

                <h2 className="text-2xl font-bold">Key Lesson</h2>
              </div>

              <p className="mt-5 leading-9 text-blue-50">{lesson.lesson}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {lesson.tags?.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer rounded-full border border-blue-200 bg-white px-4 py-2 font-medium text-blue-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-xl hover:-translate-y-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-10 bg-white border rounded-3xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                {/* Price */}
                <div>
                  {lesson.price === 0 ? (
                    <h2 className="text-green-600 text-3xl font-bold">Free</h2>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-blue-600">
                          ${lesson.finalPrice}
                        </h2>

                        <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-semibold">
                          {lesson.discount}% OFF
                        </span>
                      </div>

                      <p className="line-through text-gray-400 mt-1">
                        ${lesson.price}
                      </p>
                    </>
                  )}

                  <p className="mt-3 text-sm text-gray-500">
                    {lesson.plan} • {lesson.access}
                  </p>
                </div>

                {/* Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md">
                  {lesson.isPremium ? "Buy Premium" : "Start Reading"}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <Link href={`/dashboard/my-lessons/edit-lesson/${lesson._id}`}>
              <div className="mt-10 flex gap-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md">
                  ✏️ Edit Lesson
                </button>

                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                >
                  🗑 Delete Lesson
                </button>
              </div>
            </Link>

            {/* Bottom Info */}
            <div className="grid grid-cols-4 gap-4 mt-10">
              <div
                onClick={handleLike}
                className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:bg-red-50 transition"
              >
                ❤️
                <p>{lesson.likes}</p>
              </div>

              <Link href={`/dashboard/public-lessons/${lesson._id}/comments`}>
                <div className="bg-white shadow rounded-xl p-4 text-center">
                  💬
                  <p>{lesson.comments}</p>
                </div>
              </Link>

              <div className="bg-white shadow rounded-xl p-4 text-center">
                👁
                <p>{lesson.views}</p>
              </div>

              <div className="bg-white shadow rounded-xl p-4 text-center">
                ⭐<p>{lesson.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
