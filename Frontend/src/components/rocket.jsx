import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Rocket(props) {
    const { nodes, materials } = useGLTF('./models/rocket_model_2.glb')

    return (
        <group {...props} dispose={null} scale={[0.5, 0.5, 0.5]} position={[-0.8, -2, 2]}>
            <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
        </group>
    )
}

useGLTF.preload('./models/rocket_model_2.glb')
