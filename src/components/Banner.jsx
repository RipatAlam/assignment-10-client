"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function BannerPage({ isLoggedIn }) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Live Time (HH:MM:SS)
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);

      // Date
      const dateString = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      setCurrentDate(dateString);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#f8f9fa] overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-50"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Live Time Badge */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="bg-white border border-gray-300 rounded-lg px-5 py-3 shadow-sm flex items-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-600" />
              <span className="font-mono text-lg tracking-widest font-semibold text-gray-800">
                {currentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="text-gray-500 mb-6 text-lg">
          {currentDate}
        </div>

        {/* Main Title */}
        <h1 className="text-7xl md:text-8xl font-bold text-gray-900 tracking-tighter leading-none mb-6">
          DIGITAL<br />LIFE LESSONS
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-600 font-light max-w-2xl mx-auto mb-12">
          Preserve your wisdom.<br />
          Share your growth.<br />
          Inspire the world.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={isLoggedIn ? "/dashboard/add-lesson" : "/security/signup"}
            className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoggedIn ? "Write Your Lesson" : "Join Free Today"}
          </Link>

          <Link
            href="dashboard/public-lessons"
            className="border border-gray-400 hover:border-gray-600 text-gray-700 px-10 py-4 rounded-2xl text-lg font-medium transition-all"
          >
            Explore Public Lessons
          </Link>
        </div>

        {/* Bottom Tag */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-6 h-[2px] bg-gray-300"></div>
            POWERED BY WISDOM
            <div className="w-6 h-[2px] bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-300 text-sm flex flex-col items-center animate-bounce">
        ↓ Scroll to explore
      </div>
    </section>
  );
}