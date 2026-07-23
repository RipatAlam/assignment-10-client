"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserCircle,
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Settings,
  LogOut,
  Home,
  X,
  Menu,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const DashboardLayoutSidebar = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  if (isPending) return null;

  const user = session?.user;
  const role = user?.role?.toLowerCase();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-3 left-4 z-50 p-3 bg-white rounded-xl shadow-lg lg:hidden"
      >
        <Menu size={24} />
      </button>
      <div className="flex min-h-screen bg-[#F8F4EE]">
        {/* SIDEBAR */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`
fixed top-0 left-0 z-50
h-screen
w-72
bg-white
shadow-2xl
border-r
border-gray-200
p-6
flex
flex-col
transition-transform
duration-300
${isOpen ? "translate-x-0" : "-translate-x-full"}
lg:translate-x-0
`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-5 lg:hidden"
          >
            <X size={24} />
          </button>
          {/* PROFILE CARD */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#2563eb] to-blue-500 rounded-2xl text-white shadow-lg"
          >
            <Image
              src={user?.image || "https://i.pravatar.cc/150"}
              alt="user"
              width={40}
              height={40}
              className="rounded-full border-4 border-white"
            />

            <div>
              <p className="font-bold text-lg">{user?.name}</p>
              <p className="text-xs text-blue-100 uppercase">{role}</p>
            </div>
          </motion.div>

          <p className="text-xs uppercase tracking-widest text-gray-400 mt-8 mb-3">
            Navigation
          </p>

          {/* PROFILE */}
          <motion.div whileHover={{ x: 6 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboardfile/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all duration-300 font-medium"
            >
              <UserCircle size={18} />
              Profile
            </Link>
          </motion.div>

          {/* OVERVIEW */}
          <Link
            href="/dashboardfile/overview"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all duration-300 font-medium"
          >
            <LayoutDashboard size={18} />
            Overview
          </Link>

          {/* MY LESSONS (ALL USERS) */}
          <Link
            href="/dashboard/my-lessons"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all duration-300 font-medium"
          >
            <BookOpen size={18} />
            My Lessons
          </Link>

          {/* ADD LESSON (moderator + admin) */}
          {(role === "moderator" || role === "admin") && (
            <Link
              href="/dashboard/add-lesson"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all duration-300 font-medium"
            >
              <PlusCircle size={18} />
              Add Lesson
            </Link>
          )}

          {/* MANAGE LESSONS (admin only) */}
          {role === "admin" && (
            <Link
              href="/dashboardfile/admin/managelessons"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all duration-300 font-medium"
            >
              <Settings size={18} />
              Manage Lessons
            </Link>
          )}

          {/* LOGOUT */}
          <div className="flex flex-col mt-auto">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-blue-50 hover:bg-[#2563eb] hover:text-white transition-all duration-300"
            >
              <Home size={18} /> Back to Home
            </Link>
            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all duration-300"
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </motion.aside>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </div>
    </>
  );
};

export default DashboardLayoutSidebar;
