"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUp, Users, Target, Database, Terminal, Cpu, ListOrdered, UserCircle2, FileText } from 'lucide-react';
import Image from 'next/image';

const CyberpunkDrawer = ({ eventId, eventsData = [], onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Auto-open when eventId is provided
  useEffect(() => {
    if (eventId) {
      setIsOpen(true);
    }
  }, [eventId]);

  // Handle closing
  const handleClose = () => {
    setIsOpen(false);
    // Call parent's onClose after animation
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Find the event data by ID
  const eventData = eventsData.find(event => event.eventId === eventId) || {};

  // Derive image path (store only filename e.g. cyber_scope.png in eventLogoUrl)
  const logoPath = eventData.eventLogoUrl
    ? `/images/event_logos/${eventData.eventLogoUrl}`
    : '/images/event_logos/placeholder.png'; // ensure you add a placeholder.png

  const eventHeads = eventData.eventHeads || []; // [{eventHeadId, user:{ fullName, email, ...}}]
  const rules = eventData.eventRules || []; // [{eventRulesId, ruleNo, eventRule}]

  return (
  <div className="fixed inset-0 pointer-events-none z-50 font-mono" role="dialog" aria-modal="true" aria-labelledby="event-drawer-heading">
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/95 to-black/95 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
          onClick={handleClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`absolute bottom-0 left-0 right-0 pointer-events-auto transform transition-all duration-700 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-70px)]'
      }`}>
        
        {/* Trigger Handle */}
        <div 
          className="relative mx-3 mb-2 cursor-pointer group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="bg-gradient-to-r from-purple-900/90 via-black/90 to-purple-900/90 border-2 border-cyan-400/50 rounded-t-xl p-3 shadow-2xl relative overflow-hidden">
            {/* Glitch effect lines */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping absolute"></div>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
                </div>
                <span className="text-cyan-300 text-xs tracking-widest font-bold">
                  NEURAL_LINK://ACTIVE
                </span>
              </div>
              <ChevronUp className={`w-5 h-5 text-cyan-300 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-b from-purple-900/95 via-black/95 to-black/95 border-t-2 border-cyan-400/50 rounded-t-2xl shadow-2xl max-h-[85vh] overflow-hidden relative">
          
          {/* Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent bg-repeat-y animate-pulse" 
                 style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)'}}>
            </div>
            {/* Purple glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-pink-500/5"></div>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(85vh-24px)] relative z-10">
            
            {/* Header with Event Name */}
            <div className="text-center border-b border-purple-800/50 pb-4 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30"></div>
              <h2 id="event-drawer-heading" className="text-xl font-bold text-cyan-300 font-mono tracking-wider mb-1 glitch-text">
                {eventData.eventName?.toUpperCase() || 'EVENT_UNKNOWN'}
              </h2>
              <div className="flex justify-center items-center space-x-2 text-xs text-purple-400">
                <Terminal className="w-3 h-3" />
                <span>ID: {eventData.eventId?.slice(-8)}</span>
              </div>
              {/* Meta Tags Row */}
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {eventData.title && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 text-[10px] tracking-wider">
                    {eventData.title}
                  </span>
                )}
                {eventData.category && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-400/10 border border-purple-400/40 text-purple-200 text-[10px] tracking-wider">
                    {eventData.category}
                  </span>
                )}
                {eventData.difficulty && (
                  <span className="px-2 py-0.5 rounded-full bg-pink-400/10 border border-pink-400/40 text-pink-200 text-[10px] tracking-wider">
                    {eventData.difficulty}
                  </span>
                )}
                {eventData.status && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/40 text-emerald-200 text-[10px] tracking-wider">
                    {eventData.status}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Left Side - Supplementary Info & Logo */}
              <div className="md:col-span-1">
                <div className="bg-gradient-to-br from-purple-900/80 via-gray-900/80 to-black/80 border border-cyan-400/30 rounded-lg p-4 h-full">
                  {/* Event Logo positioned where old GIF placeholder was */}
                  <div className="bg-gradient-to-br from-purple-900/60 via-black/60 to-pink-900/30 border border-cyan-400/20 rounded-lg h-32 mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {logoPath ? (
                      <Image
                        src={logoPath}
                        alt={eventData.eventName || 'event-logo'}
                        className="object-contain w-full h-full p-2 z-10"
                        onError={(e) => { e.currentTarget.src = '/images/event_logos/placeholder.png'; }}
                      />
                    ) : (
                      <div className="text-cyan-400 text-xs text-center z-10">
                        [NO_LOGO]<br/>
                        <span className="text-purple-400">UPLOAD_SOON</span>
                      </div>
                    )}
                  </div>
{/* <h3 className="text-cyan-300 text-sm mb-3 flex items-center tracking-wider">
                    <Database className="w-4 h-4 mr-2" />
                    EVENT_DATA
                  </h3> */}
                  <h3 className="text-cyan-300 text-sm mb-3 tracking-wider flex items-center"><FileText className="w-4 h-4 mr-2"/>DESCRIPTION</h3>
                  <p className="text-xs text-purple-200 leading-relaxed mb-4 whitespace-pre-wrap">
                    {eventData.description || 'No description provided yet.'}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-purple-800/50 pb-1">
                      <span className="text-purple-400">CURRENT_ROUND:</span>
                      <span className="text-cyan-300">{eventData.currentRound ?? '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Event Data */}
              <div className="md:col-span-2 space-y-4">
                
                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-purple-900/60 to-black/60 border border-cyan-400/40 rounded-lg p-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/40"></div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-cyan-300" />
                      <span className="text-purple-300 text-xs">MEMBERS</span>
                    </div>
                    <div className="text-lg font-bold text-cyan-300">{eventData.memberCount || 0}</div>
                    <div className="text-[10px] text-purple-400 tracking-wider">TOTAL</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-900/60 to-black/60 border border-pink-400/40 rounded-lg p-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-pink-400/40"></div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-4 h-4 text-pink-400" />
                      <span className="text-purple-300 text-xs">ROUNDS</span>
                    </div>
                    <div className="text-lg font-bold text-pink-300">{eventData.noOfRounds || 0}</div>
                    <div className="text-[10px] text-purple-400 tracking-wider">TOTAL_ROUNDS</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-900/50 to-black/60 border border-cyan-400/40 rounded-lg p-3 relative overflow-hidden hidden md:block">
                    <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/40"></div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-cyan-300 text-xs font-semibold">CURR ROUND</span>
                    </div>
                    <div className="text-lg font-bold text-cyan-300">{eventData.currentRound ?? '-'}</div>
                    <div className="text-[10px] text-purple-400 tracking-wider">PROGRESS</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/20 via-black/40 to-purple-900/30 border border-cyan-400/30 rounded-lg p-4">
                  <h3 className="text-cyan-300 text-sm mb-2 tracking-wider flex items-center"><UserCircle2 className="w-4 h-4 mr-2"/>EVENT_HEADS</h3>
                  <ul className="space-y-2 mb-4">
                    {eventHeads.length > 0 ? eventHeads.map(h => (
                      <li key={h.eventHeadId} className="text-xs text-purple-200 flex flex-col border-b border-purple-800/40 pb-1">
                        <span className="text-cyan-300 font-semibold">{h?.user?.fullName || h?.user?.username}</span>
                        <span className="text-purple-400">{h?.user?.phoneNumber}</span>
                      </li>
                    )) : <li className="text-xs text-purple-400">No event heads linked.</li>}
                  </ul>
                </div>

                {/* Rules Section */}
                <div className="bg-gradient-to-br from-cyan-900/20 via-black/40 to-purple-900/30 border border-cyan-400/30 rounded-lg p-4">
                  <h3 className="text-cyan-300 text-sm mb-3 flex items-center tracking-wider">
                    <ListOrdered className="w-4 h-4 mr-2" />
                    EVENT_RULES
                  </h3>
                  {rules.length > 0 ? (
                    <div className="max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-700/50 scrollbar-track-transparent">
                      <ol className="list-decimal list-inside space-y-2 text-xs text-purple-200 marker:text-cyan-300">
                        {rules
                          .slice() // clone before sort
                          .sort((a,b) => (a.ruleNo||0)-(b.ruleNo||0))
                          .map(r => (
                            <li key={r.eventRulesId || r.ruleNo} className="leading-snug">
                              <span className="text-cyan-300 font-semibold mr-1">{r.ruleNo}.</span>
                              {r.eventRule}
                            </li>
                          ))}
                      </ol>
                    </div>
                  ) : (
                    <p className="text-xs text-purple-400">No rules published yet.</p>
                  )}
                </div>

                {/* System Status */}
              
              </div>
              
            </div>
              <div className="bg-gradient-to-br from-purple-900/40 via-black/40 to-cyan-900/20 border border-purple-400/30 rounded-lg p-4">
                  <h3 className="text-cyan-300 text-sm mb-3 flex items-center tracking-wider">
                    <Cpu className="w-4 h-4 mr-2" />
                    SYSTEM_STATUS
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-400">CPU_LOAD:</span>
                      <span className="text-cyan-300">67.3%</span>
                    </div>
                    <div className="bg-purple-900/50 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-2/3 animate-pulse"></div>
                    </div>
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-400">MEMORY:</span>
                      <span className="text-pink-300">84.1%</span>
                    </div>
                    <div className="bg-purple-900/50 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-pink-400 to-cyan-400 h-full w-5/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => router.push('/register')}
                  className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-400/50 hover:from-cyan-800/40 hover:to-purple-800/40 text-cyan-300 font-bold py-3 rounded-lg transition-all duration-300 text-sm tracking-wider hover:border-cyan-300/70 hover:shadow-lg hover:shadow-cyan-400/20">
                JACK_IN
              </button>
              <button 
                onClick={handleClose}
                className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-400/50 hover:from-purple-800/40 hover:to-pink-800/40 text-purple-300 font-bold py-3 rounded-lg transition-all duration-300 text-sm tracking-wider hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-400/20"
              >
                DISCONNECT
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-2 border-t border-purple-800/50">
              <div className="text-xs text-purple-400 tracking-widest">
                CYBERPUNK_INTERFACE_v2K25.47 | SECURE_CONNECTION
              </div>
            </div>
          </div>
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default CyberpunkDrawer;