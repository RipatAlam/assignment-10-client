"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function RelationshipStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full mb-5">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Relationships</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Every Relationship
            <span className="text-blue-600"> Tells a Story</span>
          </h2>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-lg leading-8">
            Relationships shape who we are. From family and friendships to love
            and mentorship, every connection teaches us valuable lessons about
            trust, kindness, patience, and understanding.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 via-white to-pink-50 rounded-3xl p-8 md:p-14 shadow-lg border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="text-blue-600 w-8 h-8 flex-shrink-0" />

            <h3 className="text-3xl font-bold text-slate-900">
              Digital Life Lessons
            </h3>
          </div>

          <p className="text-slate-700 text-lg leading-9">
            At <strong>Digital Life Lessons</strong>, we believe that every
            relationship carries a lesson worth sharing. A simple conversation,
            a difficult goodbye, an act of kindness, or years of unwavering
            support can inspire others in ways we may never imagine.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            This platform brings together real stories from people around the
            world—stories about love, friendship, family, forgiveness, and
            personal growth. Every experience shared here helps build a
            stronger, more compassionate community where wisdom is passed from
            one life to another.
          </p>

          <p className="mt-6 text-slate-700 text-lg leading-9">
            Because sometimes, the lesson you learned yesterday becomes the hope
            someone else needs today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
