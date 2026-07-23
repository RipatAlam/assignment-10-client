"use client";

import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import {
  BookOpen,
  Heart,
  MessageCircle,
  Eye,
  User,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function OverviewPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const categoryData = [
    { name: "Career", value: 4, color: "#6366F1" },
    { name: "Business", value: 3, color: "#3B82F6" },
    { name: "Education", value: 2, color: "#10B981" },
    { name: "Motivation", value: 2, color: "#F59E0B" },
    { name: "Others", value: 1, color: "#EC4899" },
  ];

  const stats = [
    {
      title: "Lessons",
      value: "12",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Likes",
      value: "420",
      icon: Heart,
      color: "text-pink-500",
    },
    {
      title: "Comments",
      value: "58",
      icon: MessageCircle,
      color: "text-green-500",
    },
    {
      title: "Views",
      value: "2.5K",
      icon: Eye,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F4EE] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#2563eb] to-blue-500 rounded-3xl p-8 text-white shadow-xl"
        >
          <h1 className="text-3xl font-bold">Welcome Back, {user?.name}</h1>

          <p className="mt-2 text-blue-100">
            Manage your lessons, profile and activities from your dashboard.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500">{item.title}</p>

                    <h2 className={`text-3xl font-bold mt-2 ${item.color}`}>
                      {item.value}
                    </h2>
                  </div>

                  <Icon className={`${item.color}`} size={35} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lessons by Category */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Lessons by Category</h2>

              <span className="text-sm text-blue-600 cursor-pointer">
                View All
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-56 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 w-full">
                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span>{item.name}</span>
                    </div>

                    <span className="font-semibold text-gray-600">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Placeholder */}
          <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center justify-center">
            <h2 className="text-gray-400 text-xl">Top Performing Lessons</h2>
          </div>
        </div>

        {/* User + Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-5">User Information</h2>

            <div className="flex items-center gap-5">
              <Image
                src={user?.image || "https://i.pravatar.cc/150"}
                alt="user"
                width={80}
                height={80}
                className="rounded-full border-4 border-[#2563eb]"
              />

              <div>
                <h3 className="font-bold text-xl">{user?.name}</h3>

                <p className="text-gray-500">{user?.email}</p>

                <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-5">Quick Actions</h2>

            <div className="space-y-4">
              <Link
                href="/dashboard/add-lesson"
                className="flex justify-between items-center bg-blue-50 hover:bg-[#2563eb] hover:text-white transition rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <PlusCircle />
                  Add Lesson
                </div>

                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard/my-lessons"
                className="flex justify-between items-center bg-blue-50 hover:bg-[#2563eb] hover:text-white transition rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <BookOpen />
                  My Lessons
                </div>

                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboardfile/profile"
                className="flex justify-between items-center bg-blue-50 hover:bg-[#2563eb] hover:text-white transition rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <User />
                  Profile
                </div>

                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-5">Recent Activity</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span>📚 New lesson published</span>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>❤️ Someone liked your lesson</span>
              <span className="text-gray-500 text-sm">Yesterday</span>
            </div>

            <div className="flex justify-between">
              <span>💬 New comment received</span>
              <span className="text-gray-500 text-sm">3 days ago</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
