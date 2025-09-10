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
  const { data: eventsList, isLoading: isEventsLoading, error: eventsError } = useGetData(
    "eventsList",
    `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/FindAll`,
    useQueryConfig
  );

  const { token } = useAuthStore();

  // Enriched list with rules (fetched in parallel per event)
  const { data: enrichedEvents, isLoading: isRulesLoading, error: rulesError } = useQuery(
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
            console.warn(`Failed to fetch rules for event ${ev.eventId}:`, e);
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
      retry: 3, // Retry failed requests
    }
  );

  // Unified events data (once rules fetched each event will have eventRules[])
  const eventsData = enrichedEvents || eventsList;
  
  // Combined loading flag (base list or rules enrichment pending)
  const isLoadingCombined = isEventsLoading || (Array.isArray(eventsList) && !enrichedEvents && isRulesLoading);

  // Real asset loading progress from drei
  const { progress: gltfProgress, active } = useProgress();
  
  // Loading states
  const [showLoader, setShowLoader] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [drawerEventId, setDrawerEventId] = useState(null);
  const [dataLoadingComplete, setDataLoadingComplete] = useState(false);
  const [assetsLoadingComplete, setAssetsLoadingComplete] = useState(false);

  // Monitor data loading completion
  useEffect(() => {
    if (!isLoadingCombined && eventsData && eventsData.length > 0) {
      console.log("✅ Data loading completed - Events:", eventsData.length);
      setDataLoadingComplete(true);
    } else if (eventsError || rulesError) {
      console.warn("⚠️ Data loading error, proceeding with fallback");
      setDataLoadingComplete(true); // Allow proceeding even with errors
    }
  }, [isLoadingCombined, eventsData, eventsError, rulesError]);

  // Monitor asset loading completion
  useEffect(() => {
    if (gltfProgress >= 100 && !active && sceneReady) {
      console.log("✅ Assets loading completed - Progress:", gltfProgress);
      setAssetsLoadingComplete(true);
    }
  }, [gltfProgress, active, sceneReady]);

  // Hide loader only when both data and assets are ready
  useEffect(() => {
    if (dataLoadingComplete && assetsLoadingComplete) {
      console.log("🚀 All loading completed - Showing landing page");
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 500); // Small delay for smooth transition
      return () => clearTimeout(timer);
    }
  }, [dataLoadingComplete, assetsLoadingComplete]);

  // Error handling
  const hasErrors = eventsError || rulesError;
  if (hasErrors && !showLoader) {
    console.error("❌ Critical errors detected:", { eventsError, rulesError });
  }

  return (
    <>
      {showLoader && (
        <CyberpunkLoader
          externalProgress={gltfProgress}
          onLoadComplete={() => setShowLoader(false)}
          active={showLoader}
          dataLoading={!dataLoadingComplete}
          assetsLoading={!assetsLoadingComplete}
          loadingStages={{
            data: dataLoadingComplete,
            assets: assetsLoadingComplete,
            scene: sceneReady
          }}
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
                  INITIALIZING_NEURAL_MATRIX...
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

      {/* Debug Info (only in development) */}
     </>
  );
}
