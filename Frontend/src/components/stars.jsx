import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Classic subtle star field: small round stars, gentle rotation, not too dense.
function Stars() {
  const pointsRef = useRef();
  const anglesRef = useRef();
  const radiiRef = useRef();
  const yLevelsRef = useRef();
  const speedsRef = useRef();

  const { positions, colors, count } = useMemo(() => {
    const count = 1400; // slightly fewer for orbit update efficiency
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const angles = new Float32Array(count);
    const radii = new Float32Array(count);
    const yLevels = new Float32Array(count);
    const speeds = new Float32Array(count);

    const palette = ['#ffffff', '#b8eaff', '#9acbff', '#d9b8ff', '#ffe6ff'].map(c => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const ring = Math.random();
      // Map ring to radius bands to form multiple circular rings
      const baseRadius = 120 + ring * 420; // 120..540
      radii[i] = baseRadius + (Math.random() - 0.5) * 15; // slight jitter
      angles[i] = Math.random() * Math.PI * 2;
      yLevels[i] = (Math.random() - 0.5) * 160; // vertical variance
      speeds[i] = 0.00015 + Math.random() * 0.00045; // individual angular speeds

      const idx = i * 3;
      positions[idx] = Math.cos(angles[i]) * radii[i];
      positions[idx + 1] = yLevels[i];
      positions[idx + 2] = Math.sin(angles[i]) * radii[i];

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
    }

    anglesRef.current = angles;
    radiiRef.current = radii;
    yLevelsRef.current = yLevels;
    speedsRef.current = speeds;

    return { positions, colors, count };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position');
    const arr = posAttr.array;
    const angles = anglesRef.current;
    const radii = radiiRef.current;
    const yLevels = yLevelsRef.current;
    const speeds = speedsRef.current;
    for (let i = 0; i < angles.length; i++) {
      angles[i] += speeds[i];
      const idx = i * 3;
      arr[idx] = Math.cos(angles[i]) * radii[i];
      arr[idx + 1] = yLevels[i];
      arr[idx + 2] = Math.sin(angles[i]) * radii[i];
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} renderOrder={-10}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.65}
        sizeAttenuation
        vertexColors
        depthWrite={false}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export { Stars };
export default Stars;