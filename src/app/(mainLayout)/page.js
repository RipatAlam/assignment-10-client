import BannerPage from "@/components/Banner";
import FeaturedImages from "@/components/FeaturedImages";
import LifeBenefits from "@/components/LifeBenefits";
import Percentage from "@/components/Percentage";
import StatisticsPage from "@/components/Statistics";
import TestimonialsPage from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <BannerPage />
      <Percentage />
      <FeaturedImages />
      <LifeBenefits />
      <StatisticsPage />
      <TestimonialsPage />
    </div>
  );
}
