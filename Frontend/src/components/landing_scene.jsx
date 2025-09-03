"use client";
import { CityNeonModel } from "./cityneon2";
import { PerspectiveCamera, useScroll, Image, Billboard, Text, RoundedBox, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const LandingScene = ({ eventsData }) => {
  const cameraRef = useRef();
  const scroll = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Camera waypoints
  const cameraPositions = [
    { position: [110, 60, -10], lookAt: [0, 50, 0] },
    { position: [70, 60, -10], lookAt: [-10, 60, 0] },
    { position: [60, 60, -10], lookAt: [-10, -10, 0] },
    { position: [90, 15, 15], lookAt: [-10, 10, 0] },
    { position: [78, 15, -20], lookAt: [80, 25, 70] },


  ];

  // Info button guided waypoints
  const infoWaypoints = [
    { position: [80, 20, 15], lookAt: [-10, 10, 0] },
    { position: [78, 22, 18], lookAt: [-10, 10, 0] },
    { position: [82, 19, 14], lookAt: [-10, 10, 0] },
    { position: [85, 21, 12], lookAt: [-10, 10, 0] },
  ];

  function lerpVec3(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  const infoGroupRef = useRef();
  const scrollIndicatorRef = useRef();
  const [hideIndicator, setHideIndicator] = useState(false);

  useFrame((state) => {
    const offset = scroll.offset; // 0..1

    // Camera interpolation
    if (cameraRef.current && cameraPositions.length > 1) {
      const total = cameraPositions.length - 1;
      const t = offset * total;
      const currentIndex = Math.floor(t);
      const lerpFactor = t - currentIndex;
      const fromPos = cameraPositions[currentIndex];
      const toPos = cameraPositions[Math.min(currentIndex + 1, total)];
      const pos = lerpVec3(fromPos.position, toPos.position, lerpFactor);
      const look = lerpVec3(fromPos.lookAt, toPos.lookAt, lerpFactor);
      cameraRef.current.position.set(...pos);
      cameraRef.current.lookAt(...look);
    }

    // Info button interpolation + bounce
    if (infoGroupRef.current && infoWaypoints.length > 0) {
      const totalInfo = infoWaypoints.length - 1;
      const tInfo = offset * totalInfo;
      const idxInfo = Math.floor(tInfo);
      const lerpInfo = tInfo - idxInfo;
      const fromInfo = infoWaypoints[idxInfo];
      const toInfo = infoWaypoints[Math.min(idxInfo + 1, totalInfo)];
      const basePos = toInfo ? lerpVec3(fromInfo.position, toInfo.position, lerpInfo) : fromInfo.position;
      const look = toInfo ? lerpVec3(fromInfo.lookAt, toInfo.lookAt, lerpInfo) : fromInfo.lookAt;

      const time = state.clock.getElapsedTime();
      const bounceAmplitude = 0.6;
      const bounceSpeed = 3;
      const bounce = Math.sin(time * bounceSpeed) * bounceAmplitude;

      infoGroupRef.current.position.set(basePos[0], basePos[1] + bounce, basePos[2]);
      infoGroupRef.current.lookAt(...look);

      const scalePulse = 1 + Math.sin(time * 4) * 0.05;
      infoGroupRef.current.scale.set(scalePulse, scalePulse, scalePulse);
    }

    // Scroll indicator logic (fades & hides after user scrolls)
    if (scrollIndicatorRef.current) {
      const progress = offset; // 0..1
      const fadeStart = 0.05; // start fading shortly after first movement
      const fadeEnd = 0.2; // fully gone
      if (progress > fadeEnd && !hideIndicator) setHideIndicator(true);
      const opacity = hideIndicator ? 0 : progress < fadeStart ? 1 : Math.max(0, 1 - (progress - fadeStart) / (fadeEnd - fadeStart));
      scrollIndicatorRef.current.style.opacity = opacity;
      scrollIndicatorRef.current.style.transform = `translate(-50%, 0) translateY(${Math.sin(state.clock.getElapsedTime() * 3) * 8}px)`;
    }
  });

  return (
    <>
     {/* Dark background */}
<color attach="background" args={["#000000"]} />

{/* Minimal ambient light (almost dark) */}
<ambientLight intensity={0.02} />

{/* Neon-style lights */}
<pointLight position={[0, 20, 0]} intensity={2.5} distance={100} color="#00ffff" />
<pointLight position={[10, 10, -10]} intensity={1.5} distance={80} color="#ff00ff" />
<pointLight position={[-10, 5, 10]} intensity={1.2} distance={60} color="#00ff88" />

<fog attach="fog" args={["#000000", 10, 80]} />


{/* Slight rim light so model edges are visible */}
<directionalLight
  position={[5, 15, 10]}
  intensity={0.05}
  color="#ffffff"
/>

      <CityNeonModel position={[0.22, 0.4, -0.01]} />

      {/* Scroll Down Indicator (HTML overlay) */}
      <Html
        ref={scrollIndicatorRef}
        center
        transform={false}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: isMobile ? '40px' : '60px',
          pointerEvents: 'none',
          fontFamily: 'Dosis, sans-serif',
          color: '#fff',
          textAlign: 'center',
          fontSize: isMobile ? '14px' : '16px',
          letterSpacing: '1px',
          transition: 'opacity 0.6s ease',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          fontWeight: 500,
          opacity: 1,
          userSelect: 'none',
        }}
        sprite={false}
        zIndexRange={[10, 0]}
      >
        <div>
          <div>SCROLL DOWN</div>
          <div style={{ fontSize: isMobile ? '22px' : '26px', lineHeight: 1, marginTop: '4px' }}>↓</div>
        </div>
      </Html>

      {/* Guided info button that moves & bounces */}
      <group ref={infoGroupRef} position={infoWaypoints[0].position}>
        <group position={[0, -4.2, 0]}>
          <RoundedBox
            args={[4, 1.2, 0.5]}
            radius={0.25}
            smoothness={4}
            onClick={() => console.log("Info button clicked")}
          >
            <meshStandardMaterial color="#0ea5e9" emissive="#065c80" emissiveIntensity={0.2} />
          </RoundedBox>
          <Text
            position={[0, 0, 0.3]}
            fontSize={0.6}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000"
          >
            Info
          </Text>
        </group>
      </group>

      <PerspectiveCamera ref={cameraRef} fov={30} makeDefault />

      {/* Add bloom post-processing effect */}
      <EffectComposer multisampling={8}>
        <Bloom 
          intensity={1.2}
          kernelSize={2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.4}
        />
      </EffectComposer>
    </>
  );
};

export { LandingScene };
