"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { User, Mail, Shield, Edit3, Save, Key, ImagePlus } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const role = user?.role;
  const id = user?._id || user?.id;

  //console.log("role information", role, "user information", user);

  const [isEditing, setIsEditing] = useState(false);

  // states (start empty, then sync with user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  // sync session → state
  useEffect(() => {
  if (user) {
    setName(user.name || "");
    setEmail(user.email || "");
    setImage(user.image || "");
  }
}, [user]);

  if (isPending) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/dashboardfile/profile/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            image,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Profile updated successfully!");

        setIsEditing(false);
        setPassword("");

        window.location.reload();
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <User size={20} /> My Profile
        </h1>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <Edit3 size={16} />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="mt-6 bg-white rounded-xl shadow p-6 flex flex-col gap-6">

        {/* IMAGE */}
        <div className="flex items-center gap-4">
          <Image
            src={image || "https://i.pravatar.cc/150"}
            alt="profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />

          <div>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Shield size={14} /> {role || "user"}
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="grid gap-4">

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <ImagePlus size={14} /> Profile Image URL
            </label>

            {isEditing ? (
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium break-all">{image}</p>
            )}
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-500">Name</label>

            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <Mail size={14} /> Email
            </label>

            {isEditing ? (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-medium">{email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <Key size={14} /> Password
            </label>

            {isEditing ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-400">••••••••</p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-500">Role</label>
            <p className="font-medium capitalize">{role}</p>
          </div>

        </div>

        {/* SAVE BUTTON */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
          >
            <Save size={16} /> Save Changes
          </button>
        )}

      </div>
    </div>
  );
}