"use client";

import { useSubmit } from "@/hooks/useSubmit";
import { useState } from "react";
import { Mail01Icon, LockPasswordIcon } from "hugeicons-react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store";
import { useGetData } from "@/hooks/useGetData";
import { useQueryConfig } from "@/config/useQuery.config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Login_Page() {
  const router = useRouter();
  const { submitData: loginUser, isLoading } = useSubmit();
  const { setLoginToken, token } = useAuthStore();
  const { data: authData } = useGetData(
    `isAuthenticted`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/auth/v1/IsAuthenticated?token=${token}`,
    useQueryConfig
  );

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    try {
      const { data } = await loginUser(
        `${process.env.NEXT_PUBLIC_URL}/web/api/auth/v1/Login`,
        body
      );
      if (data) {
        toast.success("Login Success");
        await setLoginToken(data);
        handleRouting(data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? "Login failed"
      );
    }
  };

  const handleRouting = (data) => {
    const userType = data?.userType?.toLowerCase();
    if (userType == "participant") router.push("/participant");
    else if (userType == "super user") router.push("/superuser");
    else if (userType == "event head") router.push("/event-heads");
    else if (userType === "admin") router.push("/admin");
    else if (userType === "registration committe") router.push("/registrations");
    else if (userType === "accolades") router.push("/accolades");
    else router.push("/error");
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://semaphore2k25.in/" />
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
        <h2 className="text-2xl font-extrabold text-center mb-7 text-pink-400 tracking-widest drop-shadow-lg">
          ACCESS NEXUS
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white text-xs font-semibold mb-2">
            PLAYER EMAIL
          </label>
          <div className="flex items-center bg-black/40 border border-pink-400/40 rounded-lg px-2">
            <Mail01Icon color="" className="mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email"
              className="flex-1 bg-transparent text-white placeholder-pink-gray-400 py-2 outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-white text-xs font-semibold mb-2">
            PASSWORD
          </label>
          <div className="flex items-center bg-black/40 border border-pink-400/40 rounded-lg px-2">
            <LockPasswordIcon color="" className="mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="password"
              className="flex-1 bg-transparent text-white placeholder-gray-400 py-2 outline-none text-sm"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pink-600 text-white py-2 rounded-xl 
                     font-bold text-base shadow-[0_0_20px_rgba(236,72,153,0.7)] 
                     hover:shadow-[0_0_30px_rgba(236,72,153,0.9)] hover:bg-pink-500 
                     transition duration-300 flex items-center justify-center gap-2"
        >
           {isLoading ? "Logging in..." : "LOG IN"}
        </button>

        <div className="mt-5 block text-center group">
  <p onClick={()=>{router.push("/register")}} className="text-xs font-semibold text-pink-400 cursor-pointer 
     drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] 
     transition duration-300 group-hover:text-cyan-300 relative inline-block">
    CREATE PROFILE 
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
  </p>
<br /></div>
<div className="mt-3 block text-center group">
   <p onClick={()=>{router.push("/forgot-password")}} className="text-xs font-semibold text-pink-400 cursor-pointer 
     drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] 
     transition duration-300 group-hover:text-cyan-300 relative inline-block">
    FORGOT PASSWORD?
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
  </p>
  </div>


      </form>
      
    </div>
    </>
  );
}
