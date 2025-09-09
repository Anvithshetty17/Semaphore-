"use client";

import { useState } from "react";
import { useSubmit } from "@/hooks/useSubmit";
import { toast } from "react-toastify";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const { submitData: sendReset, isLoading } = useSubmit();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      const { data } = await sendReset(
        `${process.env.NEXT_PUBLIC_URL}/web/api/users/v1/SendPasswordResetLinkByEmail`,
        { email }
      );
      if (data) {
        toast.success(data || "If an account exists, a reset link has been sent.");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? "Failed to send reset link");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <Image src="/images/change-password-bg.jpg" alt="Background" fill className="absolute z-0 opacity-50 object-cover" priority/>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold text-center mb-2 font-dosisBold text-white">Forgot Password</h2>
        <p className="text-center text-sm text-gray-300 mb-4">Enter your registered email to receive a password reset link.</p>
        <label className="text-white text-sm" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md px-3 py-2 bg-white/90 text-black placeholder-gray-600 focus:outline-none"
        />
        <button type="submit" disabled={isLoading} className="mt-2 w-full bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}