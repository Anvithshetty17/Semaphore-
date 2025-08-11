import { Edges, Text } from "@react-three/drei"
import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { useMediaQuery } from "react-responsive"

const Button3D = ({ label, onClick, position }) => {
    const buttonRef = useRef()
    const { viewport } = useThree()
    const isMobile = useMediaQuery({ maxWidth: 768 })

    const scale = isMobile ? viewport.width * 0.4 : viewport.width * 0.1

    // Animation: scale button slightly when hovered
    const handlePointerOver = () => {
        buttonRef.current.scale.set(scale * 1.3, scale * 1.3, scale * 1.3)
    }

    const handlePointerOut = () => {
        buttonRef.current.scale.set(scale, scale, scale)
    }

    return (
        <group ref={buttonRef} position={position} scale={[scale, scale, scale]}>
            {/* Button Base */}
            <mesh
                onClick={onClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                position={[0, 0, 0]}
            >
                <boxGeometry args={[1.5, 0.5, 0.1]} />
                <meshBasicMaterial color={"transparent"} opacity={0} transparent />
                <Edges color={"white"} />
                {/* <meshStandardMaterial color="royalblue" /> */}
            </mesh>

            {/* Button Label */}
            <Text
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
                font={'./fonts/funkrocker.ttf'}
                position={[0, 0, 0.06]} // Slightly above the button to avoid z-fighting
            >
                {label}
            </Text>
        </group>
    )
}

export { Button3D }
