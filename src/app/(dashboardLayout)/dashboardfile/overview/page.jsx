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
import { useEffect, useState } from "react";
import { getPaginatedPublicLessons } from "@/lib/lessonServer";

export default function OverviewPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [lessonCount, setLessonCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [topLessons, setTopLessons] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const chartColors = [
    "#6366F1",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#8B5CF6",
  ];

  //Total lessons & Likes count
  useEffect(() => {
    const loadLessonStats = async () => {
      const data = await getPaginatedPublicLessons();

      console.log(data, "ViewSection");

      if (data?.lessons) {
        // Total Lessons
        setLessonCount(data.totalLessons);

        // Total Likes
        const likes = data.lessons.reduce(
          (total, lesson) => total + (lesson.likes || 0),
          0,
        );

        setTotalLikes(likes);

        // Total Comments
        const comments = data.lessons.reduce(
          (total, lesson) => total + (lesson.comments || 0),
          0,
        );

        setCommentCount(comments);

        // Total Views
        const views = data.lessons.reduce(
          (total, lesson) => total + (lesson.views || 0),
          0,
        );

        setTotalViews(views);

        // Lessons By Category
        const categories = {};

        data.lessons.forEach((lesson) => {
          const category = lesson.category || "Others";

          categories[category] = (categories[category] || 0) + 1;
        });

        const categoryArray = Object.keys(categories).map((item) => ({
          name: item,
          value: categories[item],
        }));

        setCategoryData(categoryArray);

        // Top Performing Lessons (Most Viewed)
        const top = [...data.lessons]
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 3);

        setTopLessons(top);
      }
    };

    loadLessonStats();
  }, []);

  const stats = [
    {
      title: "Lessons",
      value: lessonCount,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: Heart,
      color: "text-pink-500",
    },
    {
      title: "Comments",
      value: commentCount,
      icon: MessageCircle,
      color: "text-green-500",
    },
    {
      title: "Views",
      value: totalViews,
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
          {showAllCategories && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold">All Categories</h2>

                  <button onClick={() => setShowAllCategories(false)}>✕</button>
                </div>

                {categoryData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 bg-gray-50 rounded-xl mb-3"
                  >
                    <span>{item.name}</span>

                    <span>{item.value} Lessons</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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

              <button
                onClick={() => setShowAllCategories(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Chart */}
              <div className="w-56 h-56">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={5}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={chartColors[index % chartColors.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value, name) => [`${value} Lessons`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Data
                  </div>
                )}
              </div>

              {/* Category List */}
              <div className="space-y-4 w-full">
                {categoryData.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            chartColors[index % chartColors.length],
                        }}
                      />

                      <span className="font-medium">{item.name}</span>
                    </div>

                    <span className="font-semibold text-gray-600">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top Performing Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6">Top Performing Lessons</h2>

            <div className="space-y-5">
              {topLessons.length > 0 ? (
                topLessons.map((lesson, index) => (
                  <div
                    key={lesson._id}
                    className="flex items-center gap-4 border-b pb-4 last:border-none"
                  >
                    {/* Image */}
                    <Image
                      src={lesson.image}
                      alt={lesson.title}
                      width={70}
                      height={70}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-1">
                        {index + 1}. {lesson.title}
                      </h3>

                      <p className="text-sm text-gray-500">{lesson.category}</p>

                      {/* Like Comment View */}
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart size={15} className="text-pink-500" />
                          <span>{lesson.likes || 0}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <MessageCircle size={15} className="text-green-500" />
                          <span>{lesson.comments || 0}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Eye size={15} className="text-orange-500" />
                          <span>{lesson.views || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rank */}
                    <div className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">
                  No top lessons found
                </p>
              )}
            </div>
          </motion.div>
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
