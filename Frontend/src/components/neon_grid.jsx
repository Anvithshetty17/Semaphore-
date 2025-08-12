'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NeonGrid({ position = [0, -5, -50] }) {
    const gridRef = useRef();
    
    useFrame((state) => {
        if (gridRef.current) {
            // Animate the grid with a wave effect
            gridRef.current.material.uniforms.time.value = state.clock.elapsedTime;
        }
    });

    // Custom shader material for animated neon grid
    const gridMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color1: { value: new THREE.Color('#00ffff') },
            color2: { value: new THREE.Color('#ff00ff') }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            
            void main() {
                vec2 grid = abs(fract(vUv * 20.0) - 0.5);
                float line = smoothstep(0.0, 0.1, min(grid.x, grid.y));
                
                vec3 color = mix(color1, color2, sin(time + vUv.x * 10.0) * 0.5 + 0.5);
                float alpha = (1.0 - line) * (0.5 + sin(time * 2.0 + vUv.y * 20.0) * 0.3);
                
                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide
    });

    return (
        <group position={position}>
            <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <primitive object={gridMaterial} />
            </mesh>
        </group>
    );
}
