import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function EventMars(props) {
    const { nodes, materials } = useGLTF('./models/mars2.glb')

    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.y += 0.0075
    })
    return (
        <>
            <directionalLight
                intensity={10}
                position={[5, 5, 5]}
                castShadow
            />
            <group {...props} dispose={null} ref={ref}>
                <mesh geometry={nodes.Cube008.geometry} material={materials['Default OBJ.005']} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/mars2.glb')