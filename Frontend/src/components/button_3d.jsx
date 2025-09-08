import { Edges, Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

const Button3D = ({ label = "REGISTER NOW", onClick, position = [0, 0, 0], size = 1 }) => {
  const groupRef = useRef();
  const { viewport } = useThree();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Responsive base scale
  const base = (isMobile ? 0.12 : 0.08) * viewport.width * size;

  // Hover interactions
  const handleOver = () => {
    document.body.style.cursor = 'pointer';
    if (groupRef.current) groupRef.current.scale.set(base * 1.1, base * 1.1, base * 1.1);
  };
  const handleOut = () => {
    document.body.style.cursor = 'default';
    if (groupRef.current) groupRef.current.scale.set(base, base, base);
  };

  // Idle subtle pulse for holo vibe
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const s = base * (1 + Math.sin(t * 2) * 0.01);
    // Only apply pulse when not hovered (approx by scale check)
    if (Math.abs(groupRef.current.scale.x - base) < 1e-3) {
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[base, base, base]}>
      {/* Outer holographic frame */}
      <mesh onClick={onClick} onPointerOver={handleOver} onPointerOut={handleOut}>
        <boxGeometry args={[9.5, 3.2, 0.2]} />
        <meshStandardMaterial
          color="#00faff"
          emissive="#00faff"
          emissiveIntensity={0.7}
          transparent
          opacity={0.25}
          metalness={1}
          roughness={0.2}
        />
        <Edges color="#7ff6ff" />
      </mesh>
      {/* Inner border */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[8.8, 2.6, 0.2]} />
        <meshStandardMaterial
          color="#07e1ff"
          emissive="#07e1ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>
      {/* Button background */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[8.2, 2.2, 0.1]} />
        <meshStandardMaterial
          color="#021014"
          emissive="#00c8ff"
          emissiveIntensity={0.06}
          transparent
          opacity={0.85}
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 0, 0.12]}
        fontSize={1.1}
        color="#bff7ff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#00eaff"
        font={'/fonts/Dosis-Bold.ttf'}
      >
        {label}
      </Text>
    </group>
  );
};

export { Button3D };
