"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, BookOpen } from "lucide-react";
import { addPublicLesson } from "@/lib/lessonServer";
import { uploadImage } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function AddLessonPage() {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Career");

  const [story, setStory] = useState("");
  const [lesson, setLesson] = useState("");
  const [summary, setSummary] = useState("");

  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");

  const [tags, setTags] = useState("");
  const [readingTime, setReadingTime] = useState("");

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const [isPremium, setIsPremium] = useState(false);
  const [certificate, setCertificate] = useState(false);

  const router = useRouter();
  const { data } = useSession();

  const user = data?.user;
  console.log(data);
console.log(data?.user);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload image to ImgBB
      const imageUrl = await uploadImage(image);

      // 2. Create lesson object
      const lessonData = {
        title,
        category,
        story,
        lesson,
        summary,

        image: imageUrl,

        // author info
        name: user?.name || "Anonymous",
        email: user?.email || "",
        userId: user?.id || user?._id,

        profession,
        country,

        // extra info
        tags: tags.split(",").map((tag) => tag.trim()),
        readingTime,

        // pricing
        price,
        currency: "USD",
        discount,
        finalPrice: price - (price * discount) / 100,

        isPremium,
        plan: isPremium ? "Premium" : "Free",
        access: "Lifetime",
        certificate,

        // stats
        likes: 0,
        comments: 0,
        views: 0,
        shares: 0,
        bookmarks: 0,
        rating: 0,

        featured: false,
        status: "published",

        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 3. Save to MongoDB
      const result = await addPublicLesson(lessonData);

      console.log(result);
      alert("Lesson added successfully!");
      router.push("/dashboard/public-lessons");
    } catch (error) {
      console.error(error);
      alert("Failed to add lesson");
    }
  };

  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
            <BookOpen size={18} />
            Share Your Experience
          </div>

          <h1 className="text-5xl font-bold mt-5 text-[#231815]">
            Add New Lesson
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Share your real-life story and inspire thousands of people with the
            lesson you learned.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-7"
        >
          {/* Lesson Title */}
          <div>
            <label className="font-semibold block mb-2">Lesson Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Biggest Career Mistake I Made at 25"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold block mb-2">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Career</option>
              <option>Health</option>
              <option>Finance</option>
              <option>Business</option>
              <option>Education</option>
              <option>Relationships</option>
              <option>Mindset</option>
              <option>Family</option>
            </select>
          </div>
          {/* Summary */}
          <div>
            <label className="font-semibold block mb-2">Short Summary</label>

            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Short description of your lesson..."
              className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="font-semibold block mb-3">Cover Image</label>

            <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer flex justify-center items-center flex-col hover:border-blue-500 transition">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={700}
                  height={400}
                  className="rounded-xl object-cover max-h-80"
                />
              ) : (
                <>
                  <UploadCloud size={45} className="text-blue-600" />

                  <p className="mt-4 font-semibold">Upload Lesson Cover</p>

                  <span className="text-gray-500 text-sm mt-2">
                    PNG, JPG or WEBP
                  </span>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImagePreview}
              />
            </label>
          </div>

          {/* Author Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">Profession</label>

              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Software Engineer"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Country</label>

              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* Story */}
          <div>
            <label className="font-semibold block mb-2">Your Story</label>

            <textarea
              rows={8}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell your complete story..."
              className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Lesson */}
          <div>
            <label className="font-semibold block mb-2">Lesson Learned</label>

            <textarea
              rows={4}
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              placeholder="What lesson did you learn from this experience?"
              className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Tags */}
          <div>
            <label className="font-semibold block mb-2">Tags</label>

            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Career, Success, Growth"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="font-semibold block mb-2">Price</label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="24.99"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Discount %</label>

              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="20"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Reading Time</label>

              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="5 min read"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
              />
              Premium
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={certificate}
                onChange={(e) => setCertificate(e.target.checked)}
              />
              Certificate
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold text-lg"
          >
            Publish Lesson
          </button>
        </form>
      </div>
    </section>
  );
}
