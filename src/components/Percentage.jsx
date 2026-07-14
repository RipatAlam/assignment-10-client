import { BookOpen, Users, Globe, Star } from "lucide-react";

export default function PercentagePage() {
  const stats = [
    {
      icon: BookOpen,
      value: "20K+",
      title: "Lessons Shared",
      color: "text-blue-400",
    },
    {
      icon: Users,
      value: "35K+",
      title: "Active Learners",
      color: "text-cyan-400",
    },
    {
      icon: Globe,
      value: "120+",
      title: "Countries",
      color: "text-green-400",
    },
    {
      icon: Star,
      value: "98%",
      title: "Positive Reviews",
      color: "text-yellow-400",
    },
  ];

  return (
    <section className="relative w-full -mt-20 z-30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="rounded-t-3xl border border-white/10 bg-[#0B1220]/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden">

          <div className="grid grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-center justify-center text-center p-8 border-b border-white/10 lg:border-b-0 lg:border-r last:border-r-0 hover:bg-white/5 transition-all duration-500"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-blue-500/10 to-transparent transition duration-500"></div>

                  {/* Icon */}
                  <div
                    className={`relative z-10 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition duration-300`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Number */}
                  <h2 className="relative z-10 mt-5 text-4xl font-bold text-white">
                    {item.value}
                  </h2>

                  {/* Title */}
                  <p className="relative z-10 mt-2 text-gray-400">
                    {item.title}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}