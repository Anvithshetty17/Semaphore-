'use client'
import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Shield, Zap, Users, ExternalLink } from "lucide-react";
import Image from "next/image";

const TeamPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // Map coordinates (NMAMIT Nitte)
  const mapLat = 13.2088;
  const mapLng = 74.9320;
  const mapZoom = 16; // 1-21
  const mapEmbedSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.947851010841!2d74.93440267490502!3d13.17408581290662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca3db8b9e5b9d%3A0x1bb51f75a1c0dc5c!2sNitte%20Mahalinga%20Adyanthaya%20Memorial%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1694253712768!5m2!1sen!2sin`;
  const mapExternalLink = `https://www.google.com/maps?q=${mapLat},${mapLng}`;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const staffMembers=[
    {
       id: 1,
      name: "DR. ANANTH MURTHY",
      position: "SEMAPHORE CONVENOR",
      photo: "/images/core/ananth_sir.png", // Replace with your image
      phone: "+91 97437 02262",
      email: " ",
      status: "ONLINE"
    }
  ]

  const studentMembers = [
    {
      id: 1,
      name: "K KIRAN",
      position: "President",
      photo: "/images/core/kiran.png", // Replace with your image
      phone: "+91 8277463806",
      email: "nnm24mc061@nmamit.in",
      status: "ONLINE"
    },
    {
      id: 2,
      name: "RAKSHITHA",
      position: "Secretary", 
      photo: "/images/core/rakshitha.png", // Replace with your image
      phone: "+91 7975967009",
      email: "nnm24mc119@nmamit.in",
      status: "ACTIVE"
    },
    {
      id: 3,
      name: "ANUP NAYAK",
      position: "Technical Co-ordinator",
      photo: "/images/core/anup.png", // Replace with your image
      phone: "+91 9480220586",
      email: "nnm24mc014@nmamit.in",
      status: "ONLINE",
      width: 150,
      height: 150,
    },
  ];

  // Rules content and sequential reveal state
  const rules = [
    "A team should consist of a maximum of 16 members.",
    "The fest is open to all MCA students.",
    "Teams must confirm their participation through our website [ semaphore2k25.in ].",
    "The registration fee is ₹2025 per team.",
    "All participants must be present before 9:00 AM.",
    "A team must participate in all events to be eligible for the Overall Championship.",
    "Participants in the roles of IT Manager and Photography should not participate in any other events.",
    "Participants are required to produce their college ID on the fest day.",
    "All participants must be available on campus for both days of the event.",
    "The department/convenor reserves the right to take action in case of any misconduct.",
    "The decisions of the judges will be final and binding.",
    "For any issues regarding the payment of registration fees, please contact the core committee members.",
    "A cash prize and trophy will be awarded to the overall champions and runners-up.",
    "Participants must bring a permission letter from their respective colleges.",
    "Participants must bring accessories such as pens, laptops, chargers, etc., themselves.",
  ];

  const [visibleRules, setVisibleRules] = useState(0);
  useEffect(() => {
    let timer;
    if (visibleRules < rules.length) {
      timer = setInterval(() => {
        setVisibleRules((v) => (v < rules.length ? v + 1 : v));
      }, 420);
    }
    return () => clearInterval(timer);
  }, [visibleRules, rules.length]);

  // Loader-style random glitch bursts for children (avatars, rule lines)
  const GlitchBurst = ({ children, className = "" }) => {
    const [isGlitching, setIsGlitching] = useState(false);
    useEffect(() => {
      let tId;
      const it = setInterval(() => {
        if (Math.random() < 0.05) {
          setIsGlitching(true);
          const d = 50 + Math.random() * 150;
          clearTimeout(tId);
          tId = setTimeout(() => setIsGlitching(false), d);
        }
      }, 200);
      return () => {
        clearInterval(it);
        clearTimeout(tId);
      };
    }, []);

    const style = isGlitching
      ? {
          filter: `hue-rotate(${Math.random() * 360}deg) saturate(${1 + Math.random() * 2}) contrast(${1 + Math.random()})`,
          transform: `translate(${(Math.random() - 0.5) * 8}px, ${(Math.random() - 0.5) * 8}px) scale(${0.98 + Math.random() * 0.04})`,
          transition: 'none',
        }
      : {};

    // Overlay shapes mimic loader
    const block1 = { clipPath: `polygon(0 ${Math.random() * 100}%, 100% ${Math.random() * 100}%, 100% ${Math.random() * 100}%, 0 ${Math.random() * 100}%)` };
    const block2 = { clipPath: `polygon(${Math.random() * 100}% 0, ${Math.random() * 100}% 0, ${Math.random() * 100}% 100%, ${Math.random() * 100}% 100%)` };
    const block3 = { transform: `translateX(${(Math.random() - 0.5) * 20}px)` };

    return (
      <div className={`glitch-wrap ${className}`} style={style}>
        {children}
        {isGlitching && (
          <>
            <div className="glitch-overlay cyan" style={block1} />
            <div className="glitch-overlay red" style={block2} />
            <div className="glitch-overlay green" style={block3} />
          </>
        )}
        <div className="glitch-scanlines pointer-events-none" />
      </div>
    );
  };

  

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background with GIF Support */}
      <div className="fixed inset-0 z-0">
        {/* Add your GIF background here */}
        <div className="absolute inset-0">
           <img src="/images/info.gif" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" /> {/* Overlay for readability */}
        </div>
        
        {/* Simple Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Compact Header */}
        <header className="pt-12 pb-8">
          <div className="container mx-auto px-6 text-center">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NEURAL TEAM
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
                <p className="text-cyan-300 font-mono text-sm tracking-wider">
                  NMAMIT_DIVISION
                </p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
              </div>

              {/* Compact Stats */}
              <div className="flex justify-center gap-6 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300">3 ACTIVE</span>
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
        </header>

        {/* Staff Coordinators */}
        <main className="pb-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              STAFF COORDINATORS
            </h2>
            <section className="flex justify-center md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {staffMembers.map((member, index) => (
                <article
                  key={member.id}
                  className={`group relative transform transition-all duration-700 hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden group-hover:border-cyan-400/60 transition-all duration-500">
                    
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400" />
                    
                    <div className="p-6 space-y-4">
                      {/* Status */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
                          <div className={`w-2 h-2 rounded-full animate-pulse ${member.status === 'ONLINE' ? 'bg-green-400' : 'bg-blue-400'}`} />
                          <span className="text-xs font-mono text-white/80">{member.status}</span>
                        </div>
                      </div>

                      {/* Photo */}
                      <div className="relative mx-auto w-32 h-32">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-all duration-500" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 blur-lg group-hover:blur-md transition-all duration-500" />
                        <GlitchBurst className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-700/50">
                          <Image
                            src={member.photo}
                            width={150}
                            height={150}
                            alt={`${member.name} - ${member.position}`}
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </GlitchBurst>
                      </div>

                      {/* Info */}
                      <div className="text-center space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {member.name}
                          </h3>
                          <div className="inline-block bg-gradient-to-r from-purple-600/30 to-purple-500/30 border border-purple-400/40 rounded-full px-4 py-1 mt-1">
                            <span className="text-purple-300 text-sm font-semibold">
                              {member.position}
                            </span>
                          </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="flex justify-center gap-3">
                          <a
                            href={`tel:${member.phone}`}
                            className="bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 border border-cyan-500/50 rounded-xl p-3 hover:from-cyan-500/30 hover:to-cyan-400/30 hover:border-cyan-400 hover:scale-110 transition-all duration-300"
                          >
                            <Phone className="w-5 h-5 text-cyan-400" />
                          </a>
                          {/* <a
                            href={`mailto:${member.email}`}
                            className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/50 rounded-xl p-3 hover:from-purple-500/30 hover:to-purple-400/30 hover:border-purple-400 hover:scale-110 transition-all duration-300"
                          >
                            <Mail className="w-5 h-5 text-purple-400" />
                          </a> */}
                        </div>

                        {/* Contact Info */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-xs text-cyan-300/80 font-mono">{member.phone}</p>
                          <p className="text-xs text-purple-300/80 font-mono">{member.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Corner Effects */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-bl-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </article>
              ))}
            </section>

            {/* Student Coordinators */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              STUDENT COORDINATORS
            </h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {studentMembers.map((member, index) => (
                <article
                  key={member.id}
                  className={`group relative transform transition-all duration-700 hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden group-hover:border-cyan-400/60 transition-all duration-500">
                    
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400" />
                    
                    <div className="p-6 space-y-4">
                      {/* Status */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
                          <div className={`w-2 h-2 rounded-full animate-pulse ${member.status === 'ONLINE' ? 'bg-green-400' : 'bg-blue-400'}`} />
                          <span className="text-xs font-mono text-white/80">{member.status}</span>
                        </div>
                      </div>

                      {/* Photo */}
                      <div className="relative mx-auto w-32 h-32">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-all duration-500" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 blur-lg group-hover:blur-md transition-all duration-500" />
                        <GlitchBurst className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-700/50">
                          <Image
                            src={member.photo}
                            width={150}
                            height={150}
                            alt={`${member.name} - ${member.position}`}
                            className=" object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </GlitchBurst>
                      </div>

                      {/* Info */}
                      <div className="text-center space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {member.name}
                          </h3>
                          <div className="inline-block bg-gradient-to-r from-purple-600/30 to-purple-500/30 border border-purple-400/40 rounded-full px-4 py-1 mt-1">
                            <span className="text-purple-300 text-sm font-semibold">
                              {member.position}
                            </span>
                          </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="flex justify-center gap-3">
                          <a
                            href={`tel:${member.phone}`}
                            className="bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 border border-cyan-500/50 rounded-xl p-3 hover:from-cyan-500/30 hover:to-cyan-400/30 hover:border-cyan-400 hover:scale-110 transition-all duration-300"
                          >
                            <Phone className="w-5 h-5 text-cyan-400" />
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/50 rounded-xl p-3 hover:from-purple-500/30 hover:to-purple-400/30 hover:border-purple-400 hover:scale-110 transition-all duration-300"
                          >
                            <Mail className="w-5 h-5 text-purple-400" />
                          </a>
                        </div>

                        {/* Contact Info */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-xs text-cyan-300/80 font-mono">{member.phone}</p>
                          <p className="text-xs text-purple-300/80 font-mono">{member.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Corner Effects */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-bl-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </article>
              ))}
            </section>
          </div>
        </main>

        {/* Compact Map Section */}
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                HEADQUARTERS
              </h2>
              <div className="flex items-center justify-center gap-3 text-cyan-300">
                <MapPin className="w-5 h-5" />
                <span className="font-mono text-sm">NMAMIT NITTE, KARKALA</span>
                <a 
                  href={mapExternalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cyan-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Compact Map */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden">
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                  <iframe
                    src={mapEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ 
                      border: 0, 
                      filter: 'invert(0.85) contrast(1.1) hue-rotate(180deg)',
                      borderRadius: '1rem'
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NMAMIT Location"
                  />

                  {/* Simple Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none" />
                  
                  {/* Simple HUD */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-cyan-500/40 rounded-lg p-4 pointer-events-none">
                    <div className="text-xs font-mono text-cyan-300 space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400">LOCATION_ACTIVE</span>
                      </div>
                      <p>LAT: {mapLat.toFixed(4)}°N</p>
                      <p>LON: {mapLng.toFixed(4)}°E</p>
                      <p>NMAMIT NITTE</p>
                    </div>
                  </div>

                  {/* Center Marker */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md border border-cyan-400/50 rounded-full px-4 py-2">
                      <p className="text-cyan-300 text-sm font-mono">📍 NEURAL HQ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General Rules (sequential reveal) */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 to-black/70 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest neon-flicker">GENERAL RULES</h2>
                <p className="text-cyan-300/70 text-xs font-mono">REVEAL: SEQUENTIAL</p>
              </div>

              <ul className="rules-list space-y-3">
                {rules.slice(0, visibleRules).map((rule, i) => (
                  <li key={i} className="rule-item">
                    <div className="rule-rail" />
                    <div className="flex items-start gap-3">
                      <span className="rule-badge">{String(i + 1).padStart(2, '0')}</span>
                      <GlitchBurst className="flex-1">
                        <p className="text-sm text-cyan-200/90 leading-relaxed">{rule}</p>
                      </GlitchBurst>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Neon header flicker */
        .neon-flicker { color: transparent; background-image: linear-gradient(90deg, #67e8f9, #a78bfa, #f472b6); -webkit-background-clip: text; background-clip: text; text-shadow: 0 0 12px rgba(103,232,249,0.4), 0 0 24px rgba(167,139,250,0.2); animation: neonPulse 3.2s ease-in-out infinite; }
        @keyframes neonPulse { 0%, 100% { filter: drop-shadow(0 0 0 rgba(0,255,255,0)) } 50% { filter: drop-shadow(0 0 12px rgba(0,255,255,0.5)) } }

        /* Glitch burst wrapper */
        .glitch-wrap { position: relative; }
        .glitch-overlay { position: absolute; inset: 0; pointer-events: none; }
        .glitch-overlay.cyan { background: rgba(34,211,238,0.15); mix-blend-mode: screen; }
        .glitch-overlay.red { background: rgba(239,68,68,0.15); mix-blend-mode: multiply; }
        .glitch-overlay.green { background: rgba(74,222,128,0.15); mix-blend-mode: color-dodge; }
        .glitch-scanlines { position: absolute; inset: 0; background: repeating-linear-gradient( 0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px ); opacity: .35; border-radius: inherit; }

        /* Sequential rules timeline */
        .rules-list { position: relative; }
        .rule-item { position: relative; background: rgba(0,0,0,0.55); border: 1px solid rgba(34,211,238,0.25); border-radius: 0.75rem; padding: 0.75rem 1rem; overflow: hidden; animation: fadeSlideIn .5s ease both; }
        .rule-item:hover { border-color: rgba(34,211,238,0.6); }
        .rule-rail { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, rgba(103,232,249,0.8), rgba(167,139,250,0.8)); box-shadow: 0 0 12px rgba(103,232,249,0.6); }
        .rule-badge { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-weight: 900; font-size: .8rem; letter-spacing: .15em; color: #67e8f9; text-shadow: 0 0 6px rgba(103,232,249,0.6), 1px 0 0 rgba(255,0,128,0.4), -1px 0 0 rgba(0,255,255,0.4); }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
};

export default TeamPage;