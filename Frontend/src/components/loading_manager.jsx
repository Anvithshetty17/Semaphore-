'use client'

import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export function LoadingManager({ children }) {
    const { active, progress, errors, item, loaded, total } = useProgress()
    const [showLoader, setShowLoader] = useState(true)
    const [hasStartedLoading, setHasStartedLoading] = useState(false)
    const [displayProgress, setDisplayProgress] = useState(0)

    useEffect(() => {
        if (active && !hasStartedLoading) {
            setHasStartedLoading(true)
        }
    }, [active, hasStartedLoading])

    useEffect(() => {
        // Smooth progress animation
        const timer = setInterval(() => {
            setDisplayProgress(prev => {
                const diff = progress - prev
                if (Math.abs(diff) < 0.1) {
                    return progress
                }
                return prev + diff * 0.15
            })
        }, 16)

        return () => clearInterval(timer)
    }, [progress])

    useEffect(() => {
        // Hide loader when loading is complete
        if (!active && hasStartedLoading && displayProgress >= 99) {
            const timer = setTimeout(() => {
                setShowLoader(false)
            }, 1500)

            return () => clearTimeout(timer)
        }
    }, [active, hasStartedLoading, displayProgress])

    if (showLoader) {
        return (
            <CyberpunkLoadingScreen 
                progress={displayProgress}
                isActive={active}
                totalItems={total}
                loadedItems={loaded}
                currentItem={item}
                errors={errors}
            />
        )
    }

    return children
}

function CyberpunkLoadingScreen({ 
    progress, 
    isActive, 
    totalItems, 
    loadedItems, 
    currentItem, 
    errors
}) {
    const [phase, setPhase] = useState(0)
    const [glitchText, setGlitchText] = useState("SEMAPHORE")

    const loadingPhases = [
        "INITIALIZING QUANTUM MATRIX...",
        "LOADING NEURAL PATHWAYS...",
        "SYNCHRONIZING 3D ASSETS...",
        "CALIBRATING HOLOGRAPHIC DISPLAY...",
        "ESTABLISHING CYBERNET CONNECTION...",
        "ACTIVATING REALITY ENGINE...",
        "SEMAPHORE PROTOCOL READY"
    ]

    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    const originalText = "SEMAPHORE"

    useEffect(() => {
        // Glitch effect
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
        // Update phase based on progress
        const currentPhase = Math.min(
            Math.floor((progress / 100) * loadingPhases.length), 
            loadingPhases.length - 1
        )
        setPhase(currentPhase)
    }, [progress, loadingPhases.length])

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="cyberpunk-bg"></div>
                <div className="grid-overlay"></div>
                <div className="matrix-rain"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="glitch-text text-6xl lg:text-8xl font-bold mb-4 font-mono">
                        {glitchText}
                    </h1>
                    <p className="text-cyan-400 text-xl font-mono tracking-wider cyber-pulse">
                        &gt; CYBERPUNK PROTOCOL 2K25 &lt;
                    </p>
                </div>

                {/* Progress display */}
                <div className="w-full max-w-lg mb-8">
                    {/* Main progress bar */}
                    <div className="relative mb-4">
                        <div className="h-3 bg-gray-900 border border-cyan-500 rounded-lg overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300 ease-out progress-glow"
                                style={{ 
                                    width: `${Math.max(progress, 5)}%`
                                }}
                            />
                        </div>
                        <div className="flex justify-between text-sm font-mono mt-2 text-cyan-400">
                            <span className="cyber-text">{Math.round(progress)}%</span>
                            <span className="text-green-400 cyber-text">
                                {loadedItems || 0}/{totalItems || 0} assets
                            </span>
                        </div>
                    </div>

                    {/* Current item loading */}
                    {currentItem && (
                        <div className="text-center mb-4">
                            <p className="text-yellow-400 text-sm font-mono cyber-text">
                                &gt; Loading: {currentItem.split('/').pop()}
                            </p>
                        </div>
                    )}

                    {/* Phase indicator */}
                    <div className="text-center">
                        <p className="text-green-400 text-lg font-mono mb-2 cyber-text">
                            {loadingPhases[phase] || loadingPhases[0]}
                        </p>
                        <div className="flex justify-center space-x-1">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 bg-cyan-400 rounded-full loading-dots"
                                    style={{ animationDelay: `${i * 200}ms` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Error display */}
                {errors && errors.length > 0 && (
                    <div className="text-red-400 text-sm font-mono max-w-md text-center">
                        <p className="cyber-text">⚠ Warning: {errors.length} asset(s) failed to load</p>
                    </div>
                )}

                {/* System info */}
                <div className="absolute bottom-8 left-8 font-mono text-xs text-gray-500">
                    <p className="cyber-text">&gt; NEURAL_NET: ONLINE</p>
                    <p className="cyber-text">&gt; ASSETS_LOADED: {loadedItems || 0}/{totalItems || 0}</p>
                    <p className="cyber-text">&gt; MEMORY_USAGE: {Math.round(progress)}%</p>
                </div>

                <div className="absolute bottom-8 right-8 font-mono text-xs text-gray-500 text-right">
                    <p className="cyber-text">CYBERPUNK.OS v2025.8.12</p>
                    <p className="cyber-text">BUILD: NEXUS_ALPHA</p>
                    <p className="cyber-text">STATUS: {progress >= 99 ? 'READY' : 'LOADING'}</p>
                </div>
            </div>

            <style jsx>{`
                .cyberpunk-bg {
                    background: linear-gradient(45deg, 
                        rgba(0, 0, 0, 0.95), 
                        rgba(75, 0, 130, 0.2), 
                        rgba(0, 0, 0, 0.95)
                    );
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }

                .grid-overlay {
                    background-image: 
                        linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px);
                    background-size: 50px 50px;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    opacity: 0.3;
                    animation: gridMove 20s linear infinite;
                }

                .matrix-rain {
                    background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    animation: matrixRain 3s linear infinite;
                    opacity: 0.2;
                }

                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }

                @keyframes matrixRain {
                    0% { transform: translateY(-20px); }
                    100% { transform: translateY(20px); }
                }

                .glitch-text {
                    background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: glitch 2s infinite;
                    text-shadow: 
                        0 0 5px rgba(0, 255, 255, 0.8),
                        0 0 10px rgba(255, 0, 255, 0.6),
                        0 0 15px rgba(255, 255, 0, 0.4);
                }

                .cyber-pulse {
                    animation: cyberPulse 2s ease-in-out infinite;
                }

                .cyber-text {
                    text-shadow: 0 0 5px currentColor;
                    animation: cyberFlicker 3s ease-in-out infinite;
                }

                .progress-glow {
                    box-shadow: 
                        0 0 10px rgba(0, 255, 255, 0.6),
                        inset 0 0 10px rgba(255, 255, 255, 0.2);
                    animation: progressPulse 1s ease-in-out infinite;
                }

                .loading-dots {
                    animation: loadingDots 1.4s ease-in-out infinite both;
                }

                @keyframes glitch {
                    0%, 90%, 100% {
                        transform: translate(0);
                    }
                    20% {
                        transform: translate(-2px, 2px);
                    }
                    40% {
                        transform: translate(-2px, -2px);
                    }
                    60% {
                        transform: translate(2px, 2px);
                    }
                    80% {
                        transform: translate(2px, -2px);
                    }
                }

                @keyframes cyberPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }

                @keyframes cyberFlicker {
                    0%, 95%, 100% { opacity: 1; }
                    96% { opacity: 0.8; }
                    97% { opacity: 0.9; }
                    98% { opacity: 0.85; }
                    99% { opacity: 0.95; }
                }

                @keyframes progressPulse {
                    0%, 100% { 
                        box-shadow: 
                            0 0 10px rgba(0, 255, 255, 0.6),
                            inset 0 0 10px rgba(255, 255, 255, 0.2);
                    }
                    50% { 
                        box-shadow: 
                            0 0 20px rgba(0, 255, 255, 0.8),
                            inset 0 0 15px rgba(255, 255, 255, 0.3);
                    }
                }

                @keyframes loadingDots {
                    0%, 80%, 100% {
                        transform: scale(0);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}
