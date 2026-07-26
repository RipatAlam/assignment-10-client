"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, Save, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import {
  updateProfile,
  saveProfileStory,
  getProfileStory,
} from "@/lib/lessonServer";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [story, setStory] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    setName(user.name || "");
    setEmail(user.email || "");
    setImage(user.image || "");
    setProfession(user.profession || "");
    setCountry(user.country || "");
    setPhone(user.phone || "");
    setBio(user.bio || "");

    const loadStory = async () => {
      const data = await getProfileStory(user.id);

      if (data.success && data.story) {
        setStory(data.story.story);
      }
    };

    loadStory();
  }, [user]);

  const handleSave = async () => {
    const data = await updateProfile(user.id || user._id, {
      name,
      email,
      image,
      password,
      profession,
      country,
      phone,
      bio,
    });

    await saveProfileStory({
      userId: user.id,
      email: user.email,
      story,
    });

    if (data.success) {
      alert("Profile Updated Successfully");
      window.location.href = "/dashboardfile/profile";
    }

    if (data.success) {
      alert("Profile Updated Successfully");
      window.location.href = "/dashboardfile/profile";
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <Link
        href="/dashboardfile/profile"
        className="flex items-center gap-2 mb-8 text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Profile
      </Link>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-8">Edit Profile</h1>

        <div className="flex justify-center mb-10">
          <div className="relative">
            <Image
              src={image || "https://i.ibb.co/LXb1G6H/user.png"}
              alt="profile"
              width={180}
              height={180}
              className="rounded-full border-4 border-gray-200 object-cover"
            />

            <button className="absolute bottom-2 right-2 bg-black text-white rounded-full p-3">
              <Camera size={18} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label>Name</label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Profession</label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>

          <div>
            <label>Country</label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label>Profile Image URL</label>

            <input
              className="w-full border rounded-xl p-4 mt-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label>Bio</label>

            <textarea
              rows={4}
              className="w-full border rounded-xl p-4 mt-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label>My Story</label>

            <textarea
              rows={10}
              className="w-full border rounded-xl p-4 mt-2"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label>New Password</label>

            <input
              type="password"
              className="w-full border rounded-xl p-4 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <Link href="/dashboard/profile">
            <button className="px-8 py-3 rounded-xl border flex items-center gap-2">
              <X size={18} />
              Cancel
            </button>
          </Link>

          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
