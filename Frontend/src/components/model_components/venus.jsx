import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Venus(props) {
    const { nodes, materials } = useGLTF('./models/venus.glb')

    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.y += 0.0075
    })
    return (
        <>
            <directionalLight
                intensity={2}
                position={[5, 5, 5]}
                castShadow
            />
            <group {...props} dispose={null} ref={ref}>
                <mesh geometry={nodes.cylindrically_mapped_sphereMesh.geometry} material={materials['Default OBJ']} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/venus.glb')