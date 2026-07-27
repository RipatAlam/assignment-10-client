"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-5" />

        <h1 className="text-3xl font-bold text-gray-800">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 mt-3">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-4 text-sm text-red-500 break-words">
            {error?.message}
          </p>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 border px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Home size={18} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
