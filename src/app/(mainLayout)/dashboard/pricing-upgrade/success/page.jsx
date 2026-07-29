import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, LayoutDashboard, BookOpen } from "lucide-react";
import { stripe } from "@/lib/stripe";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  if (session.status === "complete") {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="flex justify-center">
            <div className="bg-green-100 p-5 rounded-full">
              <CheckCircle2 className="text-green-600" size={70} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#231815] mt-8">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 mt-5 leading-8">
            Thank you for purchasing from
            <span className="font-semibold text-blue-600">
              {" "}
              Digital Life Lessons
            </span>
            .
            <br />
            Your payment has been successfully completed.
          </p>

          <div className="mt-8 bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="text-gray-500 text-sm">Confirmation Email</p>

            <p className="font-bold text-lg text-blue-700 mt-2">
              {session.customer_details?.email}
            </p>
          </div>

          <div className="mt-10 bg-green-50 rounded-2xl p-5 border border-green-200">
            <p className="text-green-700 font-medium">
              ✅ Your purchase has been activated successfully.
            </p>

            <p className="text-gray-600 mt-2 text-sm">
              You can now enjoy your premium content and continue learning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            <Link href="/dashboardfile/overview">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                <LayoutDashboard size={18} />
                Go to Dashboard
              </button>
            </Link>

            <Link href="/dashboard/public-lessons">
              <button className="w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition">
                <BookOpen size={18} />
                Browse Lessons
              </button>
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-10">
            Need help? Contact us anytime.
          </p>
        </div>
      </section>
    );
  }
}
