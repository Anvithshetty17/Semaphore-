'use client'

import React, { use, useEffect, useRef, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive'

export function Earth(props) {
    const { nodes, materials } = useGLTF('./models/compressed/earth2.glb')
    const earthRef = useRef()
    const { viewport } = useThree()
    const isMobile = useMediaQuery({ maxWidth: 768 })

    const width = viewport.width
    const scaleValue = width * 0.00025
    const positionX = -width * 0.3

    useFrame(() => {
        earthRef.current.rotation.y += 0.0075
    })

    return (

        <>
            <ambientLight intensity={1} />
            <directionalLight
                intensity={10}
                position={[5, 5, 5]}
                castShadow
            />
            {/* [0.001, 0.001, 0.001] */}
            <group {...props} dispose={null} ref={earthRef} scale={[scaleValue, scaleValue, scaleValue]} position={[positionX, -2, 0]}>
                <mesh geometry={nodes.Cube001.geometry} material={materials['Default OBJ']} />
            </group >

        </>
    )
}


