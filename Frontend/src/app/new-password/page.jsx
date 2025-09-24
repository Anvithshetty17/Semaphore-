"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useSubmit } from "@/hooks/useSubmit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NewPasswordPage = () => (
  <Suspense>
    <NewPasswordForm />
  </Suspense>
);

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId");
  const { submitData: resetPassword, isLoading } = useSubmit();
  const [input, setInput] = useState({ newPassword: "", confirmPassword: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Invalid or missing link");
      return;
    }
    if (!input.newPassword || !input.confirmPassword) {
      toast.error("Please fill both fields");
      return;
    }
    if (input.newPassword !== input.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await resetPassword(
        `${process.env.NEXT_PUBLIC_URL}/web/api/users/v1/ResetPassword`,
        { userId, newPassword: input.newPassword }
      );
      if (data) toast.success(data);
      router.push("/login");
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? "Reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <Image src="/images/change-password-bg.jpg" alt="Background" fill className="absolute z-0 opacity-50 object-cover" priority />
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold text-center mb-2 font-dosisBold text-white">Set New Password</h2>
        <label className="text-white text-sm" htmlFor="newPassword">New Password</label>
        <input id="newPassword" type="password" value={input.newPassword} onChange={(e) => setInput({ ...input, newPassword: e.target.value })} className="w-full rounded-md px-3 py-2 bg-white/90 text-black placeholder-gray-600 focus:outline-none" placeholder="Enter new password" />
        <label className="text-white text-sm" htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" value={input.confirmPassword} onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })} className="w-full rounded-md px-3 py-2 bg-white/90 text-black placeholder-gray-600 focus:outline-none" placeholder="Re-enter new password" />
        <button type="submit" disabled={isLoading} className="mt-2 w-full bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
          {isLoading ? "Saving..." : "Save New Password"}
        </button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
