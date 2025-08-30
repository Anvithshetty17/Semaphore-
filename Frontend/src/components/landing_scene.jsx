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

  // Camera roaming path: list of { position, lookAt }
  // Camera path: top view at center, then circular top views at ends
  const cameraPath = useMemo(() => {
    const center = [0, 0, 0];
    const topHeight = 200;
    const radius = 120;
    const N = 8;
    // Top view at center
    const middle = { position: [0, topHeight, 0], lookAt: center };
    // Circle around center (top views from sides)
    const circle = Array.from({ length: N }, (_, i) => {
      const angle = (2 * Math.PI * i) / N;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return { position: [x, topHeight, z], lookAt: center };
    });
    // Path: start at one side, go to center, then to other sides
    return [circle[0], middle, ...circle.slice(1), circle[0]];
  }, []);

  // Helper to interpolate between two vectors
  function lerpVec3(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  useFrame((_state, delta) => {
    // Camera logic: top view at center (middle scroll), circular top views at ends
    if (cameraRef.current && cameraPath.length > 1) {
      // Map scroll.offset: 0 = first side, 0.5 = center, 1 = last side
      const n = cameraPath.length - 1;
      const t = scroll.offset * n;
      const idx = Math.floor(t);
      const lerpT = t - idx;
      const from = cameraPath[idx];
      const to = cameraPath[Math.min(idx + 1, n)];
      const pos = lerpVec3(from.position, to.position, lerpT);
      const look = lerpVec3(from.lookAt, to.lookAt, lerpT);
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
