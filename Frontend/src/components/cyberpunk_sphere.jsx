'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CyberpunkSphere({ position = [0, 0, -20] }) {
    const sphereRef = useRef();
    
    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.01;
            sphereRef.current.rotation.x += 0.005;
            
            // Pulsing effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
            sphereRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group position={position}>
            <mesh ref={sphereRef}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial 
                    color="#ff00ff"
                    emissive="#ff00ff"
                    emissiveIntensity={0.4}
                    wireframe
                    transparent
                    opacity={0.6}
                />
            </mesh>
            
            {/* Inner sphere with different animation */}
            <mesh>
                <sphereGeometry args={[2.5, 16, 16]} />
                <meshBasicMaterial 
                    color="#00ffff"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
            
            {/* Orbiting rings */}
            {[...Array(3)].map((_, i) => (
                <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
                    <torusGeometry args={[4 + i * 0.5, 0.1, 8, 32]} />
                    <meshBasicMaterial 
                        color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}
