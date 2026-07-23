"use client";

import Link from "next/link";
import { BookOpen, Lightbulb, Users } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [receiveLessonUpdates, setReceiveLessonUpdates] = useState(true);
  const [receiveNewsletter, setReceiveNewsletter] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const imageFile = data.image[0];
      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        setError("Image upload failed");
        setLoading(false);
        return;
      }

      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const { data: user, error: authError } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl,
        role: data.role,

        profession: data.profession,
        country: data.country,
        phone: data.phone,
        bio: data.bio,

        receiveLessonUpdates: data.receiveLessonUpdates,
        receiveNewsletter: data.receiveNewsletter,
      });

      if (authError) {
        setError(authError.message || "Sign up failed. Please try again.");
        return;
      }

      //console.log(user);

      alert("Account created successfully!");
      router.push("/security/login");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    //console.log("data", data);
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-7xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-10 lg:p-16 flex flex-col justify-center text-white">
          <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm mb-6 w-fit">
            ✨ Welcome to Digital Life Lessons
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            DIGITAL
            <br />
            LIFE LESSONS
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            A place where experiences become wisdom. Share your life lessons,
            inspire others, and preserve valuable knowledge for future
            generations.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Preserve Wisdom</h3>

                <p className="text-gray-400 text-sm">
                  Keep valuable life experiences organized forever.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <Lightbulb className="w-6 h-6 text-purple-400" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Learn From Experience</h3>

                <p className="text-gray-400 text-sm">
                  Discover real-life insights shared by others.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Inspire Others</h3>

                <p className="text-gray-400 text-sm">
                  Your journey can motivate people around the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-10 lg:p-16 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-gray-900">Create Account</h2>

            <p className="text-gray-500 mt-2">Start your journey today.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  {...register("profession")}
                  placeholder="Profession"
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  {...register("country")}
                  placeholder="Country"
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div className="mt-4">
                <input
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div className="mt-4">
                <textarea
                  {...register("bio")}
                  rows={3}
                  placeholder="Short Bio"
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">
                Security
              </h3>
              <input
                {...register("password", {
                  required: "Password is required",

                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },

                  maxLength: {
                    value: 12,
                    message: "Password must be at most 12 characters",
                  },

                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                    message:
                      "Password must contain uppercase, lowercase and a number",
                  },
                })}
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value, formValues) =>
                    value === formValues.password || "Passwords do not match",
                })}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/* Profile Image URL */}
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">
                Profile Picture
              </h3>
              <input
                {...register("image", {
                  required: "Profile image is required",
                })}
                type="file"
                accept="image/*"
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              />

              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <h3 className="font-semibold text-gray-800">
                  Community Preferences
                </h3>

                <div className="space-y-4 mt-6">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={receiveLessonUpdates}
                      onChange={(e) =>
                        setReceiveLessonUpdates(e.target.checked)
                      }
                    />
                    Receive lesson updates
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={receiveNewsletter}
                      onChange={(e) => setReceiveNewsletter(e.target.checked)}
                    />
                    Receive newsletters
                  </label>
                </div>
              </div>

              {/* Account Type */}
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-6">
                Account Type
              </h3>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-3 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register("role")}
                    type="radio"
                    value="user"
                    defaultChecked
                    className="w-4 h-4"
                  />

                  <div>
                    <h4 className="font-semibold text-gray-800">User</h4>

                    <p className="text-sm text-gray-500">
                      Share lessons, read stories and join the community.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register("role")}
                    type="radio"
                    value="admin"
                    className="w-4 h-4"
                  />

                  <div>
                    <h4 className="font-semibold text-gray-800">Admin</h4>

                    <p className="text-sm text-gray-500">
                      Manage users, lessons and website content.
                    </p>
                  </div>
                </label>
              </div>
              {/* ✅ NEW: Role selection */}

              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" required className="mt-1" />

                <label htmlFor="terms" className="text-sm text-gray-600">
                  I have read and accept the{" "}
                  <Link href="/terms" className="text-blue-600 font-medium">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-black disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-3 text-sm text-gray-400">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                href="/security/login"
                className="text-blue-600 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
