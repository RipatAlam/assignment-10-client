"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import {
  getComments,
  getPublicLessonsId,
  addComment,
} from "@/lib/lessonServer";

export default function CommentsPage() {
  const { id } = useParams();
  const { data } = useSession();

  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const lessonData = await getPublicLessonsId(id);
        setLesson(lessonData);

        const commentsData = await getComments(id);
        console.log(commentsData, "commentData")
        setComments(commentsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleComment = async () => {
    console.log("User data: ",data?.user);
    if (!data?.user) {
      alert("Please login first");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a comment.");
      return;
    }

    try {
      const result = await addComment(id, {
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email,
        userImage: data.user.image,
        comment,
      });

      if (result.success) {
        const updatedComments = await getComments(id);
        setComments(updatedComments);

        setLesson((prev) => ({
          ...prev,
          comments: (prev.comments || 0) + 1,
        }));

        setComment("");

        alert("Comment added successfully.");
        router.push("/testimonials");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-[#F8F4EE] max-w-7xl mx-auto py-10 px-5">
      <Link
        href={`/dashboard/public-lessons/${id}`}
        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-8"
      >
        <ArrowLeft size={18} />
        Back to Lesson
      </Link>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        {lesson && (
          <div className="flex flex-col md:flex-row gap-6 border-b pb-8">
            <Image
              src={lesson.image}
              alt={lesson.title}
              width={220}
              height={150}
              className="rounded-2xl object-cover"
            />

            <div className="flex-1">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                {lesson.category}
              </span>

              <h1 className="text-3xl font-bold mt-4">{lesson.title}</h1>

              <p className="text-gray-500 mt-2">{lesson.comments} Comments</p>
            </div>
          </div>
        )}

        {/* Write Comment */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Write a Comment</h2>

          <textarea
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <button
            onClick={handleComment}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <Send size={18} />
            Post Comment
          </button>
        </div>

        {/* All Comments */}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            All Comments ({comments.length})
          </h2>

          {comments.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No comments yet.
            </div>
          ) : (
            <div className="space-y-5">
              {comments.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.userImage || "/Images/users/user1.jpg"}
                        alt={item.userName}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-bold text-lg">{item.userName}</h3>
                        <p className="text-sm text-gray-400">
                          {item.userEmail}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700 leading-8">{item.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
