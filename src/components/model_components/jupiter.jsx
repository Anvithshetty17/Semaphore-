'use client'

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Jupiter(props) {
    const { nodes, materials } = useGLTF('./models/jupiter.glb')

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
                <mesh geometry={nodes.cubemap.geometry} material={materials.None} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/jupiter.glb')