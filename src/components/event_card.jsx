import { Html, Text, useScroll } from "@react-three/drei"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { TextureLoader } from "three"
import { Button3D } from "./button_3d"
import { useMediaQuery } from "react-responsive"
import { useRouter } from "next/navigation"

const EventCard = (props) => {
    const cardRef = useRef()
    const texture = useLoader(TextureLoader, "./images/bg.png")
    const scroll = useScroll()
    const router = useRouter()

    const { viewport } = useThree()
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const scale = viewport.width * 0.75


    return (
        <>
            <group ref={cardRef} position={props.cardPosition} scale={[scale, scale, scale]}>
                <mesh>
                    <planeGeometry args={[2, 4]} />
                    <meshBasicMaterial color={"white"} opacity={0} transparent />
                </mesh>

                <Text
                    textAlign="center"
                    fontSize={isMobile ? 0.25 : 0.25}
                    font={'./fonts/funkrocker.ttf'}
                    color={"white"}
                    anchorX={"center"}
                    anchorY={"middle"}
                    position={[0, isMobile ? 1.5 : 1.15, 0]}
                >
                    {props.data.eventName}
                </Text>

                <Text
                    textAlign="center"
                    fontSize={isMobile ? 0.09 : 0.06}
                    font={'./fonts/funkrocker.ttf'}
                    color={"white"}
                    anchorX={"center"}
                    anchorY={"middle"}
                    maxWidth={isMobile ? 1.1 : 1.2}
                    position={[0, 0.7, 0]}
                    letterSpacing={0.1}
                    lineHeight={1.2}
                >
                    {props.data.description}
                </Text>
                <Button3D label={'Know More'} position={[0, isMobile ? -0.3 : 0.05, 0]} onClick={() => router.push(`/events?eventId=${props.data.eventId}`)} />
            </group >
        </>
    )
}

export { EventCard }