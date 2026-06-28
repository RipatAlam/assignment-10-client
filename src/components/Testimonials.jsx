"use client";

import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?img=1",
    feedback:
      "This platform completely changed how I reflect on my life experiences.",
  },
  {
    id: 2,
    name: "David Smith",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=2",
    feedback: "A clean and powerful way to document life lessons.",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Student",
    image: "https://i.pravatar.cc/150?img=3",
    feedback: "Learning from experiences has never been this easy.",
  },
  {
    id: 4,
    name: "Michael Lee",
    role: "Entrepreneur",
    image: "https://i.pravatar.cc/150?img=4",
    feedback: "Highly recommended for personal growth.",
  },
];

export default function TestimonialsPage() {
  return (
    <section className="bg-gray-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Users Say
          </h1>
          <p className="text-gray-500 mt-3 text-base md:text-lg">
            Discover authentic experiences shared by learners, creators, and dreamers around the world.
          </p>
        </div>

        {/* SCROLL CONTAINER */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="
                flex-shrink-0
                w-[85%] sm:w-[60%] md:w-[32%]
                snap-start
                bg-white
                p-6 sm:p-8
                rounded-2xl
                border
                shadow-md
                hover:shadow-xl
                transition
              "
            >

              {/* Quote */}
              <div className="text-3xl sm:text-4xl text-blue-500 font-bold">
                “
              </div>

              {/* Feedback */}
              <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
                {item.feedback}
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-6">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="rounded-full border"
                  unoptimized
                />

                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}