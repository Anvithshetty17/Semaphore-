import Image from "next/image"
import { useState } from "react"

const LandingPageLoader = () => {

    const [index, setIndex] = useState(0)
    const loaderTextOptions = [
        'Get ready to launch into the void !',
        'Setting up space environment ... ',
        'Loading Assets ... ',
        'Preparing Space Ship ... ',
        'Launching soon ... ',
        'Experience space at your fingertips'
    ]
    const [loaderText, setLoaderText] = useState(loaderTextOptions[0])

    setTimeout(() => {
        setIndex(index + 1)
        setLoaderText(loaderTextOptions[index % loaderTextOptions.length])
    }, 10000)

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
            <Image className="rounded-full" src={"/images/semaphore_logo.jpeg"} height={200} width={200} alt="Semaphore Logo" />
            <p className="text-[30px] lg:text-[50px] font-funkrocker text-white mt-3">Semaphore 2K24</p>
            <p className="text-[15px] lg:text-[20px] font-dosisMedium text-white mt-10">{loaderText}</p>
        </div>
    )
}

export { LandingPageLoader }