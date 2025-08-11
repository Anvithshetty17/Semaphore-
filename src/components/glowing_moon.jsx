import { useRef } from "react";
import { useGLTF } from '@react-three/drei'


export function GlowingMoon() {
    const moonRef = useRef();

    // Load the moon model
    const { nodes, materials } = useGLTF('./models/moon.glb');

    return (
        <group ref={moonRef} dispose={null} position={[0.935, -2, 1.5]} scale={[0.355, 0.355, 0.355]}>
            <mesh geometry={nodes.mesh_0.geometry} >
                {/* Add emissive material to the moon */}
                <meshStandardMaterial
                    color={'white'}
                    emissive={'orange'} // Glow color
                    emissiveIntensity={1.5} // Glow strength

                />
            </mesh>
        </group>
    );
}