'use client'
import { useRouter } from "next/navigation"
import Image from 'next/image';

const Error = () => {

    const router = useRouter()
    return (
        <div
    className="flex flex-col w-screen h-screen items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url("/images/error.gif")' }}
>
    <div
        className="flex flex-col items-center w-80 sm:w-96 mx-auto p-8 rounded-xl shadow-xl border-t-4 border-[#ff00ff] transform transition-all duration-300 bg-white/30 backdrop-blur-md"
    >
        {/* Heading and Message */}
        <h3 className="font-dosisBold text-3xl text-[#ff00ff] text-center mb-3">
            Error !
        </h3>
        <p className="font-dosisMedium text-base text-center text-[#000000] leading-relaxed">
            Sorry! You do not have access to this page.
        </p>

        {/* Button */}
        <div className="flex justify-center w-full mt-8">
            <button
                className="w-full bg-[#00ffff] text-black py-3 px-6 rounded-lg text-base font-semibold hover:bg-cyan-400 transition-all duration-300 font-dosisMedium transform hover:scale-105"
                type="submit"
                onClick={() => router.push('/login')}
            >
                Go To Login
            </button>
        </div>
    </div>
</div>
    )

}

export default Error