import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const LandingPageLoader = () => {
  const [index, setIndex] = useState(0);
  const loaderTextOptions = [
    "Get ready to launch into the void !",
    "Setting up space environment ... ",
    "Loading Assets ... ",
    "Preparing Space Ship ... ",
    "Launching soon ... ",
    "Experience space at your fingertips",
  ];
  const [loaderText, setLoaderText] = useState(loaderTextOptions[0]);

  // GIF duration in ms (update this to match your gif's actual duration)
  const GIF_DURATION = 5000; // e.g. 5 seconds
  const GIF_LOOP_SEGMENT = 2000; // last 2 seconds in ms
  const [loopGif, setLoopGif] = useState(false);
  const gifRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
      setLoaderText(loaderTextOptions[(index + 1) % loaderTextOptions.length]);
    }, 10000);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    // After GIF_DURATION, start looping last 2 seconds
    const timer = setTimeout(() => {
      setLoopGif(true);
    }, GIF_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-black relative">
      {/* Fullscreen GIF background */}
      <img
        ref={gifRef}
        src={"/images/loading.gif"}
        alt="Loading..."
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ objectFit: "cover" }}
        key={loopGif ? "looping" : "normal"}
      />
      {/* Overlay loader text (optional) */}
      <div className="z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Example: Uncomment below to show loader text over GIF */}
        {/* <p className="text-[30px] lg:text-[50px] font-funkrocker text-white mt-3 drop-shadow-lg">Semaphore 2K24</p>
        <p className="text-[15px] lg:text-[20px] font-dosisMedium text-white mt-10 drop-shadow-lg">{loaderText}</p> */}
      </div>
    </div>
  );
};

export { LandingPageLoader };
