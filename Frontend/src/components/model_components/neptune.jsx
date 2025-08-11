import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Neptune(props) {
    const { nodes, materials } = useGLTF('./models/neptune.glb')
    return (
        <>
            <directionalLight
                intensity={3}
                position={[5, 5, 5]}
                castShadow
            />
            <group {...props} dispose={null}>
                <mesh geometry={nodes.Neptune.geometry} material={materials['Default OBJ.001']} rotation={[Math.PI / 2, 0, 0]} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/neptune.glb')