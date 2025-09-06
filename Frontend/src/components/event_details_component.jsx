import React, { useState, useEffect } from 'react';
import { ChevronUp, Users, Target, Zap, Clock, Database, Terminal, Cpu } from 'lucide-react';

const CyberpunkDrawer = ({ eventId, eventsData = [], onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

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
  const eventData = eventsData.find(event => event.eventId === eventId) || {
    eventId: '2eabcb89-9cd4-4e2d-8ee0-d2242512c892',
    eventName: 'Cryptix',
    eventLogoUrl: '',
    memberCount: 2,
    noOfRounds: 3,
    status: 'ACTIVE',
    category: 'HACKATHON',
    difficulty: 'HARD'
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 font-mono">
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
              <h2 className="text-xl font-bold text-cyan-300 font-mono tracking-wider mb-1 glitch-text">
                {eventData.eventName?.toUpperCase() || 'EVENT_UNKNOWN'}
              </h2>
              <div className="flex justify-center items-center space-x-2 text-xs text-purple-400">
                <Terminal className="w-3 h-3" />
                <span>ID: {eventData.eventId?.slice(-8)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Left Side - Character/GIF Spot */}
              <div className="md:col-span-1">
                <div className="bg-gradient-to-br from-purple-900/80 via-gray-900/80 to-black/80 border border-cyan-400/30 rounded-lg p-4 h-full">
                  <h3 className="text-cyan-300 text-sm mb-3 tracking-wider">NEURAL_AVATAR</h3>
                  
                  {/* GIF Placeholder - Replace this div with your GIF */}
                  <div className="bg-gradient-to-br from-purple-900/60 via-black/60 to-pink-900/30 border border-cyan-400/20 rounded-lg h-32 mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10"></div>
                    <div className="text-cyan-400 text-xs text-center z-10">
                      [AVATAR_MATRIX]<br/>
                      <span className="text-purple-400">128x128</span>
                    </div>
                  </div>
                  
                  {/* Character Stats */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-purple-800/50 pb-1">
                      <span className="text-purple-400">STATUS:</span>
                      <span className="text-cyan-300">CONNECTED</span>
                    </div>
                    <div className="flex justify-between border-b border-purple-800/50 pb-1">
                      <span className="text-purple-400">SYNC:</span>
                      <span className="text-pink-400">98.7%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Event Data */}
              <div className="md:col-span-2 space-y-4">
                
                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-purple-900/60 to-black/60 border border-cyan-400/40 rounded-lg p-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/40"></div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-cyan-300" />
                      <span className="text-purple-300 text-xs">MEMBERS</span>
                    </div>
                    <div className="text-lg font-bold text-cyan-300">{eventData.memberCount || 0}</div>
                    <div className="text-xs text-purple-400">CONNECTED</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-900/60 to-black/60 border border-pink-400/40 rounded-lg p-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-pink-400/40"></div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-4 h-4 text-pink-400" />
                      <span className="text-purple-300 text-xs">ROUNDS</span>
                    </div>
                    <div className="text-lg font-bold text-pink-300">{eventData.noOfRounds || 0}</div>
                    <div className="text-xs text-purple-400">REMAINING</div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="bg-gradient-to-br from-purple-900/40 via-black/40 to-pink-900/20 border border-cyan-400/30 rounded-lg p-4">
                  <h3 className="text-cyan-300 text-sm mb-3 flex items-center tracking-wider">
                    <Database className="w-4 h-4 mr-2" />
                    EVENT_DATA
                  </h3>
                  
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-purple-400 mb-1">CATEGORY:</div>
                        <div className="text-cyan-300 font-bold">HACKATHON</div>
                      </div>
                      <div>
                        <div className="text-purple-400 mb-1">DIFFICULTY:</div>
                        <div className="text-pink-300 font-bold">EXTREME</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-purple-400 mb-1">STATUS:</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-cyan-300 font-bold">ACTIVE</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-purple-400 mb-1">NEURAL_HASH:</div>
                      <div className="text-cyan-400 font-mono text-xs break-all">
                        {eventData.eventId?.replace(/-/g, '').slice(0, 16).toUpperCase()}...
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Status */}
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
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-400/50 hover:from-cyan-800/40 hover:to-purple-800/40 text-cyan-300 font-bold py-3 rounded-lg transition-all duration-300 text-sm tracking-wider hover:border-cyan-300/70 hover:shadow-lg hover:shadow-cyan-400/20">
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