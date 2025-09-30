"use client";

import UpdatePassword from "@/app/_components/form/UpdatePassword";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, LayoutDashboard } from "lucide-react"; // icons
import React from "react";

const UpdateUserPasswordPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-first via-first/80 to-first/60 px-4">
      {/* translucent card */}
      <div className="w-full max-w-md backdrop-blur-md bg-white/90 rounded-2xl shadow-xl border border-white/40 p-2 sm:p-6">
        {/* top nav actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push(ROUTES.HOME)}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-white text-first font-medium hover:bg-gray-100 transition"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={() => router.push(ROUTES.USER_DASHBOARD)}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-first text-white font-medium hover:bg-first/90 transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Update Password
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          For your security, please enter a new password below.
        </p>

        {/* the actual form */}
        <UpdatePassword />

        {/* back button at bottom */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 cursor-pointer text-first hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPasswordPage;
