"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  UserCog,
  BarChart3,
  Settings,
} from "lucide-react";

const cards = [
  {
    title: "Manage Users",
    desc: "View, edit and manage all users.",
    icon: Users,
    href: "/dashboardfile/admin/users",
  },
  {
    title: "Manage Lessons",
    desc: "Approve or remove public lessons.",
    icon: BookOpen,
    href: "/dashboardfile/admin/lessons",
  },
  {
    title: "Manage Comments",
    desc: "Review community comments.",
    icon: MessageSquare,
    href: "/dashboardfile/admin/comments",
  },
  {
    title: "Admin Settings",
    desc: "Manage roles & application settings.",
    icon: Settings,
    href: "/dashboardfile/admin/settings",
  },
];

const stats = [
  {
    title: "Users",
    value: "250+",
    icon: Users,
  },
  {
    title: "Lessons",
    value: "120+",
    icon: BookOpen,
  },
  {
    title: "Comments",
    value: "980+",
    icon: MessageSquare,
  },
  {
    title: "Admins",
    value: "3",
    icon: ShieldCheck,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
    },
  }),
};

export default function AdminPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#F8F4EE] px-5 md:px-8 lg:px-12 py-10">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Admin
        </h1>

        <p className="mt-3 text-slate-600 text-lg">
          Manage your Digital Life Lessons platform efficiently.
        </p>
      </motion.div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <Icon className="text-blue-600 mb-4" size={40} />

              <h2 className="text-3xl font-bold text-slate-800">
                {item.value}
              </h2>

              <p className="text-slate-500">{item.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
            >
              <Link href={card.href}>
                <div className="bg-white rounded-3xl shadow-lg p-7 h-full border border-transparent hover:border-blue-500 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                    <Icon size={34} className="text-blue-600" />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    {card.title}
                  </h2>

                  <p className="text-slate-500 leading-7">{card.desc}</p>

                  <div className="mt-8 flex items-center text-blue-600 font-semibold gap-2">
                    Open
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 bg-white rounded-3xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <button className="bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition">
            Add Admin
          </button>

          <button className="bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition">
            View Reports
          </button>

          <button className="bg-slate-800 text-white py-4 rounded-xl hover:bg-black transition">
            Platform Settings
          </button>
        </div>
      </motion.div>
    </div>
  );
}
