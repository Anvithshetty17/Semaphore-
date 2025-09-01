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
    <div
      className="flex items-center justify-center min-h-screen font-orbitron 
                 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md mx-4 p-10 rounded-2xl 
                   backdrop-blur-xl bg-black/70 border border-pink-500/40 
                   shadow-[0_0_40px_rgba(255,0,255,0.4)]"
      >
        {/* Neon border animated glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-pink-500/80 
                        shadow-[0_0_40px_10px_rgba(255,0,255,0.6)] pointer-events-none 
                        animate-pulse"></div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center mb-10 text-pink-400 tracking-widest drop-shadow-lg">
          ACCESS NEXUS
        </h2>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-pink-400 text-sm font-semibold mb-2">
            PLAYER EMAIL
          </label>
          <div className="flex items-center bg-black/40 border border-pink-400/40 rounded-lg px-3">
            <Mail01Icon color="#ec4899" className="mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email"
              className="flex-1 bg-transparent text-white placeholder-pink-300/50 py-3 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-pink-400 text-sm font-semibold mb-2">
            PASSWORD
          </label>
          <div className="flex items-center bg-black/40 border border-pink-400/40 rounded-lg px-3">
            <LockPasswordIcon color="#ec4899" className="mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="password"
              className="flex-1 bg-transparent text-white placeholder-pink-300/50 py-3 outline-none"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pink-600 text-white py-3 rounded-xl 
                     font-bold text-lg shadow-[0_0_25px_rgba(236,72,153,0.9)] 
                     hover:shadow-[0_0_40px_rgba(236,72,153,1)] hover:bg-pink-500 
                     transition duration-300 flex items-center justify-center gap-2"
        >
          ⚡ {isLoading ? "Logging in..." : "LOG IN"}
        </button>

        {/* Register Link */}
        <Link href="/register" className="mt-8 block text-center">
          <p className="text-sm font-semibold text-pink-300 hover:text-cyan-300 transition duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]">
            CREATE PROFILE →
          </p>
        </Link>
      </form>
    </div>
  );
}
