"use client";

import Link from "next/link";
import { Send } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#07111F] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl">
                <div className="bg-[#2563eb] rounded-full p-[2px] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <Image
                    src="/Images/Banner05.jpg"
                    alt="LifeLore Logo"
                    className="rounded-full object-cover w-14 h-14"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Digital Life Lessons</h2>

                <p className="text-gray-400 text-sm">Learn • Share • Grow</p>
              </div>
            </div>

            <p className="mt-6 text-gray-400 leading-8 max-w-sm">
              A community where people share real-life experiences, learn
              valuable lessons, and inspire others through meaningful stories.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Explore</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/lessons">Public Lessons</Link>
              </li>

              <li>
                <Link href="/add-lesson">Add Lesson</Link>
              </li>

              <li>
                <Link href="/my-lessons">My Lessons</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Categories</h3>

            <ul className="space-y-3 text-gray-400">
              <li>Career</li>
              <li>Health</li>
              <li>Finance</li>
              <li>Relationships</li>
              <li>Education</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold">Stay Inspired</h3>

              <p className="text-gray-400 mt-3 text-sm leading-7">
                Get weekly life lessons and inspiring stories delivered straight
                to your inbox.
              </p>

              <div className="flex mt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-l-xl outline-none"
                />

                <button className="bg-blue-600 hover:bg-blue-700 px-5 rounded-r-xl transition">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 Digital Life Lessons. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Built with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
