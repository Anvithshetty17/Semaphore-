"use client";
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
    // You can replace this with your desired info page route
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
    w-10 h-10 rounded-full font-mono text-lg font-bold
    border-2 border-cyan-400 bg-black/80 text-cyan-400
    hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-400/50
    transition-all duration-300 ease-in-out
    backdrop-blur-sm cursor-pointer flex items-center justify-center
    transform hover:scale-110 active:scale-95
    cyberpunk-button
  `;

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

      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={buttonBaseClass}
          style={{
            fontSize: isMobile ? "10px" : "12px",
            padding: isMobile ? "6px 12px" : "8px 16px",
          }}>
          Login
        </button>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className={buttonBaseClass}
          style={{
            fontSize: isMobile ? "10px" : "12px",
            padding: isMobile ? "6px 12px" : "8px 16px",
          }}>
          Register
        </button>

        {/* Info Button (circular with "i" in center) */}
        <button
          onClick={handleInfo}
          className={infoButtonClass}
          style={{
            width: isMobile ? "32px" : "40px",
            height: isMobile ? "32px" : "40px",
            fontSize: isMobile ? "14px" : "18px",
          }}
          title="Information">
          i
        </button>
      </div>
    </>
  );
};

export { NavigationButtons };
