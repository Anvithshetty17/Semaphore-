import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Mars(props) {
    const { nodes, materials } = useGLTF('./models/compressed/mars2.glb')

    const scroll = useScroll()
    const [marsScale, setMarsScale] = useState([0, 0, 0])

    useFrame((_state, delta) => {
        if (scroll.offset > 0.03) {
            setMarsScale([0.0055, 0.0055, 0.0055])
        } else {
            setMarsScale([0, 0, 0])
        }
    })

    return (
        <group {...props} dispose={null} scale={marsScale}>
            <mesh geometry={nodes.Cube008.geometry} material={materials['Default OBJ.005']} />
        </group>
    )
}

// useGLTF.preload('./models/compressed/mars2.glb')
