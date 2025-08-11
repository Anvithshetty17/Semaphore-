import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Sun(props) {
    const { nodes, materials } = useGLTF('./models/sun.glb')
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Cube001.geometry} material={materials.None} rotation={[Math.PI / 2, 0, 0]} scale={1000} />
        </group>
    )
}

useGLTF.preload('/models/sun.glb')
