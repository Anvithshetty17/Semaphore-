'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CyberpunkCity({ position = [0, -10, -200] }) {
    const cityRef = useRef();
    
    useFrame((state) => {
        if (cityRef.current) {
            // Subtle floating animation
            cityRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            
            // Glow effect animation
            cityRef.current.children.forEach((building, index) => {
                if (building.material) {
                    const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2;
                    building.material.emissiveIntensity = intensity;
                }
            });
        }
    });

    const buildings = [];
    
    // Generate cyberpunk buildings
    for (let i = 0; i < 50; i++) {
        const height = Math.random() * 15 + 5;
        const width = Math.random() * 2 + 1;
        const depth = Math.random() * 2 + 1;
        
        const x = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        
        const color = Math.random() > 0.7 ? '#ff00ff' : 
                     Math.random() > 0.4 ? '#00ffff' : '#0080ff';
        
        buildings.push(
            <mesh key={i} position={[x, height / 2, z]}>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial 
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        );
        
        // Add neon strips to some buildings
        if (Math.random() > 0.6) {
            buildings.push(
                <mesh key={`strip-${i}`} position={[x, height / 2, z + depth / 2 + 0.01]}>
                    <planeGeometry args={[width * 0.8, height * 0.1]} />
                    <meshBasicMaterial 
                        color={'#ff0080'}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            );
        }
    }

    return (
        <group ref={cityRef} position={position}>
            {buildings}
            
            {/* Ground grid */}
            <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[200, 200]} />
                <meshBasicMaterial 
                    color="#001122"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
}
