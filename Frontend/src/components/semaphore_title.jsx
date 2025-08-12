import { Text } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"
import { useRef } from "react"
import * as THREE from "three"

const SemaphoreTitle = () => {
    const { viewport } = useThree()
    const titleRef = useRef()
    const glowRef = useRef()
    
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const width = viewport.width
    const fontSize = isMobile ? width * 0.06 : width * 0.07
    const positionX = isMobile ? 0.04 : 0.16
    
    useFrame((state) => {
        if (titleRef.current) {
            // Glitch effect
            const time = state.clock.elapsedTime
            const glitchIntensity = Math.sin(time * 10) * 0.02
            titleRef.current.position.x = positionX + (Math.random() - 0.5) * glitchIntensity
            
            // Color shifting
            const hue = (time * 50) % 360
            titleRef.current.material.color.setHSL(hue / 360, 1, 0.5)
        }
        
        if (glowRef.current) {
            // Pulsing glow
            const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
            glowRef.current.material.emissiveIntensity = intensity
        }
    })
    
    return (
        <>
            <group position={[positionX, -2, 0]}>
                {/* Glow background */}
                <mesh ref={glowRef} position={[0, 0, -0.1]}>
                    <planeGeometry args={[isMobile ? 3 : 5, isMobile ? 1.5 : 2]} />
                    <meshBasicMaterial 
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.2}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                
                <Text
                    ref={titleRef}
                    textAlign="center"
                    fontSize={fontSize}
                    font={'./fonts/funkrocker.ttf'}
                    color={"#00ffff"}
                    outlineWidth={0.01}
                    outlineColor={"#ff00ff"}
                    letterSpacing={0.05}
                >
                    {`>> SEMAPHORE <<\n    2K25`}
                </Text>
                
                {/* Digital noise lines */}
                {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[-1.5 + i * 0.7, -0.5, 0.05]}>
                        <planeGeometry args={[0.02, isMobile ? 1 : 1.5]} />
                        <meshBasicMaterial 
                            color={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                ))}
            </group>
        </>
    )
}

export { SemaphoreTitle }