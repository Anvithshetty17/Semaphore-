"use client";

import { DropDown } from "@/components/dropdown";
import { PasswordTextInput, TextInput } from "@/components/input";
import { useQueryConfig } from "@/config/useQuery.config";
import { useGetData } from "@/hooks/useGetData";
import { useSubmit } from "@/hooks/useSubmit";
import {
  Mail01Icon,
  LockPasswordIcon,
  SmartPhone01Icon,
  UserAccountIcon,
} from "hugeicons-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Register_Page() {
  const [colleges, setColleges] = useState([]);
  const router = useRouter();
  const { submitData: registerUser, isLoading: isRegistering } = useSubmit();

  const { data: collegeList } = useGetData(
    `collegeList`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetCollegeList`,
    useQueryConfig
  );

  const [formData, setformData] = useState({
    email: "",
    password: "",
    college: "",
    phoneNumber: "",
    fullName: "",
  });

  // Handle Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Demo fallback colleges
  useEffect(() => {
    setColleges(["NMAMIT Nitte", "St. Philomena", "Vivekananda College"]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const body = Object.fromEntries(formData);
      if (body?.phoneNumber?.toString().length != 10) {
        toast.info("Phone Number should be exactly 10 digits");
        return;
      }
      const { data } = await registerUser(
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/RegisterParticipant`,
        body
      );
      if (data) {
        toast.success("Account created successfully");
        toast.info("Please check your email for account verification");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? "Registration failed"
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-orbitron 
                 bg-cover bg-center bg-no-repeat px-2 sm:px-4"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-2 sm:mx-4 p-6 sm:p-10 rounded-2xl 
                   backdrop-blur-xl bg-black/70 border border-pink-500/40 
                   shadow-[0_0_40px_rgba(255,0,255,0.4)]"
      >
        {/* Neon border animated glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-pink-500/80 
                        shadow-[0_0_40px_10px_rgba(255,0,255,0.6)] pointer-events-none 
                        animate-pulse"></div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 text-pink-400 tracking-widest drop-shadow-lg">
          CREATE PROFILE
        </h2>

        {/* Full Name */}
        <div className="mb-4 sm:mb-6">
          <TextInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            icon={<UserAccountIcon color="#fff" />}
            placeholder="Enter Full Name"
            className="bg-transparent border border-gray-500 focus:border-pink-500 transition text-white placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4 sm:mb-6">
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            icon={<Mail01Icon color="#fff" />}
            placeholder="user@domain.com"
            className="bg-transparent border border-gray-500 focus:border-pink-500 transition text-white placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4 sm:mb-6">
          <PasswordTextInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            icon={<LockPasswordIcon color="#fff" />}
            placeholder="Enter Password"
            className="bg-transparent border border-gray-500 focus:border-pink-500 transition text-white placeholder-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4 sm:mb-6">
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            type="number"
            icon={<SmartPhone01Icon color="#fff" />}
            placeholder="Enter Phone Number"
            className="bg-transparent border border-gray-500 focus:border-pink-500 transition text-white placeholder-gray-400"
          />
        </div>

        {/* College Dropdown */}
        <div className="mt-4 sm:mt-6">
          <DropDown
            name="collegeId"
            label="Select College"
            DropDownItems={
              (collegeList && collegeList.length > 0
                ? collegeList.map((ele) => ({
                    label: ele?.collegeName,
                    value: ele?.collegeId,
                  }))
                : colleges.map((c, i) => ({
                    label: c,
                    value: i,
                  })))
            }
            placeholder={
              !collegeList || collegeList.length === 0
                ? "Loading colleges..."
                : "Select College"
            }
            className="w-full bg-transparent border border-gray-600 text-white placeholder-gray-400 
                       rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
        </div>

        {/* Register Button */}
        <div className="flex justify-center w-full mt-4 sm:mt-6">
          <button
            className="w-full py-2 sm:py-3 rounded-lg text-base sm:text-lg font-bold bg-pink-600 
                       text-white tracking-wider shadow-[0_0_20px_5px_rgba(255,0,255,0.5)] 
                       hover:bg-pink-700 hover:shadow-[0_0_30px_10px_rgba(255,0,255,0.6)] 
                       transition-all duration-300"
            type="submit"
            disabled={isRegistering}
          >
            ⚡ {isRegistering ? "Registering..." : "REGISTER"}
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 sm:mt-8 text-center text-pink-400 text-xs sm:text-sm">
          ALREADY HAVE AN ACCOUNT?{" "}
          <a
            href="/login"
            className="font-semibold hover:underline hover:text-pink-300 transition"
          >
            LOGIN
          </a>
        </p>
      </form>
    </div>
  );
}
