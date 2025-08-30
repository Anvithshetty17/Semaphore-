"use client";
import { CityNeonModel } from "./cityneon2";
import { PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useMediaQuery } from "react-responsive";

const LandingScene = ({ eventsData }) => {
  // Camera ref for direct control
  const cameraRef = useRef();
  const scroll = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Easy to modify camera positions
  const cameraPositions = [
    // Position 1: Front view
    { position: [120, 100, 0], lookAt: [0, 50, 0] },

    // Position 2: Right side view
    { position: [85, 200, 85], lookAt: [0, 0, 0] },

    // Position 3: Back-right view
    { position: [0, 200, 120], lookAt: [0, 0, 0] },

    // Position 4: Back view
    { position: [-85, 200, 85], lookAt: [0, 0, 0] },

    // Position 5: Back-left view
    { position: [-120, 200, 0], lookAt: [0, 0, 0] },

    // Position 6: Left side view
    { position: [-85, 200, -85], lookAt: [0, 0, 0] },

    // Position 7: Front-left view
    { position: [0, 200, -120], lookAt: [0, 0, 0] },

    // Position 8: Front-right view
    { position: [85, 200, -85], lookAt: [0, 0, 0] },

    // Position 9: Top center view
    { position: [0, 200, 0], lookAt: [0, 0, 0] },

    // Position 10: Return to front view (smooth loop)
    { position: [120, 200, 0], lookAt: [0, 0, 0] },
  ];

  // Helper to interpolate between two vectors
  function lerpVec3(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  useFrame((_state, delta) => {
    // Camera logic: smoothly interpolate between positions based on scroll
    if (cameraRef.current && cameraPositions.length > 1) {
      // Map scroll.offset to camera positions
      const totalPositions = cameraPositions.length - 1;
      const t = scroll.offset * totalPositions;
      const currentIndex = Math.floor(t);
      const lerpFactor = t - currentIndex;

      // Get current and next camera positions
      const fromPos = cameraPositions[currentIndex];
      const toPos = cameraPositions[Math.min(currentIndex + 1, totalPositions)];

      // Interpolate camera position and lookAt
      const pos = lerpVec3(fromPos.position, toPos.position, lerpFactor);
      const look = lerpVec3(fromPos.lookAt, toPos.lookAt, lerpFactor);

      // Apply to camera
      cameraRef.current.position.set(...pos);
      cameraRef.current.lookAt(...look);
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <CityNeonModel position={[0.22, 0.4, -0.01]} />
      {/* Camera roaming: controlled by scroll */}
      <PerspectiveCamera ref={cameraRef} fov={30} makeDefault />
    </>
  );
};

export { LandingScene };
