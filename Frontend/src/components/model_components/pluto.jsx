import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Pluto(props) {
    const { nodes, materials } = useGLTF('./models/pluto.glb')

    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.y += 0.0075
    })
    return (
        <>
            <directionalLight
                intensity={4}
                position={[5, 5, 5]}
                castShadow
            />
            <group {...props} dispose={null} ref={ref}>
                <mesh geometry={nodes.cylindrically_mapped_sphere.geometry} material={materials['Default OBJ.001']} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/pluto.glb')