"use client";
import { CityNeonModel } from "./cityneon2";
import { RobotModel } from "./robotModel"
import { PerspectiveCamera, useScroll, Image, Billboard, Text, RoundedBox, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { info } from "sass";

const LandingScene = ({ eventsData }) => {
  const cameraRef = useRef();
  const scroll = useScroll();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Camera waypoints 
  const cameraPositions = [
    { position: [80, 65, -10], lookAt: [0, 52, 0] }, //starting from semaphore 
    { position: [70, 63, -10], lookAt: [0, 52, 0] },//starting from semaphore 
    { position: [68, 63, -10], lookAt: [-5, 30, 0] }, //zoom into logo + look down 
    { position: [63, 63, -10], lookAt: [-20, -40, 0], duration: 0.2 }, //look down  

    { position: [76, 14, -20], lookAt: [80, 35, 120] }, //IT quiz building bottom 
    // { position: [76, 15, -20], lookAt: [80, 85, 120] }, 
    //IT quiz building top1 

    { position: [76.5, 12, -20], lookAt: [80, 45, 120] }, //IT quiz building top1 
    { position: [75.5, 12, -16], lookAt: [80, 105, 120] }, //IT quiz building top1 


    //surprise event buiding 
    { position: [75, 12, -12], lookAt: [20, 30, 38] }, //far view 
    { position: [65, 12, -4.4], lookAt: [20, 45, 45] }, //near view 

    //Photography Cyber scope 
    { position: [70, 12, 19], lookAt: [83, 30, -60] }, //far view 
    { position: [69.5, 25, 4], lookAt: [85.5, 25, -60] }, //far view 

    //Cyborg recruit IT manager 
    { position: [58, 27, 20], lookAt: [70, 40, -60] }, //far view 
    { position: [61, 27, 11], lookAt: [67, 40, -60] }, //far view 

    //Rythm Hack dance event 
    { position: [77, 16, 7], lookAt: [27, 25, -60] }, //far view 
    { position: [75, 16, 4], lookAt: [27, 30, -60] }, //far view 

    //Hyper Launch Startup 
    { position: [58, 16, 5], lookAt: [27, 50, -60] }, //far view 
    { position: [52, 22, -3], lookAt: [33, 50, -60] }, //near view 

    //Rampage Horizon Gaming far view 
    { position: [32, 22, -10], lookAt: [-25, 70, -40] }, //far view 
    { position: [24, 20, -6], lookAt: [-1, 76, -50] }, //far view 
    { position: [26, 12, 13], lookAt: [7, 66, -50] }, //far view 



    // { position: [24, 20, -6], lookAt: [-1, 76, -50] }, //far view 
    // { position: [45, 16, -15], lookAt: [-70, 30, -5] }, //far view 
    // { position: [15, 16, 0], lookAt: [8, 20, -10] }, //far view 
    { position: [30, 16, 6], lookAt: [7, 20, -10] }, //far view 
    /* dummy */ { position: [30, 16, 6], lookAt: [7, 20, -10] }, //far view 


    { position: [26, 34, 4], lookAt: [-7, 48, -50] }, //far view 
    { position: [42, 44, -14], lookAt: [40, 48, 10] }, //far view 
    
    // { position: [26, 34, 4], lookAt: [7, 48, -50] }, //far view 

    // { position: [75, 34, -4], lookAt: [-55, 35, -50] }, //far view 
   
   
    // { position: [40, 34, -24], lookAt: [-55, 35, -50] }, //far view 
    // { position: [40, 34, -44], lookAt: [-55, 35, 0] }, //far view 
    // { position: [60, 34, -54], lookAt: [-55, 25, 0] }, //far view 
    


  ];
  
  // Info button guided waypoints
  const infoWaypoints = [
    { position: [73, 33, 15], lookAt: [10, 20, 60] },
    // { position: [78, 22, 18], lookAt: [-10, 10, 0] },
    // { position: [82, 19, 14], lookAt: [-10, 10, 0] },
    // { position: [85, 21, 12], lookAt: [-10, 10, 0] },
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

      {/* Robot Model positioned at the IT quiz building */}
      {/* <RobotModel 
        position={[80, 25, 120]} 
        scale={[0.2, 0.2, 0.2]} 
        rotation={[0, Math.PI, 0]} 
      /> */}

      {/* Guided robot that moves & bounces instead of info button
      {infoWaypoints.length > 0 && infoWaypoints.map((waypoint, index) => {
        const { position } = waypoint;
        return (
          <group key={index} ref={infoGroupRef} position={position}>
            <RobotModel 
              position={[0, 0, 0]} 
              scale={[0.02, 0.02, 0.02]} 
              rotation={[0, 0, 0]} 
            />
          </group>
        )})} */}
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
