'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Earth2(props) {
    const { nodes, materials } = useGLTF('./models/compressed/earth2.glb')
    const earthRef = useRef()

    useFrame(() => {
        earthRef.current.rotation.y += 0.0075
    })
    return (
        <>
            <directionalLight
                intensity={10}
                position={[5, 5, 5]}
                castShadow
            />
            <group {...props} dispose={null} ref={earthRef}>
                <mesh geometry={nodes.Cube001.geometry} material={materials['Default OBJ']} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/compressed/earth2.glb')
