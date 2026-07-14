import Image from "next/image";
import { MessageCircleMore, Clapperboard, ChevronRight } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-[#F8F4EE] py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="uppercase tracking-[4px] text-[#C9794D] text-sm font-semibold">
            FEATURES
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-serif font-bold text-[#231815] leading-tight">
            Built for memories that
            <br />
            last generations
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Every feature is thoughtfully designed to help families capture
            stories, preserve voices, and create a digital legacy that can be
            shared forever.
          </p>
        </div>

        {/* ================= Feature One ================= */}

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}

          <div className="relative">
            <div className="overflow-hidden rounded-[34px] shadow-xl">
              <div className="">
                <Image
                  src="/images/AIStoryGuide.webp"
                  width={650}
                  height={800}
                  alt="Interview"
                  className="w-full object-cover hover:scale-105 duration-700"
                />
              </div>
            </div>
          </div>

          {/* Content */}

          <div>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE8DB] flex items-center justify-center">
                <MessageCircleMore className="text-[#C9794D]" size={30} />
              </div>

              <h3 className="text-5xl font-serif font-bold text-[#231815]">
                AI Story Guide
              </h3>
            </div>

            <p className="text-gray-600 leading-8 text-lg mb-8">
              LifeLore asks meaningful, personalized questions that help
              parents, grandparents, and loved ones tell their stories
              naturally—without awkward interviews.
            </p>

            <div className="space-y-5">
              {[
                "Personalized interview prompts",
                "Adapts to age & relationship",
                "Voice and video recording support",
                "AI follow-up questions for deeper conversations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ChevronRight size={18} className="text-[#C9794D]" />

                  <p className="text-gray-700 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Feature Two ================= */}

        <div className="grid lg:grid-cols-2 gap-20 items-center mt-32">
          {/* Left Content */}

          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE8DB] flex items-center justify-center">
                <Clapperboard className="text-[#C9794D]" size={30} />
              </div>

              <h3 className="text-5xl font-serif font-bold text-[#231815]">
                Beautiful Memory Reels
              </h3>
            </div>

            <p className="text-gray-600 leading-8 text-lg mb-8">
              Transform conversations into cinematic memory reels with captions,
              music, and themes—ready to share privately with family or save
              forever.
            </p>

            <div className="space-y-5">
              {[
                "Auto-generated captions",
                "Smart story highlights",
                "Family-only sharing",
                "Download in HD anytime",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ChevronRight size={18} className="text-[#C9794D]" />

                  <p className="text-gray-700 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}

          <div className="relative order-1 lg:order-2">
            <div className="overflow-hidden rounded-[34px] shadow-xl">
              <Image
                src="/images/BeautifulMemoryReels.jpg"
                width={800}
                height={650}
                alt="Family"
                className="w-full object-cover hover:scale-105 duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
