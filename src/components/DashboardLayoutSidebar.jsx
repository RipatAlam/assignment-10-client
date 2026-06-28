"use client";

import React from "react";
import Link from "next/link";
import {
  UserCircle,
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DashboardLayoutSidebar = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) return null;

  const user = session?.user;
  const role = user?.role?.toLowerCase();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-5 flex flex-col gap-3">
        {/* PROFILE CARD */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Image
            src={user?.image || "https://i.pravatar.cc/150"}
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div>
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
        </div>

        {/* PROFILE */}
        <Link
          href="/dashboardfile/profile"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <UserCircle size={18} />
          Profile
        </Link>

        {/* OVERVIEW */}
        <Link
          href="/dashboardfile/overview"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <LayoutDashboard size={18} />
          Overview
        </Link>

        {/* MY LESSONS (ALL USERS) */}
        <Link
          href="/dashboardfile/my-lessons"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <BookOpen size={18} />
          My Lessons
        </Link>

        {/* ADD LESSON (moderator + admin) */}
        {(role === "moderator" || role === "admin") && (
          <Link
            href="/dashboardfile/add-lesson"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <PlusCircle size={18} />
            Add Lesson
          </Link>
        )}

        {/* MANAGE LESSONS (admin only) */}
        {role === "admin" && (
          <Link
            href="/dashboardfile/manage-lessons"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <Settings size={18} />
            Manage Lessons
          </Link>
        )}

        {/* LOGOUT */}
        <div className="flex flex-col mt-auto">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60 transition"
          >
            <Home size={18} /> Back to Home
          </Link>
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default DashboardLayoutSidebar;
