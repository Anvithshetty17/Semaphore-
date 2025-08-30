"use client";
import { CityNeonModel } from "./cityneon2";
import { PerspectiveCamera, useScroll, Image, Billboard, Text, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
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

  // Dynamic placement with Raycaster (defaults)
  const [infoPosition, setInfoPosition] = useState([90, 15, 15]);
  const infoLookAt = [-10, 10, 0];
  const infoGroupRef = useRef();
  const { camera, gl } = useThree();
  const raycasterRef = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)); // Ground plane Y=0
  const intersectionPoint = useRef(new THREE.Vector3());

  useFrame(() => {
    if (infoGroupRef.current) infoGroupRef.current.lookAt(...infoLookAt);
  });

  // Manual raycast from raw pointer event to ground plane (Y=0)
  const handleCanvasClick = useCallback(
    (e) => {
      // Allow both pointer events from R3F or native DOM events
      const clientX = e.clientX ?? (e?.nativeEvent?.clientX || 0);
      const clientY = e.clientY ?? (e?.nativeEvent?.clientY || 0);
      const rect = gl.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      raycasterRef.current.setFromCamera(ndc, camera);
      const hit = raycasterRef.current.ray.intersectPlane(planeRef.current, intersectionPoint.current);
      if (hit) {
        // Raise slightly above ground so it's visible
        const newPos = [intersectionPoint.current.x, intersectionPoint.current.y + 2, intersectionPoint.current.z];
        setInfoPosition(newPos);
        console.log("Clicked world position (manual raycast):", {
          x: Number(newPos[0].toFixed(3)),
          y: Number(newPos[1].toFixed(3)),
          z: Number(newPos[2].toFixed(3)),
        });
      }
    },
    [camera, gl]
  );

  // Simpler alternative using R3F's built-in raycasting on an invisible ground mesh
  const handleGroundPointerDown = useCallback(
    (e) => {
      // e.point already is intersection with the plane mesh
      const newPos = [e.point.x, e.point.y + 2, e.point.z];
      setInfoPosition(newPos);
      console.log("Clicked world position (mesh intersection):", {
        x: Number(newPos[0].toFixed(3)),
        y: Number(newPos[1].toFixed(3)),
        z: Number(newPos[2].toFixed(3)),
      });
    },
    []
  );

  return (
    <>
      <ambientLight intensity={1} />
      <CityNeonModel position={[0.22, 0.4, -0.01]} />

      {/* Invisible giant plane to catch clicks for placement (optional). */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={handleGroundPointerDown}
        onClick={handleCanvasClick}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Info group (image + 3D button) that can be repositioned by clicking the ground */}
      <group ref={infoGroupRef} position={infoPosition}>        
        <Billboard follow lockX={false} lockY={false} lockZ={false}>          
          {/* 3D Image plane (drei <Image> is already a textured plane) */}
          <Image url="/images/event_logos/coding.png" scale={[10, 6, 1]} transparent toneMapped={false} />
          {/* 3D Button */}
          <group position={[0, -4.2, 0]}>            
            <RoundedBox args={[4, 1.2, 0.5]} radius={0.25} smoothness={4} onClick={() => console.log("Info button clicked")}>              
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
        </Billboard>
      </group>

  <PerspectiveCamera ref={cameraRef} fov={30} makeDefault />
    </>
  );
};

export { LandingScene };
