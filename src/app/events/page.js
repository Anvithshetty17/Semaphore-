'use client'
import { EventDetailsComponent } from "@/components/event_details_component";

import { Stars } from "@/components/stars";
import { Canvas, } from "@react-three/fiber";


export default function Events() {

    return (
        <>
            <Canvas>
                <ambientLight intensity={0.5} />
                <Stars />
                <EventDetailsComponent />
            </Canvas>
        </>
    )
}