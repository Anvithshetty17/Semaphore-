import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
    const starRef = useRef();

    // Create cyberpunk-style star field
    const stars = useMemo(() => {
        const positions = [];
        const colors = [];
        const sizes = [];
        
        for (let i = 0; i < 3000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            positions.push(x, y, z);
            
            // Cyberpunk color palette
            const color = new THREE.Color();
            const rand = Math.random();
            if (rand > 0.8) {
                color.setHex(0x00ffff); // Cyan
            } else if (rand > 0.6) {
                color.setHex(0xff00ff); // Magenta
            } else if (rand > 0.4) {
                color.setHex(0xff0080); // Hot pink
            } else {
                color.setHex(0x0080ff); // Electric blue
            }
            
            colors.push(color.r, color.g, color.b);
            sizes.push(Math.random() * 2 + 0.5);
        }
        
        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
            sizes: new Float32Array(sizes)
        };
    }, []);

    useFrame((state) => {
        if (starRef.current) {
            starRef.current.rotation.y += 0.0003;
            starRef.current.rotation.x += 0.0001;
            
            // Animate star brightness
            const time = state.clock.elapsedTime;
            starRef.current.material.opacity = 0.8 + Math.sin(time * 2) * 0.2;
        }
    });

    return (
        <points ref={starRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={stars.positions}
                    count={stars.positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={stars.colors}
                    count={stars.colors.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    array={stars.sizes}
                    count={stars.sizes.length}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial 
                size={1.5} 
                vertexColors 
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

export { Stars }