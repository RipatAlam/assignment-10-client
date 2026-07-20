"use client";

import { getPublicComments } from "@/lib/lessonServer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TestimonialCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getPublicComments();
        setComments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading reviews...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#F9F7F3] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-[#C9794D] text-sm font-semibold">
            TESTIMONIALS
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#231815]">
            What Our Users Say
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Real experiences shared by our amazing community members.
          </p>
        </div>


        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-10 text-blue-600 font-semibold"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>


        {/* Comments */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {comments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all duration-300"
            >

              <Quote className="w-12 h-12 text-blue-500 mb-6" />

              <p className="text-gray-600 leading-8 italic">
                "{item.comment}"
              </p>


              <div className="flex items-center gap-4 mt-8">

                <Image
                  src={
                    item.image ||
                    "/Images/users/user1.jpg"
                  }
                  width={60}
                  height={60}
                  alt={item.name || "User"}
                  className="rounded-full object-cover w-[60px] h-[60px]"
                />


                <div>
                  <h3 className="font-bold text-lg text-[#231815]">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Community Member
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>


        {/* Empty State */}
        {comments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No reviews found.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}