"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, BookOpen } from "lucide-react";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar({ user, plan = "free" }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // FIX: real auth state (NO FAKE STATE)
  const { data: session, isPending } = useSession();
  if (isPending) {
    return null;
  }
  const isLoggedIn = session?.user?.role;
  //console.log("Session:", session, "isPending:", isPending);

  // FIX: LogOut
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header className="w-full border-b bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl transition-transform group-hover:scale-110">
            <Image
              src="/Images/Banner05.jpg"
              alt="Digital Life Lessons Logo"
              className="rounded-full object-cover w-9 h-9"
              width={40}
              height={40}
            />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              DIGITAL LIFE LESSONS
            </span>
            <p className="text-[10px] text-gray-400 -mt-1 tracking-widest">
              WISDOM PRESERVED
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link
            href="/dashboard/public-lessons"
            className="hover:text-blue-600"
          >
            Public Lessons
          </Link>

          {/* ✅ ONLY WHEN LOGGED IN */}
          {isLoggedIn && (
            <>
              <Link
                href="/dashboard/add-lesson"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                Add Lesson
              </Link>

              <Link
                href="/dashboard/my-lessons"
                className="hover:text-blue-600"
              >
                My Lessons
              </Link>
            </>
          )}

          {isLoggedIn && plan === "free" && (
            <Link
              href="/pricing"
              className="text-orange-500 font-semibold hover:text-orange-600"
            >
              Pricing / Upgrade
            </Link>
          )}

          {/* AUTH */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/security/login">Login</Link>
              <Link
                href="/security/signup"
                className="bg-gray-900 text-white px-3 py-1 rounded-md"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2"
              >
                <Image
                  src={
                    session?.user?.image?.trim()
                      ? session.user.image
                      : "https://i.pravatar.cc/40"
                  }
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full border"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-2 border-b text-sm font-semibold">
                    {session?.user?.name || "User"}
                  </div>

                  <Link
                    href="dashboardfile/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <User size={16} /> Profile
                  </Link>

                  {/* 🔥 DASHBOARD DROPDOWN */}
                  {isLoggedIn && (
                    <div>
                      <button
                        onClick={() => setDashboardOpen(!dashboardOpen)}
                        className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between w-full"
                      >
                        <span className="flex items-center gap-2">
                          <LayoutDashboard size={16} /> Dashboard
                        </span>

                        <span>{dashboardOpen ? "▲" : "▼"}</span>
                      </button>

                      {dashboardOpen && (
                        <div className="ml-4 flex flex-col gap-2 border-l pl-3">
                          <Link
                            onClick={closeMobile}
                            href="/dashboardfile/user"
                            className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
                          >
                            👤 User
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          ref={dropdownRef}
          onClick={closeMobile}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 right-0 w-72 h-full bg-white shadow-xl p-5 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button onClick={closeMobile}>
                <X />
              </button>
            </div>

            {/* Links */}
            {/* Links */}
            <div className="flex flex-col gap-3 text-sm font-medium">
              <Link
                onClick={closeMobile}
                href="/"
                className="px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Home
              </Link>

              <Link
                onClick={closeMobile}
                href="/dashboard/public-lessons"
                className="px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Public Lessons
              </Link>

              {/* 🔥 DASHBOARD DROPDOWN */}
              {isLoggedIn && (
                <div>
                  <button
                    onClick={() => setDashboardOpen(!dashboardOpen)}
                    className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between w-full"
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard size={16} /> Dashboard
                    </span>

                    <span>{dashboardOpen ? "▲" : "▼"}</span>
                  </button>

                  {dashboardOpen && (
                    <div className="ml-4 flex flex-col gap-2 border-l pl-3">
                      <Link
                        onClick={closeMobile}
                        href="/dashboardfile/user"
                        className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        👤 User
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {isLoggedIn && (
                <>
                  <Link
                    onClick={closeMobile}
                    href="/dashboard/add-lesson"
                    className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                  >
                    <BookOpen size={16} /> Add Lesson
                  </Link>

                  <Link
                    onClick={closeMobile}
                    href="/dashboard/my-lessons"
                    className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} /> My Lessons
                  </Link>
                </>
              )}

              {isLoggedIn && plan === "free" && (
                <Link
                  onClick={closeMobile}
                  href="/pricing"
                  className="px-3 py-2 rounded-lg bg-orange-50 text-orange-600 font-semibold"
                >
                  ⚡ Pricing / Upgrade
                </Link>
              )}
            </div>

            {/* Bottom */}
            <div className="mt-auto border-t pt-4">
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    onClick={closeMobile}
                    href="/security/login"
                    className="w-full text-center px-3 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link
                    onClick={closeMobile}
                    href="/security/signup"
                    className="w-full text-center px-3 py-2 rounded-lg bg-gray-900 text-white"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <Image
                      src={
                        session?.user?.image?.trim()
                          ? session.user.image
                          : "https://i.pravatar.cc/40"
                      }
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500">Logged in</p>
                    </div>
                  </div>

                  <Link
                    onClick={closeMobile}
                    href="/profile"
                    className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                  >
                    <User size={16} /> Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
