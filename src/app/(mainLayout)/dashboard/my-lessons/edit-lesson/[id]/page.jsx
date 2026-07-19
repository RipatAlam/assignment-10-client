"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, UploadCloud } from "lucide-react";

import { getPublicLessonsId, updatePublicLesson } from "@/lib/lessonServer";
import { uploadImage } from "@/lib/uploadImage";

export default function EditLessonPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Career");
  const [story, setStory] = useState("");
  const [lesson, setLesson] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const data = await getPublicLessonsId(id);

        setTitle(data.title);
        setCategory(data.category);
        setStory(data.story);
        setLesson(data.lesson);

        setImage(data.image);
        setPreview(data.image);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadLesson();
    }
  }, [id]);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = image;

    try {
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const lessonData = {
        title,
        category,
        image: imageUrl,
        story,
        lesson,
      };
      console.log(id);
      console.log(lessonData);
      await updatePublicLesson(id, lessonData);

      alert("Lesson Updated Successfully!");

      router.push("/dashboard/my-lessons");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto w-full overflow-hidden">
      <div className="bg-[#F8F4EE] py-20 px-6 sm:px-8 md:px-10 lg:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
            <BookOpen size={18} />
            Edit Your Lesson
          </div>

          <h1 className="text-5xl font-bold mt-5 text-[#231815]">
            Update Lesson
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Modify your lesson and save the latest changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-7"
        >
          <div>
            <label className="font-semibold block mb-2">Lesson Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          <div>
            <label className="font-semibold block mb-2">Your Story</label>

            <textarea
              rows={8}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Lesson Learned</label>

            <textarea
              rows={4}
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-xl font-semibold text-lg"
          >
            Update Lesson
          </button>
        </form>
      </div>
    </section>
  );
}
