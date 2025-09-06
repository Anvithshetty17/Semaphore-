"use client";
import { CityNeonModel } from "./cityneon2";
import { PerspectiveCamera, useScroll, Image, Billboard, Text, RoundedBox, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from 'next/navigation';
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// AnimatedPulseCircle: sonar/halogen pulse effect for the billboard button
function AnimatedPulseCircle() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pulse = (t % 1.5) / 1.5; // 0..1
    meshRef.current.scale.setScalar(1.5 + pulse * 1.2);
    if (meshRef.current.material) {
      meshRef.current.material.opacity = 0.25 * (1 - pulse);
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -0.05]}>
      <circleGeometry args={[1.7, 64]} />
      <meshStandardMaterial
        color="#00eaff"
        emissive="#00eaff"
        emissiveIntensity={0.7}
        transparent
        opacity={0.25}
        metalness={0.7}
        depthWrite={false}
      />
    </mesh>
  );
}

const LandingScene = ({ eventsData, onEventSelect }) => {
  const cameraRef = useRef();
  const scroll = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showPixelBg, setShowPixelBg] = useState(false);
  console.log("Events Data in LandingScene:", eventsData);

 // Camera waypoints 
  const cameraPositions = [isMobile ? { position: [110, 65, -16], lookAt: [0, 52, 0] } //starting from semaphore 
    : { position: [80, 65, -10], lookAt: [0, 52, 0] }, //starting from semaphore 
  { position: [70, 63, -10], lookAt: [0, 52, 0] },//semaphore zooming
  { position: [68, 63, -10], lookAt: [-5, 30, 0] }, //zoom + look down 
  { position: [63, 63, -10], lookAt: [-20, -40, 0], duration: 0.2 }, //look down  

  //IT quiz building
  { position: [76, 14, -20], lookAt: [80, 35, 120] }, //bottom 
  { position: [75.5, 12, -16], lookAt: [80, 105, 120] }, //Top

  //surprise event buiding 
  { position: [75, 12, -12], lookAt: [20, 30, 38] }, //far view 
  { position: [65, 12, -4.4], lookAt: [20, 45, 45] }, //near view 

  //Photography Cyber scope 
  { position: [70, 12, 19], lookAt: [83, 30, -60] }, //far view 
  { position: [69.5, 25, 4], lookAt: [85.5, 25, -60] }, //near view 

  //Cyborg recruit IT manager 
  { position: [58, 27, 20], lookAt: [70, 40, -60] }, //far view 
  { position: [61, 27, 11], lookAt: [67, 40, -60] }, //near view 

  //Rythm Hack dance event 
  { position: [77, 16, 7], lookAt: [27, 25, -60] }, //far view 
  { position: [75, 16, 4], lookAt: [27, 30, -60] }, //near view 

  //Hyper Launch Startup 
  { position: [58, 16, 5], lookAt: [27, 50, -60] }, //far view 
  { position: [52, 22, -3], lookAt: [33, 50, -60] }, //near view 
  { position: [52, 35, -3], lookAt: [33, 25, -60] }, //top view 

  // Cryptix coding event
  { position: [62, 44, -12], lookAt: [33, 37, 0] }, //near left view 
  { position: [42, 38, -10], lookAt: [43, 52, 10] }, //near down view 
  { position: [42, 28, -20], lookAt: [43, 52, 10] }, //far down view 

  //techno hive tech talk
  { position: [52, 22, -13], lookAt: [3, 20, -10] }, //near view 
  { position: [30, 17, 6], lookAt: [-7, 25, -20] }, //near view

  //Rampage Horizon Gaming 
  { position: [26, 12, 13], lookAt: [7, 66, -50] }, //far view 
  { position: [19, 30, 1], lookAt: [14, 45, -50] }, //left near view 
  { position: [45, 30, -10], lookAt: [-25, 45, -30] }, //right near view 

  //Design riot
  { position: [40, 30, -24], lookAt: [-55, 35, -42] }, //near left view 
  { position: [40, 34, -44], lookAt: [-55, 35, 0] }, //near front view 
  { position: [60, 34, -48], lookAt: [-55, 25, -7] }, //far view 
// Close to clouds, looking at cloud center
   // Look at pixel background from angle
   { position: [0, 130, 0], lookAt: [0, 0, 0] },
  { position: [0, 200, 0], lookAt: [0, 0, 0] }, // Close to pixel background, looking at it
    //black mist
  ];

  
  // Calculate which camera position we're at
  const totalPositions = cameraPositions.length;
  const pixelBgPosition = totalPositions - 3; // Show pixel bg at third to last position
  
  // Info button guided waypoints
  const infoWaypoints = [
    { position: [73, 33, 15], lookAt: [10, 20, 60], eventId: '2eabcb89-9cd4-4e2d-8ee0-d2242512c892' }, // Cryptix
    { position: [76, 20, -15], lookAt: [80, 35, 120], eventId: '12b54267-ad2f-428d-9e65-07ba4a3a6215' }, // Design Riot
    { position: [65, 18, -2], lookAt: [20, 45, 45], eventId: 'd69012b5-e528-44c6-b897-d13b24d1acb2' }, // Rampage Horizon
    { position: [69, 28, 12], lookAt: [85, 25, -60], eventId: '09512d66-191b-4402-b655-6052a0ca9285' }, // Neon Nexus
    { position: [60, 32, 15], lookAt: [67, 40, -60], eventId: '2b2841b8-df3b-4719-837a-497653a1af92' }, // Techno Hive
    { position: [75, 22, 6], lookAt: [27, 30, -60], eventId: 'b17091f5-5643-47f8-90b2-94e80b007576' }, // Spectra Flux
    { position: [54, 26, 0], lookAt: [33, 50, -60], eventId: 'ad630e52-bc20-40ce-abe0-18644eddacc2' }, // Cyborg Recruit
    { position: [26, 26, 8], lookAt: [7, 66, -50], eventId: '4f20822b-157f-4794-9f49-3878f5b64050' }, // Hyper Launch
  ];

  function lerpVec3(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  const scrollIndicatorRef = useRef();
  const [hideIndicator, setHideIndicator] = useState(false);

  useFrame((state) => {
    const offset = scroll.offset; // 0..1
    const currentPosition = offset * (totalPositions - 1);

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

    // Show pixel background when approaching the pixel bg area
    if (currentPosition >= pixelBgPosition - 0.5) {
      if (!showPixelBg) setShowPixelBg(true);
    } else {
      if (showPixelBg) setShowPixelBg(false);
    }

    // Scroll indicator logic (fade instantly on scroll)
    if (scrollIndicatorRef.current) {
      const progress = offset; // 0..1
      const opacity = progress > 0 ? 0 : 1;
      scrollIndicatorRef.current.style.opacity = opacity;
      scrollIndicatorRef.current.style.transform = `translate(-50%, 0) translateY(${Math.sin(state.clock.getElapsedTime() * 3) * 8}px)`;
    }
  });

  const logoRef = useRef();

  useFrame(() => {
    if (logoRef.current) {
      logoRef.current.rotation.set(-Math.PI / 2, 0, 0); // Always face upwards
    }
  });

  return (
    <>
       {/* Dark background */}
<color attach="background" args={["#000000"]} />

{/* Minimal ambient light (almost dark) */}
<ambientLight intensity={0.01} />

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

      <CityNeonModel position={[0.22, 0.4, -0.01]} onPointerOver={() => setLoading(false)} onPointerMove={() => setLoading(false)} />

      {/* Logo, Quote, and Register Button Group - faces upwards */}
      <group position={[0, 140, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Semaphore logo */}
        <Image
          url={"/images/semaphore_logo.png"}
          position={[0, 5, 0]}
          scale={[14, 14, 1]}
          transparent
        />
        {/* Fest Quote */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.45}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Dosis-Bold.ttf"
          outlineWidth={0.08}
          outlineColor="#00eaff"
          maxWidth={isMobile?40:80}
          textAlign="center"
        >
          "Where Innovation Meets Celebration - Join the Ultimate Tech Festival!"
        </Text>
        {/* Neon Holo Register Button */}
        <Billboard position={[0, -6, 0]}>
          <group
            onClick={(e) => { e.stopPropagation(); router.push('/register'); }}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { document.body.style.cursor = 'default'; }}
          >
            {/* Outer holographic ring */}
            <mesh>
              <boxGeometry args={[9.5, 3.2, 0.2]} />
              <meshStandardMaterial
                color="#00faff"
                emissive="#00faff"
                emissiveIntensity={0.9}
                transparent
                opacity={0.35}
                metalness={1}
                roughness={0.2}
              />
            </mesh>
            {/* Inner border */}
            <mesh>
              <boxGeometry args={[8.8, 2.6, 0.2]} />
              <meshStandardMaterial
                color="#07e1ff"
                emissive="#07e1ff"
                emissiveIntensity={0.6}
                transparent
                opacity={0.25}
                metalness={1}
                roughness={0.3}
              />
            </mesh>
            {/* Button background */}
            <mesh position={[0,0,-0.05]}>
              <boxGeometry args={[8.2, 2.2, 0.1]} />
              <meshStandardMaterial
                color="#021014"
                emissive="#00c8ff"
                emissiveIntensity={0.08}
                transparent
                opacity={0.85}
                metalness={0.5}
                roughness={0.6}
              />
            </mesh>
            {/* Button Text */}
            <Text
              position={[0, 0, 0.21]}
              fontSize={1.1}
              color="#bff7ff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Dosis-Bold.ttf"
              outlineWidth={0.05}
              outlineColor="#00eaff"
            >
              REGISTER NOW
            </Text>
          </group>
        </Billboard>
      </group>

      {/* Scroll Down Indicator (HTML overlay as mouse icon, lower position, instant fade) */}
      <Html
        ref={scrollIndicatorRef}
        center
        transform={false}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: isMobile ? '-400px' : '-300px', // much lower
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'opacity 0.08s linear', // very fast
          opacity: 1,
          zIndex: 10,
        }}
        sprite={false}
        zIndexRange={[10, 0]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Simple mouse SVG icon */}
          <svg width={isMobile ? 32 : 40} height={isMobile ? 48 : 56} viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="4" width="24" height="48" rx="12" stroke="#fff" strokeWidth="3" fill="rgba(0,0,0,0.2)" />
            <circle cx="20" cy="18" r="3" fill="#fff" />
          </svg>
        </div>
      </Html>


      {/* Info icons: circular halogen buttons with animated sonar pulse for each waypoint */}
      {infoWaypoints.map((waypoint, index) => (
        <Billboard key={index} position={waypoint.position}>
          <group>
            <AnimatedPulseCircle />
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                console.log('Info button clicked for event:', waypoint.eventId);
                if (onEventSelect) {
                  onEventSelect(waypoint.eventId);
                }
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'default';
              }}
            >
              <circleGeometry args={[1.5, 64]} />
              <meshStandardMaterial 
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.7}
                transparent
                opacity={0.85}
                metalness={0.6}
              />
            </mesh>
            <Text
              position={[0, 0, 0.2]}
              fontSize={1.6}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Dosis-Bold.ttf"
              outlineWidth={0.08}
              outlineColor="#00eaff"
            >
              i
            </Text>
          </group>
        </Billboard>
      ))}

      <PerspectiveCamera ref={cameraRef} fov={30} makeDefault />

       <EffectComposer multisampling={4}>
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
