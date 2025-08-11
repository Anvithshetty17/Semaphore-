import React from 'react'
import { useGLTF } from '@react-three/drei'

export function SpaceShuttle(props) {
    const { nodes, materials } = useGLTF('./models/space_shuttle.glb')
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
        </group>
    )
}

useGLTF.preload('./models/space_shuttle.glb')