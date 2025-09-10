'use client'
import React, { useState, useEffect } from "react";
import { 
  Code, 
  Database, 
  Palette, 
  Shield, 
  Zap, 
  Users, 
  Terminal, 
  Cpu, 
  Github, 
  Linkedin,
  Mail,
  ExternalLink,
  ArrowLeft,
  Globe,
  Layers,
  Smartphone
} from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const MeetTheTeam = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Team developers data
  const developers = [
    {
      id: 1,
      name: "ANUP NAYAK",
      position: "Full Stack Developer & Project Lead",

      photo: "/images/core/anup.png",
      status: "ONLINE",

      github: "https://github.com/anupnayak25",
      linkedin: "https://www.linkedin.com/in/anup-nayak-05651b25b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "nnm24mc014@nmamit.in",
     
    },
    {
      id: 2,
      name: "HARSHITH P",
      position: "Full Stack Developer",

      photo: "NA",
      status: "ONLINE",
     
      github: "https://github.com/harshithpancheru",
      linkedin: "https://www.linkedin.com/in/harshithpancheru",
      email: "nnm24mc052@nmamit.in",
     
    },
    {
      id: 3,
      name: "SHUJAN",
      position: "3D Model Designer",

      photo: "NA",
      status: "ONLINE",
      
      github: "",
      linkedin: "",
      email: "nnm24mc@nmamit.in",
      
    },
    {
      id: 4,
      name: "MANEESH KUMAR",
      position: "Frontend Developer",

      photo: "NA",
      status: "ONLINE",
     
      
      github: "https://github.com/maneeshkumarr",
      linkedin: "https://www.linkedin.com/in/maneesh-kumar-b17787262",
      email: "nnm24mc@nmamit.in",
     
      
    },
    {
      id: 5,
      name: "ANVITH SHETTY",
      position: "Frontend Developer & SEO",

      photo: "/images/dev/anvith.png",
      status: "ONLINE",
     
      
      github: "https://github.com/Anvithshetty17/",
      linkedin: "https://www.linkedin.com/in/anvith-shetty-b371372b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "nnm24mc015@nmamit.in",
     
      
    },
     {
      id: 6,
      name: "SHREYAS S",
      position: "Frontend Developer",

      photo: "/images/dev/Shreyas S.png",
      status: "ONLINE",
     
      
      github: "https://github.com/Shreyas973",
      linkedin: "https://www.linkedin.com/in/shreyas-s29",
      email: "nnm24mc147@nmamit.in",
     
      
    }
  ];

  // Technology stack information
  const techStack = {
    frontend: {
      title: "FRONTEND MATRIX",
      technologies: [
        { name: "Next.js 14", purpose: "React Framework" },
        { name: "Three.js", purpose: "3D Graphics Engine" },
        { name: "Tailwind CSS", purpose: "Utility-First Styling" },
        { name: "Framer Motion", purpose: "Animation Library" },
        { name: "React Query", purpose: "Data Fetching" }
      ]
    },
    backend: {
      title: "BACKEND CORE",
      technologies: [
        { name: "NestJS", purpose: "Node.js Framework" },
        { name: "TypeScript", purpose: "Type Safety" },
        { name: "PostgreSQL", purpose: "Primary Database" },
        { name: "TypeORM", purpose: "Database ORM" },
        { name: "JWT", purpose: "Authentication" }
      ]
    },
    infrastructure: {
      title: "INFRASTRUCTURE GRID",
      technologies: [
        { name: "Docker", purpose: "Containerization" },
        { name: "AWS", purpose: "Cloud Platform" },
        { name: "Nginx", purpose: "Load Balancer" },
        { name: "GitHub Actions", purpose: "CI/CD Pipeline" },
        { name: "SSL/TLS", purpose: "Security Layer" }
      ]
    }
  };

  // Loader-style random glitch bursts
  const GlitchBurst = ({ children, className = "" }) => {
    const [isGlitching, setIsGlitching] = useState(false);
    useEffect(() => {
      let tId;
      const it = setInterval(() => {
        if (Math.random() < 0.03) {
          setIsGlitching(true);
          tId = setTimeout(() => setIsGlitching(false), 100 + Math.random() * 150);
        }
      }, 200);
      return () => {
        clearInterval(it);
        clearTimeout(tId);
      };
    }, []);

    return (
      <div className={`${className} ${isGlitching ? "animate-pulse" : ""}`}>
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Cyberpunk grid */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px"
          }}
        />
        
        {/* Scanlines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent bg-repeat-y animate-pulse"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)"
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-12">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm border border-cyan-400/30 px-4 py-2 rounded hover:border-cyan-400/60 hover:bg-cyan-400/10"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN_TO_MAIN_INTERFACE
          </button>

          {/* System Status Bar */}
          <div className="bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 border border-cyan-500/40 rounded-lg p-4 mb-8 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-green-400 text-sm">DEVELOPMENT_TEAM://ACTIVE</span>
                </div>
                <div className="text-cyan-300 font-mono text-xs">
                  CYBERPUNK_PROTOCOL_v2K25.12.10
                </div>
              </div>
              
              <div className="flex justify-center gap-6 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300">{developers.length} DEVS</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">SECURE</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <GlitchBurst>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                MEET_THE_DEVELOPMENT_TEAM
              </h1>
            </GlitchBurst>
            <p className="text-xl text-gray-300 font-mono tracking-wider">
              &gt; ARCHITECTS_OF_THE_CYBERPUNK_REALITY &lt;
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6">

          {/* Developers Grid */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CORE_DEVELOPMENT_MATRIX
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {developers.map((dev, index) => (
                <GlitchBurst key={dev.id}>
                  <article 
                    className={`group relative transform transition-all duration-700 hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden group-hover:border-cyan-400/60 transition-all duration-500">
                      
                      {/* Status Bar */}
                      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-b border-cyan-500/30 p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs font-mono">{dev.status}</span>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Profile Content */}
                      <div className="p-6">
                        {/* Avatar */}
                        <div className="relative w-32 h-32 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-purple-500/50 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                          <div className="relative w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-2 border-cyan-400/60 flex items-center justify-center overflow-hidden">
                            {/* Placeholder for actual image */}
                            {dev.photo!=="NA" ? <Image src={dev.photo} alt={dev.name} layout="fill" objectFit="cover" className="rounded-full" /> : <Code className="w-16 h-16 text-cyan-400" />}
                          </div>
                        </div>

                        {/* Developer Info */}
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-cyan-300 mb-2 font-mono tracking-wider">
                            {dev.name}
                          </h3>
                          <p className="text-purple-400 font-semibold mb-1">{dev.position}</p>
                          
                        </div>

                  

                        {/* Social Links */}
                        <div className="flex justify-center gap-4">
                          <a href={dev.github} className="p-2 bg-gray-800 hover:bg-cyan-900/50 border border-gray-600 hover:border-cyan-400/60 rounded transition-all duration-300 group">
                            <Github className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                          </a>
                          <a href={dev.linkedin} className="p-2 bg-gray-800 hover:bg-cyan-900/50 border border-gray-600 hover:border-cyan-400/60 rounded transition-all duration-300 group">
                            <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                          </a>
                          <a href={`mailto:${dev.email}`} className="p-2 bg-gray-800 hover:bg-cyan-900/50 border border-gray-600 hover:border-cyan-400/60 rounded transition-all duration-300 group">
                            <Mail className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                          </a>
                        </div>
                      </div>

                      {/* Glitch overlay effects */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10"></div>
                      </div>
                    </div>
                  </article>
                </GlitchBurst>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
        
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/30 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="text-xs text-purple-400 tracking-widest font-mono">
              CYBERPUNK_DEVELOPMENT_INTERFACE_v2K25.47 | NEURAL_LINK_ESTABLISHED
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Built with dedication by the Semaphore 2K25 Development Team
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 2s infinite;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
        }

        @keyframes neonPulse {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(0,255,255,0)) }
          50% { filter: drop-shadow(0 0 12px rgba(0,255,255,0.5)) }
        }

        .neon-glow {
          animation: neonPulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MeetTheTeam;
