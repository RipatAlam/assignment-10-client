import BannerPage from "@/components/Banner";
import LastGenerationsPage from "@/components/LastGenerations";
import LifeBenefits from "@/components/LifeBenefits";
import LiveForeverPage from "@/components/LiveForever";
import PercentagePage from "@/components/Percentage";
import Percentage from "@/components/Percentage";
import TestimonialsPage from "@/components/Testimonials";
import WhyDigitalLifeLessonsPage from "@/components/WhyDigitalLifeLessons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <BannerPage />
      <PercentagePage />
      <LiveForeverPage />
      <LastGenerationsPage />
      <WhyDigitalLifeLessonsPage />
      <LifeBenefits />
      <TestimonialsPage />
    </div>
  );
}
