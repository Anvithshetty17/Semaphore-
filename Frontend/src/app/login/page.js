"use client";

import { useSubmit } from "@/hooks/useSubmit";
import { useState, useEffect, useRef } from "react";
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

  // DVD Logo bouncing state
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [logoVelocity, setLogoVelocity] = useState({ dx: 2, dy: 1.5 });
  const animationRef = useRef();
  const containerRef = useRef();

  // DVD bouncing animation
  useEffect(() => {
    const animate = () => {
      setLogoPosition(prev => {
        const container = containerRef.current;
        if (!container) return prev;
        
        const containerRect = container.getBoundingClientRect();
        const logoSize = 100; // Logo width/height
        
        let newX = prev.x + logoVelocity.dx;
        let newY = prev.y + logoVelocity.dy;
        let newDx = logoVelocity.dx;
        let newDy = logoVelocity.dy;
        
        // Bounce off edges
        if (newX <= 0 || newX >= containerRect.width - logoSize) {
          newDx = -newDx;
          newX = newX <= 0 ? 0 : containerRect.width - logoSize;
        }
        
        if (newY <= 0 || newY >= containerRect.height - logoSize) {
          newDy = -newDy;
          newY = newY <= 0 ? 0 : containerRect.height - logoSize;
        }
        
        setLogoVelocity({ dx: newDx, dy: newDy });
        
        return { x: newX, y: newY };
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [logoVelocity.dx, logoVelocity.dy]);

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
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center font-orbitron 
                   bg-cover bg-center bg-no-repeat px-2 overflow-hidden"
       style={{ backgroundImage: "url('/images/login.gif')" }}
      >
        {/* DVD Bouncing Logo */}
        <Image 
          src={"/images/semaphore_logo.png"} 
          alt="bouncing logo" 
          width={150} 
          height={150} 
          className="absolute pointer-events-none z-0 transition-all duration-75 ease-linear
                     drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] 
                     hover:drop-shadow-[0_0_30px_rgba(236,72,153,1)]"
          style={{ 
            left: `${logoPosition.x}px`, 
            top: `${logoPosition.y}px`,
            filter: 'brightness(1.2) saturate(1.3)'
          }}
        />
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

        <Link href="/register" className="mt-5 block text-center group">
  <p className="text-xs font-semibold text-pink-400 cursor-pointer 
     drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] 
     transition duration-300 group-hover:text-cyan-300 relative inline-block">
    CREATE PROFILE 
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
  </p>
</Link>

      </form>
    </div>
    </>
  );
}
