"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-15">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl">
              <Image
                src="/Images/Banner05.jpg"
                alt="Digital Life Lessons Logo"
                className="rounded-full object-cover w-9 h-9"
                width={40}
                height={40}
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Digital Life Lessons
            </h2>
          </div>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Preserve your personal wisdom.
            <br />
            Share your growth journey.
            <br />
            Inspire others.
          </p>
          <p className="text-xs text-gray-400 mt-6">
            Made with <Heart className="inline text-red-500" size={14} /> for
            lifelong learners.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <Link
              href="/public-lessons"
              className="hover:text-gray-900 transition"
            >
              Public Lessons
            </Link>
            <Link
              href="/dashboard/my-lessons"
              className="hover:text-gray-900 transition"
            >
              My Lessons
            </Link>
            <Link
              href="/dashboard/add-lesson"
              className="hover:text-gray-900 transition"
            >
              Write Lesson
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <Link href="/about" className="hover:text-gray-900 transition">
              About Us
            </Link>
            <Link href="/pricing" className="hover:text-gray-900 transition">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-gray-900 transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-900 transition">
              Contact
            </Link>
          </div>
        </div>

        {/* Contact & Legal */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Get in Touch</h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <Mail size={18} className="mt-0.5" />
              <span>web@programming-hero.com</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={18} className="mt-0.5" />
              <span>+996 543 439 010</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5" />
              <span>Internet • Everywhere</span>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Legal
            </h4>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-900 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-gray-50 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Digital Life Lessons. All rights reserved.
      </div>
    </footer>
  );
}
