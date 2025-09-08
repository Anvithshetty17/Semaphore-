"use client";

import CyberpunkLoader, { LandingPageLoader } from "@/components/landing_page_loader";
import { LandingScene } from "@/components/landing_scene";
import { NavigationButtons } from "@/components/navigation_buttons";
import CyberpunkDrawer from "@/components/event_details_component";
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
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthStore } from "@/store";
import { config as headerConfig } from "@/config/header.config";

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

  // Base list (without rules)
  const { data: eventsList, isLoading: isEventsLoading } = useGetData(
    "eventsList",
    `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/FindAll`,
    useQueryConfig
  );

  const { token } = useAuthStore();

  // Enriched list with rules (fetched in parallel per event)
  const { data: enrichedEvents, isLoading: isRulesLoading } = useQuery(
    ["eventsList", "withRules"],
    async () => {
      if (!Array.isArray(eventsList) || eventsList.length === 0) return eventsList || [];
      const results = await Promise.all(
        eventsList.map(async (ev) => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/FindEventRules?eventId=${ev.eventId}`,
              headerConfig(token)
            );
            const evWithRules = res.data;
            return {
              ...ev,
              eventRules: evWithRules.eventRules || [],
              eventHeads: evWithRules.eventHeads || ev.eventHeads,
            };
          } catch (e) {
            // Fallback: return original event if rules fetch fails
            return { ...ev, eventRules: ev.eventRules || [] };
          }
        })
      );
      return results;
    },
    {
      enabled: Array.isArray(eventsList) && eventsList.length > 0,
      staleTime: 1000 * 60, // 1 min
    }
  );

  // Unified events data (once rules fetched each event will have eventRules[])
  const eventsData = enrichedEvents || eventsList;
  // Combined loading flag (base list or rules enrichment pending)
  const isLoadingCombined = isEventsLoading || (Array.isArray(eventsList) && !enrichedEvents && isRulesLoading);

  // real asset loading progress from drei
  const { progress: gltfProgress, active } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [drawerEventId, setDrawerEventId] = useState(null);

  useEffect(() => {
    // Only hide when assets downloaded AND first frame signaled
    if (sceneReady && gltfProgress >= 100 && !active) {
      const t = setTimeout(() => setShowLoader(false), 200); // shorter delay
      return () => clearTimeout(t);
    }
  }, [gltfProgress, active, sceneReady]);

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
          <Suspense
            fallback={
              <Html center>
                <div className="text-cyan-300 text-xs tracking-widest animate-pulse bg-black/60 px-4 py-2 rounded border border-cyan-500/40">
                  INITIALIZING_SCENE//...
                </div>
              </Html>
            }>
            <LandingScene
              eventsData={eventsData}
              onEventSelect={setDrawerEventId}
              isLoadingEvents={isLoadingCombined}
              onFirstFrame={() => setSceneReady(true)}
            />
            <Stars />
          </Suspense>
        </ScrollControls>
      </Canvas>

      {/* CyberpunkDrawer: event details drawer, outside Canvas */}
      {drawerEventId && (
        <CyberpunkDrawer eventId={drawerEventId} eventsData={eventsData} onClose={() => setDrawerEventId(null)} />
      )}
    </>
  );
}
