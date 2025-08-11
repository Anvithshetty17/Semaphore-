import React from 'react'
import { Float, useGLTF } from '@react-three/drei'

export function RocketLoader(props) {
    const { nodes, materials } = useGLTF('./models/rocket_model.glb')
    return (
        <>
            <directionalLight
                intensity={6}
                position={[5, 5, 5]}
                castShadow
            />
            <Float floatIntensity={1} speed={4}>

                <group {...props} dispose={null}>
                    <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
                </group>
            </Float>
        </>
    )
}

// useGLTF.preload('./models/rocket_model.glb')