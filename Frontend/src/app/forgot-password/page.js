"use client";

import { useState } from "react";
import { useSubmit } from "@/hooks/useSubmit";
import { toast } from "react-toastify";
import { Mail01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Head from "next/head";

export default function ForgotPasswordPage() {
  const router = useRouter();
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
    <>
      <Head>
        <link rel="canonical" href="https://semaphore2k25.in/forgot-password" />
      </Head>
      <div
        className="fixed inset-0 flex items-center justify-center font-orbitron 
                   bg-cover bg-center bg-no-repeat px-2 overflow-hidden"
        style={{ backgroundImage: "url('/images/login.gif')" }}
      >
        {/* Top-centered header with text on the left and logo on the right */}
        <div className="absolute top-16 sm:top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3 sm:gap-4 bg-black/60 rounded-xl px-3 py-2 border border-pink-500/30">
            <Image
              src="/images/semaphore_logo.png"
              alt="Semaphore logo"
              width={65}
              height={65}
              className="drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]"
              priority
            />
            <div className="leading-tight">
              <p className="text-white text-xs sm:text-sm font-semibold">Department of MCA</p>
              <p className="text-white text-xs sm:text-sm">NMAMIT,Nitte</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-sm mx-auto p-5 sm:p-7 rounded-2xl
                     backdrop-blur-xl bg-black/80 border border-pink-500/40 
                     shadow-[0_0_30px_rgba(255,0,255,0.25)] max-h-[95vh] z-10"
        >
          {/* Neon border animated glow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-pink-500/80 
                          shadow-[0_0_30px_8px_rgba(255,0,255,0.4)] pointer-events-none 
                          animate-pulse"></div>

          {/* Heading */}
          <h2 className="text-2xl font-extrabold text-center mb-4 text-pink-400 tracking-widest drop-shadow-lg">
            RESET ACCESS
          </h2>
          
          {/* Subtitle */}
          <p className="text-center text-xs text-cyan-300 mb-6 font-semibold tracking-wide 
                        drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
            ENTER REGISTERED EMAIL TO RECOVER
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-white text-xs font-semibold mb-2 tracking-wider">
              PLAYER EMAIL
            </label>
            <div className="flex items-center bg-black/40 border border-pink-400/40 rounded-lg px-2">
              <Mail01Icon color="" className="mr-2" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-white placeholder-gray-400 py-2 outline-none text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-pink-600 text-white py-2 rounded-xl 
                       font-bold text-base shadow-[0_0_20px_rgba(236,72,153,0.7)] 
                       hover:shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:bg-pink-500 
                       transition duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? "SENDING..." : "SEND RESET LINK"}
          </button>

          {/* Back to Login Link */}
          <div className="mt-5 block text-center group">
            <p 
              onClick={() => {router.push("/login")}} 
              className="text-xs font-semibold text-pink-400 cursor-pointer 
                         drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] 
                         transition duration-300 group-hover:text-cyan-300 relative inline-block"
            >
              BACK TO LOGIN 
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}