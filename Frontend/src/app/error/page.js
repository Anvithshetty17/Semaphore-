"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image';

// Two side GIF mirrored layout with central glass panel
export default function ErrorPage() {
    const router = useRouter();
    const gifSrc = '/images/error.gif';
    return (
        <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#0b0012]">
            {/* Left GIF */}
            <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none select-none hidden md:block">
                <div className="w-full h-full opacity-40 animate-pan-slow" style={{backgroundImage:`url(${gifSrc})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'contain'}}></div>
            </div>
            {/* Right GIF (mirrored) */}
            <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none select-none hidden md:block scale-x-[-1]">
                <div className="w-full h-full opacity-40 animate-pan-slow" style={{backgroundImage:`url(${gifSrc})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'contain'}}></div>
            </div>

            {/* Central Card */}
            <div className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl border border-fuchsia-500/50 bg-gradient-to-br from-fuchsia-500/10 via-white/5 to-cyan-400/10 backdrop-blur-xl shadow-[0_0_25px_-5px_rgba(255,0,255,0.4)]">
                <div className="flex flex-col items-center text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-dosisBold tracking-wider bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-sm">Error</h1>
                    <p className="text-sm md:text-base font-dosisMedium text-purple-100/80 leading-relaxed">
                        Sorry! You do not have access to this page or the resource no longer exists.
                    </p>
                    <div className="flex gap-3 w-full pt-2">
                        <button
                            onClick={() => router.push('/login')}
                            className="flex-1 bg-cyan-300 text-black font-dosisMedium py-3 rounded-lg text-sm font-semibold hover:bg-cyan-200 transition-all duration-300 shadow-md hover:shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-[#0b0012]"
                        >
                            Go To Login
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="flex-1 bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-200 font-dosisMedium py-3 rounded-lg text-sm font-semibold hover:bg-fuchsia-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 focus:ring-offset-2 focus:ring-offset-[#0b0012]"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile single GIF background (fallback) */}
            <div className="absolute inset-0 md:hidden opacity-20" aria-hidden="true" style={{backgroundImage:`url(${gifSrc})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'cover'}} />

            <style jsx>{`
                @keyframes pan-slow { 0% { transform: scale(1) translateY(0); } 50% { transform: scale(1.02) translateY(-4px); } 100% { transform: scale(1) translateY(0); } }
                .animate-pan-slow { animation: pan-slow 6s ease-in-out infinite; }
            `}</style>
        </div>
    );
}