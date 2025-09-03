import React from 'react'
import { Float, useGLTF } from '@react-three/drei'

export function RobotModel(props) {
    const { nodes, materials } = useGLTF('./models/mech_drone.glb')
    
    return (
        <>
            <directionalLight
                intensity={6}
                position={[5, 5, 5]}
                castShadow
            />
            <Float floatIntensity={1} speed={2}>
                <group {...props} dispose={null}>
                    {/* Render all meshes from the mech_drone model */}
                    {Object.keys(nodes).map((nodeName) => {
                        const node = nodes[nodeName];
                        if (node.geometry) {
                            return (
                                <mesh
                                    key={nodeName}
                                    geometry={node.geometry}
                                    material={node.material}
                                    position={node.position}
                                    rotation={node.rotation}
                                    scale={node.scale}
                                />
                            );
                        }
                        return null;
                    })}
                </group>
            </Float>
        </>
    )
}

// Preload the model for better performance
useGLTF.preload('./models/mech_drone.glb')