"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Calendar, User, MessageCircle } from "lucide-react";
import { getPublicLessonsId } from "@/lib/lessonServer";
import { useParams } from "next/navigation";

export default function LessonDetails() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Image */}
          <div>
            <Image
              src={lesson.image}
              alt={lesson.title}
              width={700}
              height={700}
              className="w-full h-[800px] object-cover rounded-3xl shadow-xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
              {lesson.category}
            </span>

            <h1 className="text-5xl font-bold mt-6 leading-tight text-[#231815]">
              {lesson.title}
            </h1>

            <p className="mt-8 text-lg leading-9 text-gray-700">
              {lesson.story}
            </p>

            {/* Lesson Box */}
            <div className="mt-10 bg-blue-50 border-l-4 border-blue-600 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-3">
                💡 Life Lesson
              </h2>

              <p className="text-gray-700 leading-8">{lesson.lesson}</p>
            </div>

            {/* Bottom Info */}
            <div className="border-t mt-10 pt-6 flex flex-wrap justify-between gap-6">
              <div className="flex items-center gap-3">
                <User size={20} className="text-blue-600" />
                <div>
                  <p className="font-semibold">{lesson.authorName}</p>
                  <p className="text-sm text-gray-500">{lesson.authorEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {lesson.createdAt}
                </div>

                <div className="flex items-center gap-2 text-red-500">
                  <Heart size={18} />
                  {lesson.likes}
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  {lesson.comments || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
