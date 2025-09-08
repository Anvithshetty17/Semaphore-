'use client'
import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Shield, Zap, Users, ExternalLink } from "lucide-react";

const TeamPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "K KIRAN",
      position: "President",
      photo: "/api/placeholder/300/300", // Replace with your image
      phone: "+91 8792489207",
      email: "kiran@gmail.com",
      status: "ONLINE"
    },
    {
      id: 2,
      name: "RAKSHITHA",
      position: "Secretary", 
      photo: "/api/placeholder/300/300", // Replace with your image
      phone: "+91 8792489207",
      email: "rakshitha@gmail.com",
      status: "ACTIVE"
    },
    {
      id: 3,
      name: "ANOOP NAYAK",
      position: "Technical",
      photo: "/api/placeholder/300/300", // Replace with your image
      phone: "+91 8792489207",
      email: "anoop@gmail.com",
      status: "ONLINE"
    },
  ];

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

        {/* Compact Team Cards */}
        <main className="pb-12">
          <div className="container mx-auto px-6">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
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
                          <div className={`w-2 h-2 rounded-full animate-pulse ${
                            member.status === 'ONLINE' ? 'bg-green-400' : 'bg-blue-400'
                          }`} />
                          <span className="text-xs font-mono text-white/80">{member.status}</span>
                        </div>
                      </div>

                      {/* Photo */}
                      <div className="relative mx-auto w-32 h-32">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-all duration-500" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 blur-lg group-hover:blur-md transition-all duration-500" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-700/50">
                          <img
                            src={member.photo}
                            alt={`${member.name} - ${member.position}`}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
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
                  href="https://maps.google.com/?q=NMAMIT+Nitte+Karkala" 
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0234567891234!2d74.93234567891234!3d13.21234567891234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb8a6f7c5d8f%3A0x1234567890abcdef!2sNMAMIT%20Nitte!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
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
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-cyan-500/40 rounded-lg p-4 pointer-events-none">
                    <div className="text-xs font-mono text-cyan-300 space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400">LOCATION_ACTIVE</span>
                      </div>
                      <p>LAT: 13.2088°N</p>
                      <p>LON: 74.9320°E</p>
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
      </div>

      {/* Simple Styles */}
      <style jsx>{`
        /* Add your GIF background */
        /* .bg-gif {
          background-image: url('/your-background.gif');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        } */
      `}</style>
    </div>
  );
};

export default TeamPage;