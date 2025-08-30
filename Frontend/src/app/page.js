"use client";

import CyberpunkLoader, { LandingPageLoader } from "@/components/landing_page_loader";
import { LandingScene } from "@/components/landing_scene";
import { NavigationButtons } from "@/components/navigation_buttons";
import { RocketLoader } from "@/components/model_components/rocket_loader";
import { Stars } from "@/components/stars";
import { useQueryConfig } from "@/config/useQuery.config";
import { useGetData } from "@/hooks/useGetData";
import { Html, ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

// const LandingScene = dynamic(() => import('@/components/landing_scene'), {
//   ssr: false,
//   loading: () => <LandingPageLoader />,
//   suspense: true,
// })

// const Stars = dynamic(() => import('@/components/stars'), {
//   ssr: false,
//   loading: () => <RocketLoader />,
//   suspense: true,
// })

// extend({ LandingScene, Stars })

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { data: eventsData, isLoading: isEventsLoading } = useGetData(
    "eventsList",
    `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/FindAll`,
    useQueryConfig
  );
  // real asset loading progress from drei
  const { progress: gltfProgress, active } = useProgress();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (gltfProgress >= 100 && !active) {
      // small delay for smooth exit
      const t = setTimeout(() => setShowLoader(false), 400);
      return () => clearTimeout(t);
    }
  }, [gltfProgress, active]);

  return (
    <>
      {showLoader && (
        <CyberpunkLoader
          externalProgress={gltfProgress}
          onLoadComplete={() => setShowLoader(false)}
          active={showLoader}
        />
      )}

      {/* 2D Navigation Buttons Overlay */}
      {!showLoader && <NavigationButtons />}

      <Canvas>
        <ScrollControls pages={10}>
          <Suspense fallback={null}>
            <LandingScene eventsData={eventsData} />
            <Stars />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </>
  );
}
