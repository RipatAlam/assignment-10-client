"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, BookOpen } from "lucide-react";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    <header className="w-full relative z-50">
      <div className="max-w-7xl mx-auto border-b border-[#0d1728] bg-[#07111f] shadow-lg">
        <div className="flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-[#2563eb] rounded-full p-[2px] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                <Image
                  src="/Images/Banner05.jpg"
                  alt="LifeLore Logo"
                  className="rounded-full object-cover w-14 h-14"
                  width={40}
                  height={40}
                />
              </div>
              <div className="leading-tight font-serif">
                <h1 className="text-3xl  font-extrabold tracking-wide text-white">
                  Digital <span className="text-[#2563eb]">Life Lessons</span>
                </h1>

                <p className="text-xs text-slate-400 tracking-[0.35em] uppercase mt-1">
                  Learn • Share • Grow
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-8 text-sm font-medium"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="text-slate-300 font-serif hover:text-[#2563eb] transition-colors duration-300"
              >
                Home
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/dashboard/public-lessons"
                className="text-slate-300 font-serif hover:text-[#2563eb] transition-colors duration-300"
              >
                Public Lessons
              </Link>
            </motion.div>

            {/* ✅ ONLY WHEN LOGGED IN */}
            {isLoggedIn && (
              <>
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/dashboard/add-lesson"
                    className="text-slate-300 font-serif hover:text-[#2563eb] transition-colors duration-300 flex items-center gap-2"
                  >
                    Add Lesson
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/dashboard/my-lessons"
                    className="text-slate-300 font-serif hover:text-[#2563eb] transition-colors duration-300"
                  >
                    My Lessons
                  </Link>
                </motion.div>
              </>
            )}

            {isLoggedIn && plan === "free" && (
              <Link
                href="/dashboard/pricing-upgrade"
                className="text-[#2563eb] font-semibold font-serif hover:text-blue-400 transition-colors"
              >
                Pricing / Upgrade
              </Link>
            )}

            {/* AUTH */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/security/login"
                    className="text-slate-300 font-serif hover:text-[#2563eb] transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/security/signup"
                    className="bg-[#2563eb] font-serif hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/30"
                  >
                    Signup
                  </Link>
                </motion.div>
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
                    className="rounded-full border-2 border-[#2563eb]"
                  />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 mt-3 w-56 bg-[#07111f] border border-[#0d1728] rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[#0d1728] text-sm font-semibold text-white">
                        {session?.user?.name || "User"}
                      </div>

                      <Link
                        href="/dashboardfile/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-[#0d1728] hover:text-[#2563eb] transition-all duration-300 font-serif"
                      >
                        <User size={16} /> Profile
                      </Link>

                      {/* 🔥 DASHBOARD DROPDOWN */}
                      {isLoggedIn && (
                        <div>
                          <button
                            onClick={() => setDashboardOpen(!dashboardOpen)}
                            className="px-4 py-3 rounded-lg text-slate-300 hover:bg-[#0d1728] hover:text-[#2563eb] flex items-center justify-between w-full transition-all duration-300 font-serif"
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
                                className="px-3 py-2 rounded-lg text-slate-300 hover:bg-[#0d1728] hover:text-[#2563eb] text-sm transition-all font-serif"
                              >
                                👤 User
                              </Link>
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all font-serif"
                      >
                        <LogOut size={16} /> Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              ref={dropdownRef}
              onClick={closeMobile}
            >
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-0 right-0 w-72 h-full bg-[#07111f] shadow-2xl border-l border-[#0d1728] p-6 flex flex-col gap-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#0d1728] pb-4">
                  <h2 className="font-semibold font-serif text-lg text-white">Menu</h2>
                  <button
                    onClick={closeMobile}
                    className="text-slate-300 text-white hover:text-[#2563eb]"
                  >
                    <X />
                  </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3 text-sm font-medium">
                  <Link
                    onClick={closeMobile}
                    href="/"
                    className="px-3 py-2 rounded-lg text-slate-300 hover:bg-[#0d1728] hover:text-[#2563eb] transition-all duration-300 font-serif"
                  >
                    Home
                  </Link>

                  <Link
                    onClick={closeMobile}
                    href="/dashboard/public-lessons"
                    className="px-3 py-2 rounded-lg hover:bg-gray-100 font-serif"
                  >
                    Public Lessons
                  </Link>

                  {/* 🔥 DASHBOARD DROPDOWN */}
                  {isLoggedIn && (
                    <div>
                      <button
                        onClick={() => setDashboardOpen(!dashboardOpen)}
                        className="px-3 py-2 rounded-lg hover:bg-gray-100 font-serif flex items-center justify-between w-full"
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
                            className="px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-serif"
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
                        className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 font-serif"
                      >
                        <BookOpen size={16} /> Add Lesson
                      </Link>

                      <Link
                        onClick={closeMobile}
                        href="/dashboard/my-lessons"
                        className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 font-serif"
                      >
                        <LayoutDashboard size={16} /> My Lessons
                      </Link>
                    </>
                  )}

                  {isLoggedIn && plan === "free" && (
                    <Link
                      onClick={closeMobile}
                      href="/dashboard/pricing-upgrade"
                      className="px-3 py-2 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-blue-700 transition-all font-serif"
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
                        className="w-full text-center px-3 py-2 rounded-lg border border-[#0d1728] text-slate-300 hover:bg-[#0d1728] transition-all font-serif"
                      >
                        Login
                      </Link>

                      <Link
                        onClick={closeMobile}
                        href="/security/signup"
                        className="w-full text-center px-3 py-2 rounded-lg bg-[#2563eb] text-white hover:bg-blue-700 transition-all font-serif"
                      >
                        Signup
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-3 py-3 bg-[#050b18] border border-[#0d1728] rounded-xl">
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
                          <p className="text-sm font-serif font-semibold text-white">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-slate-400 font-serif">Logged in</p>
                        </div>
                      </div>

                      <Link
                        onClick={closeMobile}
                        href="/dashboardfile/profile"
                        className="px-3 py-2 rounded-lg text-slate-300 hover:bg-[#0d1728] hover:text-[#2563eb] flex items-center gap-2 transition-all font-serif"
                      >
                        <User size={16} /> Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-all font-serif"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
