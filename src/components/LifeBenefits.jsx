"use client";

import { BookOpen, Rocket, Lightbulb, Globe } from "lucide-react";

const benefitsData = [
  {
    id: 1,
    title: "Preserve Wisdom",
    icon: BookOpen,
    description:
      "Capture real-life experiences so future generations can learn from your journey and avoid mistakes.",
  },
  {
    id: 2,
    title: "Faster Growth",
    icon: Rocket,
    description:
      "Learn faster by studying real human experiences instead of repeating the same life mistakes.",
  },
  {
    id: 3,
    title: "Real Insights",
    icon: Lightbulb,
    description:
      "Life gives lessons that books cannot teach — real decisions, real consequences, real wisdom.",
  },
  {
    id: 4,
    title: "Inspire Others",
    icon: Globe,
    description:
      "Your personal story can inspire thousands of people around the world and create impact.",
  },
];

export default function LifeBenefits() {
  return (
    <section className="py-25 bg-[#F8F4EE]">
      <div className="max-w-7xl mx-auto px-16">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Learning From Life Matters
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Real experiences shape real wisdom. Capture, learn, and grow from life lessons that truly matter.
          </p>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Hover over each card to explore deeper meaning of life lessons.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {benefitsData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group relative p-10 rounded-3xl bg-white border shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[260px]"
              >

                {/* Icon (bigger) */}
                <Icon className="w-10 h-10 text-blue-600" />

                {/* Title */}
                <h3 className="text-xl font-semibold mt-6 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>

                {/* Hint */}
                <p className="text-xs text-gray-400 mt-2">
                  Hover to see details
                </p>

                {/* Default text */}
                <div className="mt-6 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Life lesson insight available...
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md p-8 flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-300">

                  <p className="text-base text-gray-700 leading-relaxed">
                    {item.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}