import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Uranus(props) {
    const { nodes, materials } = useGLTF('./models/uranus.glb')

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
                <mesh geometry={nodes.Uranus.geometry} material={materials['Default OBJ.001']} rotation={[Math.PI / 2, 0, 0]} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/uranus.glb')