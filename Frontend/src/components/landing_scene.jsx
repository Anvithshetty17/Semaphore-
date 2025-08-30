"use client";
import { CityNeonModel } from "./cityneon2";
import { PerspectiveCamera, useScroll, Image, Billboard, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const LandingScene = ({ eventsData }) => {
  const cameraRef = useRef();
  const scroll = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const cameraPositions = [
    { position: [110, 60, -10], lookAt: [0, 50, 0] },
    { position: [70, 60, -10], lookAt: [-10, 60, 0] },
    { position: [60, 60, -10], lookAt: [-10, -10, 0] },
    { position: [90, 15, 15], lookAt: [-10, 10, 0] },
  ];

  function lerpVec3(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  useFrame(() => {
    if (cameraRef.current && cameraPositions.length > 1) {
      const total = cameraPositions.length - 1;
      const t = scroll.offset * total; // 0..total
      const currentIndex = Math.floor(t);
      const lerpFactor = t - currentIndex;
      const fromPos = cameraPositions[currentIndex];
      const toPos = cameraPositions[Math.min(currentIndex + 1, total)];
      const pos = lerpVec3(fromPos.position, toPos.position, lerpFactor);
      const look = lerpVec3(fromPos.lookAt, toPos.lookAt, lerpFactor);
      cameraRef.current.position.set(...pos);
      cameraRef.current.lookAt(...look);
    }
  });

  // Image + info button
  const infoPosition = [90, 15, 15];
  const infoLookAt = [-10, 10, 0];
  const infoGroupRef = useRef();

  useFrame(() => {
    if (infoGroupRef.current) infoGroupRef.current.lookAt(...infoLookAt);
  });

  return (
    <>
      <ambientLight intensity={1} />
      <CityNeonModel position={[0.22, 0.4, -0.01]} />

      <group ref={infoGroupRef} position={infoPosition}>
        <Billboard follow={false} lockX={false} lockY={false} lockZ={false}>
          <Image url="/images/event_logos/coding.png" scale={[10, 6, 1]} transparent toneMapped={false} />
        </Billboard>
        <Html distanceFactor={20} position={[0, 4, 0]} center>
          <button
            style={{
              padding: "6px 12px",
              background: "#0ea5e9",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
            }}
            onClick={() => console.log("Info button clicked")}>
            Info
          </button>
        </Html>
      </group>

      <PerspectiveCamera ref={cameraRef} fov={30} makeDefault />
    </>
  );
};

export { LandingScene };
