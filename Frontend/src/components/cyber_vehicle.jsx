'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CyberVehicle({ 
    rotation = [0, 0, 0], 
    scale = [1, 1, 1], 
    position = [0, 0, 0] 
}) {
    const vehicleRef = useRef();
    
    useFrame((state) => {
        if (vehicleRef.current) {
            // Add some hover effect
            vehicleRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.02;
            
            // Glow pulsing
            vehicleRef.current.children.forEach((child, index) => {
                if (child.material && child.material.emissiveIntensity !== undefined) {
                    child.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.2;
                }
            });
        }
    });

    return (
        <group ref={vehicleRef} rotation={rotation} scale={scale} position={position}>
            {/* Main body */}
            <mesh>
                <boxGeometry args={[2, 0.5, 0.8]} />
                <meshStandardMaterial 
                    color="#001122"
                    emissive="#003366"
                    emissiveIntensity={0.3}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>
            
            {/* Cockpit */}
            <mesh position={[0.5, 0.3, 0]}>
                <sphereGeometry args={[0.3, 16, 8]} />
                <meshStandardMaterial 
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.7}
                />
            </mesh>
            
            {/* Wings */}
            <mesh position={[-0.5, 0, 0.6]}>
                <boxGeometry args={[1, 0.1, 0.8]} />
                <meshStandardMaterial 
                    color="#ff00ff"
                    emissive="#ff00ff"
                    emissiveIntensity={0.3}
                />
            </mesh>
            <mesh position={[-0.5, 0, -0.6]}>
                <boxGeometry args={[1, 0.1, 0.8]} />
                <meshStandardMaterial 
                    color="#ff00ff"
                    emissive="#ff00ff"
                    emissiveIntensity={0.3}
                />
            </mesh>
            
            {/* Thrusters */}
            <mesh position={[-1.2, 0, 0.3]}>
                <cylinderGeometry args={[0.1, 0.15, 0.6]} />
                <meshBasicMaterial 
                    color="#ff8800"
                    emissive="#ff4400"
                    emissiveIntensity={0.8}
                />
            </mesh>
            <mesh position={[-1.2, 0, -0.3]}>
                <cylinderGeometry args={[0.1, 0.15, 0.6]} />
                <meshBasicMaterial 
                    color="#ff8800"
                    emissive="#ff4400"
                    emissiveIntensity={0.8}
                />
            </mesh>
            
            {/* Energy trails */}
            {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[-1.5 - i * 0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.02, 0.3]} />
                    <meshBasicMaterial 
                        color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                        transparent
                        opacity={1 - i * 0.15}
                    />
                </mesh>
            ))}
        </group>
    );
}
