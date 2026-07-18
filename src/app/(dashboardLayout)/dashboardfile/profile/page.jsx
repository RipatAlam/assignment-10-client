"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Shield,
  Edit3,
  Save,
  Lock,
  BookOpen,
  Heart,
  Camera,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { updateProfile } from "@/lib/lessonServer";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("story");
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setImage(user.image || "");
    }
  }, [user]);

  if (isPending) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  const handleSave = async () => {
    try {
      const data = await updateProfile(user.id || user._id, {
        name,
        email,
        image,
        password,
      });

      if (data.success) {
        alert("Profile Updated Successfully");
        setIsEdit(false);
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Profile Card */}

      <div className="bg-[#f9f5f4] rounded-[35px] p-8 shadow-lg">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Left */}

          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src={image || "https://i.ibb.co/LXb1G6H/user.png"}
                alt="profile"
                width={180}
                height={180}
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />

              {isEdit && (
                <button className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full">
                  <Camera size={18} />
                </button>
              )}
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
                {isEdit ? (
                  <input
                    className="text-5xl font-bold bg-transparent border-b-2 outline-none w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <h1 className="text-5xl font-bold">{name}</h1>
                )}

                <div className="flex items-center gap-3 mt-4 text-gray-600">
                  <Mail size={18} />

                  {isEdit ? (
                    <input
                      className="border rounded-lg px-3 py-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    email
                  )}
                </div>
              </div>

              {/* Buttons */}

              <div className="flex gap-3 flex-wrap h-fit">
                {!isEdit ? (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-black text-white rounded-full px-6 py-3 flex items-center gap-2"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white rounded-full px-6 py-3 flex items-center gap-2"
                    >
                      <Save size={18} />
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setIsEdit(false);
                        setPassword("");
                      }}
                      className="bg-red-500 text-white rounded-full px-6 py-3"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
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

            <div className="mt-10">
              <h3 className="font-semibold text-lg">Favorite Categories</h3>

              <div className="flex flex-wrap gap-3 mt-4">
                {["Career", "Motivation", "Success", "Business", "Life"].map(
                  (item) => (
                    <span
                      key={item}
                      className="bg-white px-5 py-2 rounded-full shadow text-gray-700"
                    >
                      ⭐ {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}

      <div className="grid lg:grid-cols-4 gap-10 mt-12">
        {/* Left */}

        <div>
          <h2 className="text-5xl font-bold text-gray-900">My Story</h2>

          <p className="mt-5 text-gray-500 leading-8">
            Share your journey and inspire others through your life experiences.
          </p>
        </div>

        {/* Right */}

        <div className="lg:col-span-3">
          {/* Tabs */}

          <div className="flex gap-8 border-b pb-4 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("story")}
              className={`pb-2 ${
                activeTab === "story"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              My Story
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`pb-2 ${
                activeTab === "skills"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              Skills
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`pb-2 ${
                activeTab === "projects"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              Projects
            </button>

            <button
              onClick={() => setActiveTab("experience")}
              className={`pb-2 ${
                activeTab === "experience"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              Experience
            </button>
          </div>

          {/* Story */}

          <div className="mt-8 space-y-6 text-gray-700 leading-9 text-lg">
            <p>
              Every experience teaches something valuable. Through LifeLore I
              share meaningful life lessons so that others can learn from both
              my successes and failures.
            </p>

            <p>
              My goal is to inspire people by documenting real experiences,
              preserving knowledge, and encouraging lifelong learning.
            </p>

            <p>
              Whether it's career growth, relationships, personal development,
              or overcoming challenges, every lesson has the power to change
              someone's life.
            </p>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">
              <BookOpen className="text-blue-600 mb-4" size={35} />

              <h3 className="text-4xl font-bold">12</h3>

              <p className="text-gray-500 mt-2">Lessons Shared</p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">
              <Heart className="text-red-500 mb-4" size={35} />

              <h3 className="text-4xl font-bold">254</h3>

              <p className="text-gray-500 mt-2">Total Likes</p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl duration-300">
              <Shield className="text-green-600 mb-4" size={35} />

              <h3 className="text-4xl font-bold">Strong</h3>

              <p className="text-gray-500 mt-2">Account Security</p>
            </div>
          </div>

          {/* Password */}

          {isEdit && (
            <div className="bg-white rounded-3xl shadow-md p-8 mt-10">
              <h2 className="text-2xl font-bold mb-6">Change Password</h2>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl p-4"
              />
            </div>
          )}

          {/* Recent Activity */}

          <div className="bg-white rounded-3xl shadow-md p-8 mt-10">
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
          </div>
        </div>
      </div>
    </div>
  );
}
