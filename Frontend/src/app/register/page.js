"use client";

import { RegDropDown } from "@/components/RegDropDown";
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
    setColleges([""]);
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
      className="fixed inset-0 flex items-center justify-center font-orbitron bg-cover bg-center bg-no-repeat px-1 overflow-hidden"
      style={{ backgroundImage: "url('/images/login.gif')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm mx-auto p-4 rounded-2xl text-white
                   backdrop-blur-xl bg-black/80 border border-pink-500/30 
                   shadow-[0_0_20px_rgba(255,0,255,0.18)] max-h-[95vh] overflow-y-auto"
        style={{ minHeight: "auto" }}
      >
        {/* Neon border animated glow */}
        <div className="absolute inset-0 rounded-2xl border border-pink-500/60 
                        shadow-[0_0_20px_4px_rgba(255,0,255,0.22)] pointer-events-none 
                        animate-pulse"></div>

        {/* Heading */}
        <h2 className="text-lg font-extrabold text-center mb-4 text-pink-400 tracking-widest drop-shadow">
          CREATE PROFILE
        </h2>

        {/* Full Name */}
        <div className="mb-3">
          <TextInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            icon={<UserAccountIcon color="#fff" />}
            placeholder="Full Name"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            icon={<Mail01Icon color="#fff" />}
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <PasswordTextInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            icon={<LockPasswordIcon color="#fff" />}
            placeholder="Password"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <TextInput
            label="Phone"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            type="number"
            icon={<SmartPhone01Icon color="#fff" />}
            placeholder="Phone"
            
          />
        </div>

        {/* College Dropdown */}
        <div className="mb-3">
          <RegDropDown
            name="collegeId"
            label="College"
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
                ? "Loading..."
                : "College"
            }
          />
        </div>

        {/* Register Button */}
        <button
          className="w-full py-2 rounded-lg text-sm font-bold bg-pink-600 
                     text-white tracking-wider shadow-[0_0_10px_2px_rgba(255,0,255,0.2)] 
                     hover:bg-pink-700 hover:shadow-[0_0_20px_4px_rgba(255,0,255,0.3)] 
                     transition-all duration-300 mb-3"
          type="submit"
          disabled={isRegistering}
        >
           {isRegistering ? "Registering..." : "REGISTER"}
        </button>

        {/* Login Link */}
        <p className="mt-2 text-center text-pink-400 text-xs">
          ALREADY HAVE AN ACCOUNT?{" "}
          <a
            href="/login"
            className="font-semibold underline hover:text-pink-400 transition"
          >
            LOGIN
          </a>
        </p>
      </form>
    </div>
  );
}
