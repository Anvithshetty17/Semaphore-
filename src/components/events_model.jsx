import React from 'react'
import { useGLTF } from '@react-three/drei'

export function EventsModel(props) {
    const { nodes, materials } = useGLTF(`./models/${props.modelName}.glb`)
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Cube001.geometry} material={materials.None} rotation={[Math.PI / 2, 0, 0]} scale={1000} />
        </group>
    )
}