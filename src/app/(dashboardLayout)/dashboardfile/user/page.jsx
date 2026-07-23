"use client";

import React, { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import Image from "next/image";
import {
  User,
  Mail,
  Shield,
  Edit3,
  Save,
  LogOut,
  ImagePlus,
  Key,
} from "lucide-react";
import { BookOpen, Heart, MessageCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardUser() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const role = (user?.role || "").toLowerCase();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  if (isPending) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  const handleSave = async () => {
    console.log("Update user:", { name, image, password });
    alert("Profile updated (backend connect required)");
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F8F4EE] py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.08, rotate: 5 }}>
              <Image
                src={image || "https://i.pravatar.cc/150"}
                alt="user"
                width={70}
                height={70}
                className="rounded-full object-cover border-[4px] border-[#2563eb] shadow-lg"
              />
            </motion.div>

            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-gray-500 flex items-center gap-1">
                <Mail size={14} /> {user.email}
              </p>
              <p className="text-sm text-gray-400 capitalize flex items-center gap-1">
                <Shield size={14} /> {role || "user"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-[#2563eb] text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            <Edit3 size={16} />
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Lessons */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="text-blue-600" size={28} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">12</h2>
            <p className="text-gray-500 mt-1">Lessons</p>
          </motion.div>

          {/* Likes */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
              <Heart className="text-pink-600" size={28} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">420</h2>
            <p className="text-gray-500 mt-1">Likes</p>
          </motion.div>

          {/* Comments */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="text-green-600" size={28} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">58</h2>
            <p className="text-gray-500 mt-1">Comments</p>
          </motion.div>

          {/* Views */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
              <Eye className="text-orange-600" size={28} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">2.5K</h2>
            <p className="text-gray-500 mt-1">Views</p>
          </motion.div>
        </div>

        {/* EDIT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-lg font-bold">Account Settings</h2>

          {/* Name */}
          <div>
            <label className="text-sm text-gray-500">Name</label>
            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2563eb] outline-none transition"
              />
            ) : (
              <p>{name}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <ImagePlus size={14} /> Profile Image
            </label>

            {isEditing ? (
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
            ) : (
              <p className="break-all">{image}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <Key size={14} /> Password
            </label>

            {isEditing ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="New password"
              />
            ) : (
              <p className="text-gray-400">••••••••</p>
            )}
          </div>

          {/* Save */}
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all"
            >
              <Save size={16} /> Save Changes
            </motion.button>
          )}
        </motion.div>

        {/* ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="font-bold">Account Actions</h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-xl hover:bg-red-100 transition"
          >
            <LogOut size={16} /> Logout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
