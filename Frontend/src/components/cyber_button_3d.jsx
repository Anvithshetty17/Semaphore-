'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function CyberButton3D({ 
    position = [0, 0, 0], 
    scale = [1, 1, 1], 
    label = "BUTTON", 
    onClick = () => {} 
}) {
    const buttonRef = useRef();
    const glowRef = useRef();
    
    useFrame((state) => {
        if (buttonRef.current && glowRef.current) {
            // Pulsing glow effect
            const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
            glowRef.current.material.emissiveIntensity = intensity;
            
            // Subtle floating
            buttonRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Button background */}
            <mesh 
                ref={buttonRef}
                onClick={onClick}
                onPointerEnter={() => {
                    document.body.style.cursor = 'pointer';
                }}
                onPointerLeave={() => {
                    document.body.style.cursor = 'auto';
                }}
            >
                <boxGeometry args={[2, 0.5, 0.2]} />
                <meshStandardMaterial 
                    color="#001122"
                    emissive="#003366"
                    emissiveIntensity={0.3}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            
            {/* Glowing border */}
            <mesh ref={glowRef} position={[0, 0, 0.11]}>
                <planeGeometry args={[2.1, 0.6]} />
                <meshBasicMaterial 
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>
            
            {/* Button text */}
            <Text
                position={[0, 0, 0.12]}
                fontSize={0.15}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                font={'./fonts/funkrocker.ttf'}
                letterSpacing={0.05}
            >
                {label}
            </Text>
            
            {/* Corner decorations */}
            {[
                [-0.9, 0.2, 0.12],
                [0.9, 0.2, 0.12],
                [-0.9, -0.2, 0.12],
                [0.9, -0.2, 0.12]
            ].map((pos, i) => (
                <mesh key={i} position={pos}>
                    <boxGeometry args={[0.1, 0.1, 0.02]} />
                    <meshBasicMaterial 
                        color="#ff00ff"
                        emissive="#ff00ff"
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}
