import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Saturn(props) {
    const { nodes, materials } = useGLTF('./models/saturn.glb')

    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.y += 0.0075
    })
    return (
        <>
            <directionalLight
                intensity={3}
                position={[5, 5, 5]}
                castShadow
            />
            <group {...props} dispose={null} ref={ref}>
                <mesh geometry={nodes.Saturn001.geometry} material={materials.None} />
                <mesh geometry={nodes.RingsTop.geometry} material={materials.SaturnRings} />
                <mesh geometry={nodes.RingsBottom.geometry} material={materials.SaturnRings} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/saturn.glb')