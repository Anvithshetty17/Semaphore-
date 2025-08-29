
'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const CyberpunkLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [glitchText, setGlitchText] = useState("SEMAPHORE")
  const [isComplete, setIsComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const loadingPhases = [
    { text: "INITIALIZING NEURAL NETWORKS...", duration: 800 },
    { text: "CONNECTING TO CYBERNET...", duration: 1000 },
    { text: "LOADING 3D ASSETS...", duration: 1200 },
    { text: "CALIBRATING HOLOGRAPHIC DISPLAY...", duration: 900 },
    { text: "SYNCHRONIZING DATA STREAMS...", duration: 700 },
    { text: "ACTIVATING CYBERPUNK PROTOCOL...", duration: 600 },
    { text: "SEMAPHORE 2K25 READY", duration: 500 }
  ]

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  const originalText = "SEMAPHORE"

  useEffect(() => {
    // Responsive check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const glitched = originalText
          .split('')
          .map(char => Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('')
        setGlitchText(glitched)
        setTimeout(() => setGlitchText(originalText), 100)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let progressTimer
    let phaseTimer
    const simulateLoading = () => {
      if (currentPhase < loadingPhases.length) {
        const phase = loadingPhases[currentPhase]
        const increment = 100 / loadingPhases.length
        const stepDuration = phase.duration / increment
        progressTimer = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + (increment / (phase.duration / 50))
            if (newProgress >= (currentPhase + 1) * increment) {
              clearInterval(progressTimer)
              return (currentPhase + 1) * increment
            }
            return newProgress
          })
        }, 50)
        phaseTimer = setTimeout(() => {
          setCurrentPhase(prev => prev + 1)
        }, phase.duration)
      } else {
        setIsComplete(true)
        setTimeout(() => {
          onLoadComplete && onLoadComplete()
        }, 1000)
      }
    }
    simulateLoading()
    return () => {
      clearInterval(progressTimer)
      clearTimeout(phaseTimer)
    }
  }, [currentPhase, onLoadComplete])

  const hexCodes = Array.from({ length: 50 }, () => 
    Math.random().toString(16).substr(2, 6).toUpperCase()
  )

  // Image paths
  const bgImg = isMobile ? "/images/loading_bg_mobile.png" : "/images/loading_bg_pc.png"
  const logoImg = "/images/semaphore_logo.png"

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Responsive background image */}
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src={bgImg}
              alt="Loading background"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="100vw"
            />
          </div>

          {/* Matrix-style background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {hexCodes.map((code, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ 
                  y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000, 
                  opacity: [0, 1, 0] 
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute text-cyan-400 font-mono text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              >
                {code}
              </motion.div>
            ))}
          </div>

          {/* Cyberpunk grid overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="h-full w-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
            {/* Logo/Title */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex justify-center mb-4">
                <Image 
                  src={logoImg}
                  alt="SEMAPHORE"
                  width={isMobile ? 200 : 380}
                  height={isMobile ? 40 : 90}
                  priority
                  style={{ filter: 'drop-shadow(0 0 30px #00ffff88)' }}
                />
              </div>
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold font-mono"
                style={{
                  background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                }}
              >
                {glitchText}
              </motion.h1>
              <motion.p 
                className="text-cyan-400 text-xl lg:text-2xl font-mono tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &gt; CYBERPUNK PROTOCOL 2K25 &lt;
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mb-8">
              <div className="relative">
                <div className="h-2 bg-gray-800 border border-cyan-400 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
                    }}
                  />
                </div>
                <motion.div 
                  className="absolute -top-1 -bottom-1 w-1 bg-white shadow-lg"
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>
              <div className="flex justify-between text-cyan-400 text-sm font-mono mt-2">
                <span>0%</span>
                <span className="text-purple-400">{Math.round(progress)}%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Loading Phase Text */}
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <p className="text-green-400 text-lg font-mono mb-2">
                {loadingPhases[currentPhase]?.text || "READY"}
              </p>
              <motion.div 
                className="flex justify-center space-x-1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ 
                      duration: 0.6, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* System Info */}
            <div className="absolute bottom-8 left-8 font-mono text-xs text-gray-500">
              <p>&gt; NEURAL_NET_STATUS: ONLINE</p>
              <p>&gt; QUANTUM_STATE: SYNCHRONIZED</p>
              <p>&gt; MEMORY_BANKS: OPTIMAL</p>
            </div>

            {/* Version Info */}
            <div className="absolute bottom-8 right-8 font-mono text-xs text-gray-500">
              <p>CYBERPUNK.OS v2025.8.12</p>
              <p>BUILD: ALPHA_7_NEXUS</p>
            </div>

            {/* Scan lines effect */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 255, 255, 0.03) 2px,
                  rgba(0, 255, 255, 0.03) 4px
                )`
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Backwards compatibility exports
// Named export originally expected by page.js: LandingPageLoader
const LandingPageLoader = CyberpunkLoader

export { CyberpunkLoader, LandingPageLoader }
export default CyberpunkLoader
