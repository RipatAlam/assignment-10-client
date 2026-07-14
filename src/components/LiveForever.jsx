import {
  BookOpen,
  Heart,
  Bot,
  Globe2,
} from "lucide-react";

const features = [
  {
    id: "01",
    title: "Capture Real Stories",
    description:
      "Record heartfelt conversations with parents, grandparents, and loved ones using guided AI questions that make storytelling feel natural.",
    icon: BookOpen,
    bg: "bg-orange-100",
  },
  {
    id: "02",
    title: "Preserve Memories",
    description:
      "Every memory is securely stored in your personal family archive, so precious moments never fade with time.",
    icon: Heart,
    bg: "bg-red-100",
  },
  {
    id: "03",
    title: "AI-Powered Experience",
    description:
      "Our AI organizes stories, creates summaries, generates captions, and transforms recordings into engaging digital memories.",
    icon: Bot,
    bg: "bg-violet-100",
  },
  {
    id: "04",
    title: "Build Your Legacy",
    description:
      "Create a timeless collection of your family's history that future generations can explore, cherish, and pass on.",
    icon: Globe2,
    bg: "bg-green-100",
  },
];

export default function LiveForeverPage() {
  return (
    <section className="bg-[#F8F4EE] py-25">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="uppercase tracking-[4px] text-[#C9794D] font-semibold text-sm">
            About LifeLore
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#231815] leading-tight">
            Every Story Deserves
            <br />
            to Live Forever
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            LifeLore helps families preserve memories, wisdom, and life
            experiences through AI-powered storytelling. Record meaningful
            conversations, organize them beautifully, and create a digital
            legacy that can be shared for generations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 px-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Background Number */}
                <h1 className="absolute left-8 top-4 text-8xl font-bold text-gray-100">
                  {item.id}
                </h1>

                <div
                  className={`w-20 h-20 rounded-2xl ${item.bg} flex items-center justify-center mx-auto relative z-10`}
                >
                  <Icon size={38} className="text-gray-800" />
                </div>

                <h3 className="mt-8 text-3xl font-semibold text-center text-[#231815]">
                  {item.title}
                </h3>

                <p className="mt-5 text-center text-gray-600 leading-8 text-lg">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}