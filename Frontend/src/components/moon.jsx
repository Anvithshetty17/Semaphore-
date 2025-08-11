import React, { useEffect, useRef } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive'

export function Moon(props) {
    const { nodes, materials } = useGLTF('./models/compressed/moon2.glb')
    const moonRef = useRef()
    const { viewport } = useThree()

    const isMobile = useMediaQuery({ maxWidth: 768 })
    const width = viewport.width
    const scaleValue = width * 0.00015
    const positionX = isMobile ? width * 0.32 : width * 0.35

    useFrame(() => {
        moonRef.current.rotation.y += 0.01
    })

    return (
        <>

            {/* <group castShadow {...props} ref={moonRef} dispose={null} position={[0.95, -2, 2]} scale={[0.0005, 0.0005, 0.0005]}> */}
            <group castShadow {...props} ref={moonRef} dispose={null} position={[positionX, -2, 0]} scale={[scaleValue, scaleValue, scaleValue]}>
                <mesh geometry={nodes.Cube008.geometry} material={materials['Default OBJ.005']} />
            </group>
        </>
    )
}

// useGLTF.preload('./models/compressed/moon2.glb')
