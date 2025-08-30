"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

// Reusable CyberFrame Component
const CyberFrame = ({ children }) => (
  <div className="relative w-full p-8 pb-12 bg-black/30 backdrop-blur-[8px] border-2 border-[#FF00FF]/50 rounded-lg shadow-[0_0_20px_#FF00FF] animate-border-flow">
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
  <h1 className="text-4xl font-bold text-white mb-8 text-center uppercase tracking-wide animate-glitch filter drop-shadow-[0_0_8px_#FF00FF]">
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
  <div className="relative w-full mb-6">
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
          className="w-full pl-14 pr-4 py-3 bg-transparent text-gray-100 placeholder-white/50 focus:outline-none focus:placeholder-white/80 transition-all duration-300"
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

export default function App() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isBooting, setIsBooting] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async () => {
    if (isLoading) return;
    setErrorMessage(''); // Clear previous errors

    // Frontend validation check
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage("Please enter both Player ID and Password.");
      return;
    }

    setIsLoading(true);

    const backendUrl = process.env.NEXT_PUBLIC_URL;
    const loginEndpoint = "/web/api/auth/v1/Login";
    const fullUrl = `${backendUrl}${loginEndpoint}`;
    
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data.user);
        router.push("/participant/r");
      } else {
        setErrorMessage(data.message || "Invalid Player ID or Password.");
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      setErrorMessage("Could not connect to the server. Please try again later.");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToCreateProfile = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden flex items-center justify-center p-4 relative font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('/images/login.png')` }}
      />
      <div className="absolute inset-0 z-10 scanline-effect" />
      <div className="absolute inset-0 bg-black/60 z-20" />
      <div
        className={`relative z-30 w-full max-w-sm ${
          isBooting ? "opacity-0" : "animate-fadeIn"
        }`}
      >
        <CyberFrame>
          <TerminalHeader text="ACCESS NEXUS" />
          <div className="space-y-6">
            {errorMessage && (
              <div className="text-red-500 text-sm text-center font-semibold mb-4 drop-shadow-[0_0_5px_#FF0000]">
                {errorMessage}
              </div>
            )}
            <LabeledInput
              label="PLAYER EMAIL"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              icon={<MailIcon />}
              placeholder="user@domain.corp"
              setActiveField={setActiveField}
              isFocused={activeField === "email"}
            />
            <LabeledInput
              label="PASSWORD"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              icon={<Lock />}
              placeholder="••••••••••••••••"
              setActiveField={setActiveField}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isFocused={activeField === "password"}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full py-4 bg-[#FF00FF] text-white font-bold uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#FF00FF]/80 active:scale-95 disabled:opacity-50 relative group filter drop-shadow-[0_0_10px_#FF00FF] hover:drop-shadow-[0_0_15px_#FF00FF] animate-flicker"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>CONNECTING...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 group-hover:animate-pulse-fast" />
                    <span>LOG IN</span>
                  </>
                )}
              </div>
            </button>
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={navigateToCreateProfile}
                className="group inline-flex items-center space-x-1 text-sm text-[#FF00FF]/70 hover:text-[#FF00FF] transition-all duration-300 filter drop-shadow-[0_0_5px_#FF00FF]"
              >
                <span>CREATE PROFILE</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </CyberFrame>
      </div>
    </div>
  );
}