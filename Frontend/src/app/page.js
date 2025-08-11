'use client'

import { LandingPageLoader } from "@/components/landing_page_loader";
import { LandingScene } from "@/components/landing_scene";
import { RocketLoader } from "@/components/model_components/rocket_loader";
import { Stars } from "@/components/stars";
import { useQueryConfig } from "@/config/useQuery.config";
import { useGetData } from "@/hooks/useGetData";
import { Html, ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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

  const isMobile = useMediaQuery({ maxWidth: 768 })

  const { data: eventsData, isLoading: isEventsLoading } = useGetData(
    'eventsList',
    `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/FindAll`,
    useQueryConfig,
  );
  return (
    <>

      <Suspense fallback={<LandingPageLoader />} >
        <Canvas>
          <ScrollControls pages={10} >
            <LandingScene eventsData={eventsData} />
            <Stars />
          </ScrollControls>
        </Canvas >
      </Suspense>
    </>
  );
}
