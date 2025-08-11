'use client'
import { useRouter } from "next/navigation"

const Error = () => {

    const router = useRouter()
    return (
        <>
            <div className="flex flex-col w-screen h-screen overflow-hidden bg-gradient-to-br from-[#000080] to-[#00001A] items-center justify-center">
                <div
                    className="flex flex-col items-center w-full max-w-sm mx-4 lg:mx-auto bg-white p-8 rounded-lg shadow-lg"
                >
                    <h3 className="font-dosisBold text-[25px] text-red-500"> Error ! </h3>
                    <p className="font-dosisMedium text-md text-center mt-4"> Sorry ! You donot have access to this page .</p>
                    <div className="flex justify-center w-full mt-10">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 font-dosisMedium"
                            type="submit"
                            onClick={() => router.push('/login')}
                        >
                            Go To Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Error