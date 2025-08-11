import { Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useMediaQuery } from "react-responsive"

const SemaphoreTitle = () => {
    const { viewport } = useThree()

    const isMobile = useMediaQuery({ maxWidth: 768 })
    // const fontSize = isMobile ? 0.10 : 0.35
    const width = viewport.width
    const fontSize = isMobile ? width * 0.06 : width * 0.07
    const positionX = isMobile ? 0.04 : 0.16
    return (
        <>
            <group position={[positionX, -2, 0]}>
                <Text
                    textAlign="center"
                    fontSize={fontSize}
                    font={'./fonts/funkrocker.ttf'}
                    color={"white"}
                >
                    SEMAPHORE {'\n'} 2K24
                </Text>
            </group>
        </>
    )
}

export { SemaphoreTitle }