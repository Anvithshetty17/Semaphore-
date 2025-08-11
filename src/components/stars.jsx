import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
    const starRef = useRef();

    // Create random star positions
    const stars = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            // positions.push(x, y, Math.min(-300, z));
            positions.push(x, y, z);
        }
        return new Float32Array(positions);
    }, []);

    useFrame(() => {
        // Animate stars (optional)
        starRef.current.rotation.y += 0.0005; // Rotate slowly to add a dynamic effect
    });

    return (
        <points ref={starRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={stars}
                    count={stars.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={1.5} color="#ffffff" />
        </points>
    );
}

export { Stars }