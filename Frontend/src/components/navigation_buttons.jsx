import { useEffect, useRef, useState } from "react";
import { Info, MapPin, FileText, ListTree, User2, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
const NavigationButtons = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleLogin = () => {
    toast.info("Loading Login Page .. please wait");
    router.push("/login");
  };
  const handleRegister = () => {
    toast.info("Loading Register Page .. please wait");
    router.push("/register");
  };
  const handleInfo = () => {
    toast.info("Loading Info Page .. please wait");
    router.push("/info");
  };

  const buttonBaseClass = `
    px-4 py-2 font-mono text-sm font-bold tracking-wider uppercase
    border-2 border-cyan-400 bg-black/80 text-cyan-400
    hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-400/50
    transition-all duration-300 ease-in-out
    backdrop-blur-sm cursor-pointer
    transform hover:scale-105 active:scale-95
    cyberpunk-button
  `;
  const infoButtonClass = `
    rounded-sm font-mono text-lg font-bold relative overflow-hidden
    border-2 border-cyan-400 bg-black/80 text-cyan-400
    hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-400/50
    transition-all duration-300 ease-in-out
    backdrop-blur-sm cursor-pointer flex items-center justify-center
    transform hover:scale-110 active:scale-95
    cyberpunk-button group
  `;

  // Animated rotating icons for Info button
  const icons = useRef([
    { Comp: Info, label: "Info" },
    { Comp: MapPin, label: "Location" },
    { Comp: FileText, label: "Details" },
    { Comp: ListTree, label: "Structure" },
    { Comp: User2, label: "Contacts" },
    { Comp: HelpCircle, label: "Help" },
  ]);
  const [iconIndex, setIconIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIconIndex((i) => (i + 1) % icons.current.length), 1500);
    return () => clearInterval(id);
  }, [paused]);
  const ActiveIcon = icons.current[iconIndex].Comp;

  return (
    <>
      <style jsx>{`
        .cyberpunk-button {
          position: relative;
          overflow: hidden;
        }
        .cyberpunk-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        .cyberpunk-button:hover::before {
          left: 100%;
        }
        .cyberpunk-button {
          box-shadow: 0 0 5px rgba(0, 255, 255, 0.3), inset 0 0 5px rgba(0, 255, 255, 0.1);
        }
        .cyberpunk-button:hover {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 10px rgba(0, 255, 255, 0.2);
        }
      `}</style>
      <style jsx global>{`
        @keyframes icon-cycle {
          0% {
            opacity: 0;
            transform: scale(0.4) rotate(-25deg);
          }
          55% {
            opacity: 1;
            transform: scale(1.1) rotate(8deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }
        .animate-icon-cycle {
          animation: icon-cycle 0.55s cubic-bezier(0.65, 0.05, 0.36, 1);
        }
      `}</style>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 mr-2">
        <button
          onClick={handleLogin}
          className={buttonBaseClass}
          style={{ fontSize: isMobile ? "10px" : "12px", padding: isMobile ? "6px 12px" : "8px 16px" }}>
          Login
        </button>
        {/* <button onClick={handleRegister} className={buttonBaseClass} style={{ fontSize:isMobile?"10px":"12px", padding:isMobile?"6px 12px":"8px 16px" }}>Register</button> */}
        <button
          onClick={handleInfo}
          className={infoButtonClass}
          style={{ width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px" }}
          title={icons.current[iconIndex].label}
          aria-label={icons.current[iconIndex].label + " button"}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          <div className="relative w-full h-full flex items-center justify-center">
            <ActiveIcon key={iconIndex} className="w-5 h-5 animate-icon-cycle text-cyan-400 group-hover:text-black" />
          </div>
        </button>
      </div>
    </>
  );
};

export { NavigationButtons };
