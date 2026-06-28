"use client";

import Image from "next/image";
import Link from "next/link";

const lessons = [
  {
    id: 1,
    title: "Never Stop Learning",
    category: "Career",
    author: "John Doe",
    image: "https://i.pravatar.cc/150?img=1",
    excerpt: "The world changes quickly. Keep learning new skills.",
    likes: 25,
    views: 120,
  },
  {
    id: 2,
    title: "Communication Matters",
    category: "Relationships",
    author: "Sarah Smith",
    image: "https://i.pravatar.cc/150?img=2",
    excerpt: "Most relationship problems can be solved through communication.",
    likes: 42,
    views: 300,
  },
];

export default function PublicLessonsPage() {
  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900">
            Public Life Lessons
          </h1>

          <p className="text-gray-600 mt-3">
            Discover wisdom shared by people around the world.
          </p>

          <input
            type="text"
            placeholder="Search lessons..."
            className="mt-6 w-full max-w-lg px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={lesson.image}
                    alt={lesson.author}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  <div>
                    <h3 className="font-semibold">{lesson.author}</h3>
                    <p className="text-sm text-gray-500">
                      {lesson.category}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {lesson.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {lesson.excerpt}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>❤️ {lesson.likes}</span>
                  <span>👁️ {lesson.views}</span>
                </div>

                <Link
                  href={`/lessons/${lesson.id}`}
                  className="block text-center bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}