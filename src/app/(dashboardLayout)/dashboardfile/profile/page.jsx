"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Shield, BookOpen, Heart, Edit3 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getPaginatedPublicLessons, getProfileStory } from "@/lib/lessonServer";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [story, setStory] = useState("");

  const [lessonCount, setLessonCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [profileComplete, setProfileComplete] = useState(0);

  //story get
  useEffect(() => {
    if (!user) return;

    const loadStory = async () => {
      const data = await getProfileStory(user.id);

      if (data.success && data.story) {
        setStory(data.story.story);
      }
    };

    loadStory();
  }, [user]);

  //Total lessons & Likes count
  useEffect(() => {
    const loadLessonStats = async () => {
      const data = await getPaginatedPublicLessons();

      if (data) {
        // Total Lessons
        if (data.totalLessons) {
          setLessonCount(data.totalLessons);
        }

        // Total Likes
        if (data.lessons) {
          const likes = data.lessons.reduce(
            (total, lesson) => total + (lesson.likes || 0),
            0,
          );

          setTotalLikes(likes);
        }
      }
    };

    loadLessonStats();
  }, []);

  //Strong er kaj
  useEffect(() => {
    if (user) {
      const fields = [
        user.name,
        user.email,
        user.image,
        user.profession,
        user.country,
        user.phone,
        user.bio,
      ];

      const completed = fields.filter(Boolean).length;

      const percentage = Math.round((completed / fields.length) * 100);

      setProfileComplete(percentage);
    }
  }, [user]);

  if (isPending) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  //Motion add
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };
  //Motion add
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Profile Card */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-[#f9f5f4] rounded-[35px] p-5 sm:p-8 shadow-lg"
      >
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Left */}

          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src={user?.image || "https://i.ibb.co/LXb1G6H/user.png"}
                alt="profile"
                width={180}
                height={180}
                priority
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <span className="mt-5 px-5 py-2 rounded-full bg-green-100 text-green-700 font-medium">
              ✅ Active User
            </span>

            <p className="text-gray-500 mt-5 text-sm">
              📍 Riyadh, Saudi Arabia
            </p>
          </div>

          {/* Right */}

          <div className="lg:col-span-3">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">
                  {user?.name}
                </h1>

                <div className="flex items-center gap-3 mt-4 text-gray-600">
                  <Mail size={18} />
                  {user?.email}
                </div>
              </div>

              {/* Buttons */}

              <Link
                href="/dashboardfile/profile/edit"
                className="bg-black text-white rounded-full px-5py-3 flex items-center justify-center gap-2 w-full sm:w-auto lg:w-35 lg:h-12 text-sm sm:text-base transition hover:bg-gray-800"
              >
                <Edit3 size={18} />
                Edit Profile
              </Link>
            </div>

            {/* Info */}

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <p className="text-gray-500">Role</p>

                <h3 className="text-3xl font-semibold">
                  {user?.role || "Member"}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Experience</p>

                <h3 className="text-3xl font-semibold">2 Years</h3>
              </div>

              <div>
                <p className="text-gray-500">Lessons Shared</p>

                <h3 className="text-3xl font-semibold">12+</h3>
              </div>
            </div>

            {/* Skills */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-10"
            >
              <h3 className="font-semibold text-lg">Favorite Categories</h3>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 mt-4"
              >
                {["Career", "Motivation", "Success", "Business", "Life"].map(
                  (item) => (
                    <motion.span
                      key={item}
                      variants={fadeUp}
                      whileHover={{
                        scale: 1.08,
                        y: -5,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="bg-white px-5 py-2 rounded-full shadow-md text-gray-700 cursor-pointer hover:shadow-xl transition"
                    >
                      ⭐ {item}
                    </motion.span>
                  ),
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-8 bg-white rounded-3xl shadow-lg p-5 sm:p-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Personal Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profession */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Profession
            </label>

            <div className="bg-gray-50 rounded-xl p-4 font-medium">
              {user?.profession || "Not Added"}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Country
            </label>

            <div className="bg-gray-50 rounded-xl p-4 font-medium">
              {user?.country || "Not Added"}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Phone
            </label>

            <div className="bg-gray-50 rounded-xl p-4 font-medium">
              {user?.phone || "Not Added"}
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Bio
            </label>

            <div className="bg-gray-50 rounded-xl p-4 leading-7">
              {user?.bio || "Not Added"}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Story Section */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid lg:grid-cols-4 gap-6 lg:gap-10 mt-12"
      >
        {/* Left */}

        <div>
          <h2 className="text-5xl font-bold text-gray-900">My Story</h2>

          <p className="mt-5 text-gray-500 leading-8">
            Share your journey and inspire others through your life experiences.
          </p>
        </div>

        {/* Right */}

        <div className="lg:col-span-3 min-w-0">
          {/* Story */}
          <div className="mt-8 bg-white rounded-3xl shadow-lg p-5 sm:p-8 border border-gray-100 w-full min-w-0">
            <h2 className="text-2xl font-bold mb-6">My Story</h2>

            <p className="text-gray-700 leading-8 whitespace-pre-line break-all w-full">
              {story || "No story added yet."}
            </p>
          </div>

          {/* Stats */}

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300"
            >
              <BookOpen className="text-blue-600 mb-4" size={35} />

              <h3 className="text-4xl font-bold">{lessonCount}</h3>

              <p className="text-gray-500 mt-2">Lessons Shared</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300"
            >
              <Heart className="text-red-500 mb-4" size={35} />

              <h3 className="text-4xl font-bold">{totalLikes}</h3>

              <p className="text-gray-500 mt-2">Total Likes</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300"
            >
              <Shield className="text-green-600 mb-4" size={35} />

              <h3 className="text-4xl font-bold">{profileComplete}%</h3>

              <p className="text-gray-500 mt-2">Profile Completed</p>
            </motion.div>
          </motion.div>

          {/* Recent Activity */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-md p-5 sm:p-8 mt-10"
          >
            <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <BookOpen className="text-blue-600" size={20} />
                </div>

                <div>
                  <h4 className="font-semibold">Published a new lesson</h4>

                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Heart className="text-red-500" size={20} />
                </div>

                <div>
                  <h4 className="font-semibold">Received 25 new likes</h4>

                  <p className="text-gray-500 text-sm">Yesterday</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="text-green-600" size={20} />
                </div>

                <div>
                  <h4 className="font-semibold">Updated profile information</h4>

                  <p className="text-gray-500 text-sm">3 days ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
