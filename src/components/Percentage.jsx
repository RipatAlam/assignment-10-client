import { BookOpen, Users, Globe, Star } from "lucide-react";

export default function PercentagePage() {
  const stats = [
    {
      icon: BookOpen,
      value: "20K+",
      title: "Lessons",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      icon: Users,
      value: "35K+",
      title: "Active Learners",
      color: "bg-cyan-500/20 text-cyan-400",
    },
    {
      icon: Globe,
      value: "120+",
      title: "Countries",
      color: "bg-green-500/20 text-green-400",
    },
    {
      icon: Star,
      value: "98%",
      title: "Positive Feedback",
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 py-20 sm:px-8 lg:px-16 w-full bg-[#050816]">
      <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-white/10 bg-[#0B1220]/90 backdrop-blur-xl overflow-hidden shadow-xl">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4 p-6 border-r border-white/10 last:border-r-0"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}
              >
                <Icon size={22} />
              </div>

              <div>
                <h2 className="text-white text-2xl font-bold">
                  {item.value}
                </h2>

                <p className="text-gray-400 text-sm">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}