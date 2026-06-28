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
    <div className="max-w-4xl mx-auto space-y-6">

      {/* PROFILE CARD */}
      <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={image || "https://i.pravatar.cc/150"}
            alt="user"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />

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
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Edit3 size={16} />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* EDIT SECTION */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">

        <h2 className="text-lg font-bold">Account Settings</h2>

        {/* Name */}
        <div>
          <label className="text-sm text-gray-500">Name</label>
          {isEditing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
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
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
          >
            <Save size={16} /> Save Changes
          </button>
        )}
      </div>

      {/* ACTIONS */}
      <div className="bg-white shadow rounded-xl p-6 space-y-3">

        <h2 className="font-bold">Account Actions</h2>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600"
        >
          <LogOut size={16} /> Logout
        </button>

      </div>
    </div>
  );
}