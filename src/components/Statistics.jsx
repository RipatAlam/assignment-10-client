"use client";

import React from "react";
import { Users, BookOpen, BarChart3, Award } from "lucide-react";

export default function StaticDataPage() {
  const stats = [
    {
      title: "Total Users",
      value: 1240,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Lessons",
      value: 86,
      icon: BookOpen,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Completed Lessons",
      value: 540,
      icon: Award,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Engagement Rate",
      value: "78%",
      icon: BarChart3,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const lessons = [
    { id: 1, title: "HTML Basics", level: "Beginner" },
    { id: 2, title: "CSS Flexbox", level: "Beginner" },
    { id: 3, title: "JavaScript ES6", level: "Intermediate" },
    { id: 4, title: "React Components", level: "Intermediate" },
    { id: 5, title: "Next.js Routing", level: "Advanced" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Digital Life Lessons Dashboard
        </h1>

        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
          Learn essential digital life skills to grow smarter, safer, and more confident in the modern online world.
        </p>

        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
            Digital Life Lessons
          </span>
          <span className="text-xs text-gray-400">
            Static Demo Dashboard
          </span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl ${item.color}`}>
                <Icon size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
        
      </div>

      {/* LESSON LIST */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-5 text-gray-900">
          Popular Lessons
        </h2>

        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition"
            >
              <p className="font-medium text-gray-800">
                {lesson.title}
              </p>

              <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                {lesson.level}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}