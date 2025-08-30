"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

// Custom components with inline SVG icons for a self-contained app
const MailIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const Lock = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
const Zap = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const ChevronRight = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);
const Eye = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const EyeOff = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a10.07 10.07 0 0 1 4.06-5.94"></path>
    <path d="M1 1l22 22"></path>
  </svg>
);
const UserAccountIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const SmartPhone01Icon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);
const BankIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7v14h20V7z" />
    <path d="M12 22V12" />
    <path d="M2 12h20" />
    <path d="M10 12h4" />
    <path d="M10 18h4" />
  </svg>
);

// Reusable CyberFrame Component
const CyberFrame = ({ children }) => (
  <div className="relative w-full p-6 pb-10 bg-black/30 backdrop-blur-[8px] border-2 border-[#FF00FF]/50 rounded-lg shadow-[0_0_20px_#FF00FF] animate-border-flow">
    {/* Corner Decorations */}
    <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-[#FF00FF] filter drop-shadow-[0_0_8px_#FF00FF]" />
    <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-[#FF00FF] filter drop-shadow-[0_0_8px_#FF00FF]" />
    <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-[#FF00FF] filter drop-shadow-[0_0_8px_#FF00FF]" />
    <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-[#FF00FF] filter drop-shadow-[0_0_8px_#FF00FF]" />
    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);

// TerminalHeader Component
const TerminalHeader = ({ text }) => (
  <h1 className="text-3xl font-bold text-white mb-6 text-center uppercase tracking-wide animate-glitch filter drop-shadow-[0_0_8px_#FF00FF]">
    {text}
  </h1>
);

// LabeledInput Component
const LabeledInput = ({
  label,
  name,
  type,
  value,
  onChange,
  icon,
  placeholder,
  setActiveField,
  showPassword,
  setShowPassword,
  isFocused,
}) => (
  <div className="relative w-full mb-4">
    <label
      htmlFor={name}
      className={`flex items-center space-x-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
        isFocused
          ? "text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]"
          : "text-gray-200"
      }`}
    >
      <span>{label}</span>
      {isFocused && (
        <div className="w-1 h-1 bg-[#00FFFF] rounded-full animate-pulse-fast" />
      )}
    </label>
    <div className="relative group/field">
      <div
        className={`relative bg-black/20 backdrop-blur-sm border-2 transition-all duration-300 rounded-lg overflow-hidden ${
          isFocused ? "border-[#00FFFF] holographic-glow-focus" : "border-white/40"
        }`}
      >
        {icon &&
          React.cloneElement(icon, {
            className: `absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
              isFocused ? "text-[#00FFFF]" : "text-white/70"
            }`,
          })}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setActiveField(name)}
          onBlur={() => setActiveField(null)}
          placeholder={placeholder}
          className="w-full pl-14 pr-4 py-2 bg-transparent text-gray-100 placeholder-white/50 focus:outline-none focus:placeholder-white/80 transition-all duration-300"
        />
        {name === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-[#00FFFF] transition-all duration-300 hover:scale-110"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  </div>
);

// Custom DropDown component
const LabeledDropdown = ({
  label,
  name,
  value,
  onChange,
  options,
  icon,
  placeholder,
  setActiveField,
  isFocused,
}) => (
  <div className="relative w-full mb-4">
    <label
      htmlFor={name}
      className={`flex items-center space-x-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
        isFocused
          ? "text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]"
          : "text-gray-200"
      }`}
    >
      <span>{label}</span>
      {isFocused && (
        <div className="w-1 h-1 bg-[#00FFFF] rounded-full animate-pulse-fast" />
      )}
    </label>
    <div className="relative group/field">
      <div
        className={`relative bg-black/20 backdrop-blur-sm border-2 transition-all duration-300 rounded-lg overflow-hidden ${
          isFocused ? "border-[#00FFFF] holographic-glow-focus" : "border-white/40"
        }`}
      >
        {icon &&
          React.cloneElement(icon, {
            className: `absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
              isFocused ? "text-[#00FFFF]" : "text-white/70"
            }`,
          })}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setActiveField(name)}
          onBlur={() => setActiveField(null)}
          className="w-full pl-14 pr-4 py-2 bg-black text-gray-100 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] transition-all duration-300"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="bg-black text-gray-100 hover:bg-[#1a1a1a]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default function Register_Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    college: "",
    phoneNumber: "",
    teamName: "",
    fullName: "",
  });
  const [activeField, setActiveField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  // Assuming useGetData and useSubmit are correctly implemented hooks
  const useGetData = () => ({ data: [{ collegeName: "NMAMIT Nitte", collegeId: "1" }, { collegeName: "St. Philomena", collegeId: "2" }, { collegeName: "Vivekananda College", collegeId: "3" }], isLoading: false });
  const useSubmit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const submitData = async (url, body) => {
      setIsLoading(true);
      // Simulating API call
      return new Promise((resolve) => setTimeout(() => {
        setIsLoading(false);
        resolve({ data: true });
      }, 1500));
    };
    return { submitData, isLoading };
  };

  const { submitData: registerUser, isLoading: isRegistering } = useSubmit();
  const { data: collegeList, isLoading: isCollegeListLoading } = useGetData();

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 1500);
    return () => clearTimeout(bootTimer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) return;

      if (!formData.email || !formData.password || !formData.fullName || !formData.phoneNumber || !formData.college) {
        toast.info("Please fill out all required fields.");
        return;
      }
      
      if (formData.phoneNumber?.length !== 10) {
        toast.info("Phone Number should be exactly 10 digits");
        return;
      }

      const body = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        collegeId: formData.college,
      };

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
      toast.error(error?.response?.data?.message ?? error?.message ?? "Registration failed");
    }
  };

  const collegeOptions = collegeList?.map((ele) => ({
    label: ele?.collegeName,
    value: ele?.collegeId,
  })) || [];

  return (
    <div className="min-h-screen bg-black overflow-hidden flex items-center justify-center p-4 relative font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('/images/login.png')` }} />
      {/* Glitch & Scanline Overlay */}
      <div className="absolute inset-0 z-10 scanline-effect" />
      <div className="absolute inset-0 bg-black/60 z-20" />
      {/* Main Content */}
      <div className={`relative z-30 w-full max-w-sm ${isBooting ? 'opacity-0' : 'animate-fadeIn'}`}>
        <CyberFrame>
          <TerminalHeader text="CREATE PROFILE" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <LabeledInput
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              icon={<UserAccountIcon className="w-5 h-5" />}
              placeholder="Enter Full Name"
              setActiveField={setActiveField}
              isFocused={activeField === "fullName"}
            />
            <LabeledInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              icon={<MailIcon className="w-5 h-5" />}
              placeholder="user@domain.corp"
              setActiveField={setActiveField}
              isFocused={activeField === "email"}
            />
            <LabeledInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              icon={<Lock className="w-5 h-5" />}
              placeholder="••••••••••••••••"
              setActiveField={setActiveField}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isFocused={activeField === "password"}
            />
            <LabeledInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              icon={<SmartPhone01Icon className="w-5 h-5" />}
              placeholder="Enter Phone Number"
              setActiveField={setActiveField}
              isFocused={activeField === "phoneNumber"}
            />
            <LabeledDropdown
              label="Select College"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              icon={<BankIcon className="w-5 h-5" />}
              placeholder="Select College"
              options={collegeOptions}
              setActiveField={setActiveField}
              isFocused={activeField === "college"}
            />
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full py-3 bg-[#FF00FF] text-white font-bold uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#FF00FF]/80 active:scale-95 disabled:opacity-50 relative group filter drop-shadow-[0_0_10px_#FF00FF] hover:drop-shadow-[0_0_15px_#FF00FF] animate-flicker"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isRegistering ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>REGISTERING...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 group-hover:animate-pulse-fast" />
                    <span>REGISTER</span>
                  </>
                )}
              </div>
            </button>
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="group inline-flex items-center space-x-1 text-sm text-[#FF00FF]/70 hover:text-[#FF00FF] transition-all duration-300 filter drop-shadow-[0_0_5px_#FF00FF]"
              >
                <span>ALREADY HAVE AN ACCOUNT?</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </CyberFrame>
      </div>
    </div>
  );
}