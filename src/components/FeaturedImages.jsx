"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/Banner.jpg",
  "/images/Banner01.jpg",
  "/images/Banner02.jpg",
  "/images/Banner03.jpg",
  "/images/Banner04.jpg",
  "/images/Banner06.jpg",
];

export default function FeaturedImages() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Inspiring Life Lessons
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 sm:p-3 bg-white rounded-full shadow hover:shadow-md transition active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="p-2 sm:p-3 bg-white rounded-full shadow hover:shadow-md transition active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-5 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >

          {images.map((src, index) => (
            <div
              key={index}
              className="
                flex-shrink-0
                w-[82%] sm:w-[60%] md:w-[360px]
                snap-start
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition
              "
            >

              {/* IMAGE HEIGHT FIX */}
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px]">

                <Image
                  src={src}
                  alt={`Life Lesson ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* TEXT */}
                <div className="absolute bottom-4 left-4 right-4 text-white">

                  <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-70">
                    Lesson #{index + 1}
                  </p>

                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-1 leading-snug">
                    {index === 0 && "The Power of Consistency"}
                    {index === 1 && "Growth Begins Outside Comfort Zone"}
                    {index === 2 && "Small Habits, Big Changes"}
                    {index === 3 && "Forgiveness is Freedom"}
                    {index === 4 && "The Art of Letting Go"}
                    {index === 5 && "Kindness Returns"}
                  </h3>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}