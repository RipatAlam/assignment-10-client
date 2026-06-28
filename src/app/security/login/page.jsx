"use client";

import Link from "next/link";
import { BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      const user = res.data;
      const authError = res.error;

      //console.log("User:", user);
      //console.log("Auth Error:", authError);

      if (authError) {
        setError(authError.message || "Login failed. Please try again.");
        return;
      }

      alert("Login successfully!");
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-7xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-10 lg:p-16 flex flex-col justify-center text-white">
          <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm mb-6 w-fit">
            🔐 Welcome Back
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            DIGITAL <br />
            LIFE LESSONS
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            Continue your journey and access your account.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <BookOpen className="text-blue-400 w-6 h-6" />
              <div>
                <h3 className="font-semibold">Access Your Lessons</h3>
                <p className="text-gray-400 text-sm">
                  Manage your personal content.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="text-purple-400 w-6 h-6" />
              <div>
                <h3 className="font-semibold">Secure Account</h3>
                <p className="text-gray-400 text-sm">Your data is protected.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Sparkles className="text-green-400 w-6 h-6" />
              <div>
                <h3 className="font-semibold">Keep Growing</h3>
                <p className="text-gray-400 text-sm">
                  Continue learning new lessons.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-10 lg:p-16 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-gray-900">Login</h2>
            <p className="text-gray-500 mt-2">Welcome back 👋</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
                required
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-blue-600">
                  Forgot Password?
                </Link>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>

            {/* divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-3 text-sm text-gray-400">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            <button className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50 transition">
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link
                href="/security/signup"
                className="text-blue-600 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
