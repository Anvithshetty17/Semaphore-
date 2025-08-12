'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField() {
    const particlesRef = useRef();
    
    const particles = useMemo(() => {
        const positions = [];
        const colors = [];
        const sizes = [];
        
        for (let i = 0; i < 2000; i++) {
            // Spread particles around the scene
            positions.push(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 500
            );
            
            // Cyberpunk colors
            const color = new THREE.Color();
            if (Math.random() > 0.7) {
                color.setHex(0x00ffff); // Cyan
            } else if (Math.random() > 0.4) {
                color.setHex(0xff00ff); // Magenta
            } else {
                color.setHex(0x0080ff); // Blue
            }
            
            colors.push(color.r, color.g, color.b);
            sizes.push(Math.random() * 3 + 1);
        }
        
        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
            sizes: new Float32Array(sizes)
        };
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0005;
            
            // Animate particles
            const positions = particlesRef.current.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 2] += 0.1; // Move particles forward
                
                if (positions[i + 2] > 50) {
                    positions[i + 2] = -250; // Reset when they pass camera
                }
            }
            
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={particles.positions}
                    count={particles.positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={particles.colors}
                    count={particles.colors.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    array={particles.sizes}
                    count={particles.sizes.length}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial 
                size={2}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}
