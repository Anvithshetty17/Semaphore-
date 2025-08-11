import { Canvas } from "@react-three/fiber"
import { Stars } from "./stars"

const ModelLoadingFallback = () => {

    return (
        <>
            <Canvas>
                <Stars />
            </Canvas>
        </>
    )
}

export { ModelLoadingFallback }