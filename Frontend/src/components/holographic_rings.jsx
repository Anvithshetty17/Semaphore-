'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HolographicRings({ position = [0, 0, -100] }) {
    const ringsRef = useRef();
    
    useFrame((state) => {
        if (ringsRef.current) {
            ringsRef.current.rotation.x += 0.01;
            ringsRef.current.rotation.z += 0.005;
            
            // Animate each ring differently
            ringsRef.current.children.forEach((ring, index) => {
                ring.rotation.y += (index + 1) * 0.01;
                ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1);
            });
        }
    });

    return (
        <group ref={ringsRef} position={position}>
            {[...Array(5)].map((_, i) => (
                <mesh key={i}>
                    <torusGeometry args={[8 + i * 2, 0.2, 8, 32]} />
                    <meshBasicMaterial 
                        color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                        transparent
                        opacity={0.6 - i * 0.1}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
            
            {/* Central holographic display */}
            <mesh>
                <cylinderGeometry args={[0.1, 0.1, 20]} />
                <meshBasicMaterial 
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </group>
    );
}
