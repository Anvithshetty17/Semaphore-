"use client";
import { CityNeonModel } from "./cityneon2";
import { PerspectiveCamera, useScroll, Image, Billboard, Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// AnimatedRegisterButton: scale animation for the register button
function AnimatedRegisterButton({ router, isMobile }) {
  const buttonRef = useRef();

  useFrame((state) => {
    if (!buttonRef.current) return;
    const t = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2) * 0.1; // Scale between 0.9 and 1.1
    buttonRef.current.scale.setScalar(scale);
  });

  return (
    <Billboard position={isMobile ? [0, -4.5, 0] : [0, -6.5, 0]}>
      <group
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          router.push("/register");
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}>
        {/* Rectangular Border */}
        <mesh>
          <boxGeometry args={isMobile ? [4, 1.2, 0.1] : [6, 2, 0.1]} />
          <meshStandardMaterial
            color="#00eaff"
            emissive="#00eaff"
            emissiveIntensity={0.5}
            transparent
            opacity={0}
            wireframe={true}
          />
        </mesh>

        {/* Border Lines */}
        <lineSegments>
          <edgesGeometry
            attach="geometry"
            args={isMobile ? [new THREE.BoxGeometry(4, 1.2, 0.1)] : [new THREE.BoxGeometry(6, 2, 0.1)]}
          />
          <lineBasicMaterial attach="material" color="#00eaff" linewidth={3} transparent opacity={0.8} />
        </lineSegments>

        {/* Button Text */}
        <Text
          position={[0, 0, 0.1]}
          fontSize={isMobile ? 0.5 : 0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Dosis-Bold.ttf"
          outlineWidth={0.02}
          outlineColor="#00eaff">
          REGISTER NOW
        </Text>
      </group>
    </Billboard>
  );
}

// AnimatedPulseCircle: sonar/halogen pulse effect for the billboard button
const AnimatedPulseCircle = ({ size }) => {
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
      <circleGeometry args={[0.5 * (size != null ? size : 1), 64]} />
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

const LandingScene = ({ eventsData, onEventSelect, onFirstFrame }) => {
  const cameraRef = useRef();
  const scroll = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showPixelBg, setShowPixelBg] = useState(false);
  const scrollIndicatorRef = useRef();
  const logoRef = useRef();
  const infoIconRef = useRef(); // Ref for <div> info icon

  // console.debug("Events Data in LandingScene:", eventsData);
  const firstFrameRef = useRef(false);

  // Camera waypoints 
  const cameraPositions = [isMobile ? { position: [110, 65, -16], lookAt: [0, 52, 0] } //starting from semaphore 
    : { position: [80, 65, -12], lookAt: [0, 52, 0] }, //starting from semaphore 
  { position: [70, 63, -10], lookAt: [0, 52, 0] },//semaphore zooming
  { position: [68, 63, -10], lookAt: [-5, 30, 0] }, //zoom + look down 
  { position: [63, 63, -10], lookAt: [-20, -40, 0], duration: 0.2 }, //look down  

  //IT quiz building
  { position: [76, 14, -20], lookAt: [80, 35, 120] }, //bottom 
  { position: [77, 12, -16], lookAt: [79, 105, 120] }, //Top

  //surprise event buiding 
  { position: [75, 12, -12], lookAt: [20, 30, 38] }, //far view 
  { position: [67, 12, -7], lookAt: [20, 45, 45] }, //near view 

  //Photography Cyber scope 
  { position: [70, 12, 19], lookAt: [83, 30, -60] }, //far view 
  { position: [68, 25, 4], lookAt: [91, 25, -60] }, //near view 


  //Cyborg recruit IT manager 
  { position: [58, 27, 20], lookAt: [70, 40, -60] }, //far view 
  { position: [63, 27, 11], lookAt: [68, 40, -60] }, //near view 

  //Rythm Hack dance event 
  { position: [80, 16, 11], lookAt: [29, 25, -60] }, //far view 
  { position: [78, 16, 4], lookAt: [27, 30, -60] }, //near view 

  //Hyper Launch Startup 
  { position: [58, 16, 5], lookAt: [30, 50, -60] }, //far view 
  { position: [52, 22, 0], lookAt: [38, 50, -60] }, //near view 
  { position: [52, 35, -3], lookAt: [36, 25, -60] }, //top view 

  // Cryptix coding event
  { position: [62, 44, -12], lookAt: [33, 37, 0] }, //near left view 
  { position: [42, 38, -10], lookAt: [43, 52, 10] }, //near down view 
  { position: [41, 28, -20], lookAt: [43, 52, 10] }, //far down view 

  //techno hive tech talk
  { position: [52, 22, -13], lookAt: [3, 20, -10] }, //near view 
  { position: [29, 17, 8], lookAt: [-4, 25, -20] }, //near view

  //Rampage Horizon Gaming 
  { position: [26, 12, 13], lookAt: [7, 66, -50] }, //far view 
  { position: [19, 30, 1], lookAt: [14, 45, -50] }, //left near view 
  { position: [45, 30, -10], lookAt: [-25, 45, -30] }, //right near view 

  //Design riot
  { position: [40, 30, -24], lookAt: [-55, 35, -42] }, //near left view 
  { position: [40, 34, -44], lookAt: [-55, 35, 0] }, //near front view 
  { position: [60, 34, -48], lookAt: [-55, 25, -7] }, //far view 

  // Close to clouds, looking at cloud center
  { position: [0, 130, 0], lookAt: [0, 0, 0] },
  { position: [0, 200, 0], lookAt: [0, 0, 0] }, // Close to pixel background, looking at it
  ];

  // Info button guided waypoints
  const infoWaypoints = [
    { position: [73.4, 35, 12], lookAt: [85, 25, -60], size: 1, eventId: '09512d66-191b-4402-b655-6052a0ca9285' }, // Neon Nexus
    { position: [55, 22, 3.6], lookAt: [20, 45, 45], size: 0.6, eventId: 'b17091f5-5643-47f8-90b2-94e80b007576' }, // Spectra Flux
    { position: [79.4, 29, -20], lookAt: [85.5, 25, -60], size: 0.6, eventId: 'a72d288b-f9b2-4d5c-b21a-2709170c5228' }, //Cyber scope                                                                                                   
    { position: [68.6, 36.6, -21], lookAt: [68, 40, -60], size: 0.7, eventId: 'ad630e52-bc20-40ce-abe0-18644eddacc2' }, // Cyborg Recruit
    { position: [60.4, 23.4, -23.6], lookAt: [27, 30, -60], size: 0.7, eventId: 'e08fb9c9-b70f-4c15-a971-36d9c83c0baf' },  //Rhythm Hack
    { position: [49.5, 34, -23], lookAt: [36, 25, -60], size: 0.7, eventId: '4f20822b-157f-4794-9f49-3878f5b64050' }, // Hyper Launch
    { position: [39.5, 48.3, -1], lookAt: [43, 52, 10], size: 0.5, eventId: '2eabcb89-9cd4-4e2d-8ee0-d2242512c892' }, // Cryptix
    { position: [10.5, 23.7, -12], lookAt: [-7, 25, -20], size: 0.6, eventId: '2b2841b8-df3b-4719-837a-497653a1af92' }, // Techno Hive
    { position: [21.5, 41.8, -20.3], lookAt: [14, 45, -50], size: 1, eventId: 'd69012b5-e528-44c6-b897-d13b24d1acb2' }, // Rampage Horizon
    { position: [6, 37, -36], lookAt: [-55, 35, 0], size: 1, eventId: '12b54267-ad2f-428d-9e65-07ba4a3a6215' }, // Design Riot
  ];

  // Calculate which camera position we're at
  const totalPositions = cameraPositions.length;
  const pixelBgPosition = totalPositions - 3; // Show pixel bg at third to last position

  function lerpVec3(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }

  useFrame((state) => {
    if (!firstFrameRef.current) {
      firstFrameRef.current = true;
      onFirstFrame && onFirstFrame();
    }
    const offset = scroll.offset; // 0..1
    const scrollSpeed = isMobile ? 0.5 : 1; // Reduce scroll speed on mobile
    const currentPosition = offset * (totalPositions - 1) * scrollSpeed;

    // Camera interpolation
    if (cameraRef.current && cameraPositions.length > 1) {
      const total = cameraPositions.length - 1;
      const t = offset * total * scrollSpeed;
      const currentIndex = Math.floor(t);
      const lerpFactor = t - currentIndex;
      const fromPos = cameraPositions[currentIndex];
      const toPos = cameraPositions[Math.min(currentIndex + 1, total)];

      if (fromPos && toPos) {
        const pos = lerpVec3(fromPos.position, toPos.position, lerpFactor);
        const look = lerpVec3(fromPos.lookAt, toPos.lookAt, lerpFactor);
        cameraRef.current.position.set(...pos);
        cameraRef.current.lookAt(...look);
      }
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
      scrollIndicatorRef.current.style.transform = `translate(-50%, 0) translateY(${Math.sin(state.clock.getElapsedTime() * 3) * 8
        }px)`;
    }

    // Logo rotation
    if (logoRef.current) {
      logoRef.current.rotation.set(-Math.PI / 2, 0, 0); // Always face upwards
    }
  // Info icon remains fixed; no scroll-based movement
  });

  const handleEventClick = (eventId) => {
    console.log("Info button clicked for event:", eventId);
    if (onEventSelect && typeof onEventSelect === "function") {
      onEventSelect(eventId);
    }
  };

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

      {/* Info Instructions - Always visible at top of screen */}
      <group position={[45, 56, 1]} rotation={[0, 1.7, 0]} ref={logoRef}>
        <Text
          position={[0, 0, 0]}
          fontSize={isMobile ? 0.7 : 0.7}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          font="/fonts/Dosis-Bold.ttf"
          outlineWidth={0.08}
          maxWidth={isMobile ? 40 : 120}
          textAlign="left"
        >
          Click on the
        </Text>
        <Text
          position={[ 3.9, 0, 0]}
          fontSize={isMobile ? 0.7 : 0.7}
          color="#fff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Dosis-Bold.ttf"
          outlineWidth={0.42}
          outlineColor="#00ffff"
        >
          i
        </Text>
        <Text
          position={[ 4.5, 0, 0]}
          fontSize={isMobile ? 0.7 : 0.7}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          font="/fonts/Dosis-Bold.ttf"
          outlineWidth={0.08}
          maxWidth={isMobile ? 40 : 120}
          textAlign="left"
        >
          icon to know more about the events!
        </Text>
      </group>
      {/* Scroll Down Indicator */}
        <Html
          ref={scrollIndicatorRef}
          center
          transform={false}
          style={{
            position: "absolute",
            left: "50%",
            bottom: isMobile ? "-400px" : "-300px",
            pointerEvents: "none",
            userSelect: "none",
            transition: "opacity 0.08s linear",
            opacity: 1,
            zIndex: 10,
          }}
          sprite={false}
          zIndexRange={[10, 0]}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg
              width={isMobile ? 32 : 40}
              height={isMobile ? 48 : 56}
              viewBox="0 0 40 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="4" width="24" height="48" rx="12" stroke="#fff" strokeWidth="3" fill="rgba(0,0,0,0.2)" />
              <circle cx="20" cy="18" r="3" fill="#fff" />
            </svg>
            <h1 className="flex">
            Scroll_Down_To_Explore
            </h1>
          </div>
        </Html>
      {/* Slight rim light so model edges are visible */}
      <directionalLight position={[5, 15, 10]} intensity={0.05} color="#ffffff" />

      <CityNeonModel
        position={[0.22, 0.4, -0.01]}
        onPointerOver={() => setLoading(false)}
        onPointerMove={() => setLoading(false)}
      />

      {/* Logo, Quote, and Register Button Group - faces upwards */}
      <group position={[0, 160, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={logoRef}>
        {/* Semaphore logo */}
        <Image
          url={"/images/semaphore_logo.png"}
          position={[0, 3.5, 0]}
          scale={isMobile ? [10, 10, 1] : [13, 13, 1]}
          transparent
        />

        {/* Fest Quote */}
        <Text
          position={isMobile ? [0, -2.7, 0] : [0, -3.9, 1]}
          fontSize={isMobile ? 0.5 : 0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Dosis-Bold.ttf"
          outlineWidth={0.08}
          outlineColor="#000000"
          maxWidth={isMobile ? 20 : 80}
          textAlign="center">
          &quot;Where Innovation Meets Celebration {isMobile ? "\n" : "-"} Join the Ultimate Tech Festival!&quot;
        </Text>

        {/* Animated Register Button */}
        <AnimatedRegisterButton router={router} isMobile={isMobile} />

      
      </group>

      {/* Info icons: circular halogen buttons with animated sonar pulse for each waypoint */}
      {infoWaypoints.map((waypoint, index) => (
        <Billboard key={index} position={waypoint.position}>
          <group>
            <AnimatedPulseCircle size={waypoint.size} />
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                handleEventClick(waypoint.eventId);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "default";
              }}>
              <circleGeometry args={[0.5 * waypoint.size, 64]} />
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
              fontSize={0.6 * waypoint.size}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Dosis-Bold.ttf"
              outlineWidth={0.08}
              outlineColor="#00eaff">
              i
            </Text>
          </group>
        </Billboard>
      ))}

      <PerspectiveCamera ref={cameraRef} fov={30} makeDefault />

      <EffectComposer multisampling={4}>
        <Bloom intensity={1.2} kernelSize={2} luminanceThreshold={0.3} luminanceSmoothing={0.4} />
      </EffectComposer>
    </>
  );
};

export { LandingScene };
