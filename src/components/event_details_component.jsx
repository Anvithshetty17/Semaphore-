'use client'

import { Float, Html } from "@react-three/drei";
import { Earth2 } from "./model_components/earth";
import { EventMars } from "./model_components/event_mars";
import { Jupiter } from "./model_components/jupiter";
import { Mercury } from "./model_components/mercury";
import { Neptune } from "./model_components/neptune";
import { Pluto } from "./model_components/pluto";
import { Saturn } from "./model_components/saturn";
import { Uranus } from "./model_components/uranus";
import { Venus } from "./model_components/venus";
import { Sun } from "./sun";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useGetData } from "@/hooks/useGetData";
import { useQueryConfig } from "@/config/useQuery.config";
import { useMediaQuery } from "react-responsive";
import { Loading } from "./loading";
import { RocketLoader } from "./model_components/rocket_loader";

const EventDetailsComponent = () => {
    const [modelData, setModelData] = useState({})
    const isMobile = useMediaQuery({ maxWidth: 768 })

    const searchParams = useSearchParams();
    const [eventId, setEventId] = useState(null)

    useEffect(() => {
        const fetchedEventId = searchParams.get('eventId')
        if (fetchedEventId) {
            setEventId(fetchedEventId)
        }
    }, [searchParams])
    const { data: eventData, isLoading: isEventLoading } = useGetData(
        `${eventId}EventDetails`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/FindById?eventId=${eventId}`,
        useQueryConfig
    )
    const planetScale = isMobile ? 0.001 : 0.002
    const planetXPosition = isMobile ? -1 : -3.5


    useEffect(() => {
        const data = {
            'sun': <Sun scale={[planetScale, planetScale * 1.2, planetScale]} position={[planetXPosition, 0, 0]} />,
            'mercury': <Mercury scale={[planetScale, planetScale * 1.25, planetScale]} position={[planetXPosition, 0, 0]} />,
            'venus': <Venus scale={[planetScale, planetScale * 1.2, planetScale]} position={[planetXPosition, 0, 0]} />,
            'earth': <Earth2 scale={[planetScale, planetScale * 1.2, planetScale]} position={[planetXPosition, 0, 0]} />,
            'mars': <EventMars scale={[planetScale, planetScale * 1.2, planetScale]} position={[planetXPosition, 0, 0]} />,
            'jupiter': <Jupiter scale={[planetScale, planetScale * 1.1, planetScale]} position={[planetXPosition, 0, 0]} />,
            'saturn': <Saturn scale={[planetScale, planetScale * 1.1, planetScale]} position={[planetXPosition, 0, 0]} />,
            'uranus': <Uranus scale={[planetScale, planetScale * 1.1, planetScale]} position={[planetXPosition, 0, 0]} />,
            'neptune': <Neptune scale={[planetScale, planetScale * 1.1, planetScale]} position={[planetXPosition, 0, 0]} />,
            'pluto': <Pluto scale={[planetScale, planetScale * 1.1, planetScale]} position={[planetXPosition, 0, 0]} />
        }
        setModelData((prev) => data);
    }, [planetScale, planetXPosition])
    return (
        <>
            <Suspense fallback={<ModelLoading />}>

                {modelData[eventData?.modelName]}
            </Suspense>
            {/* <Sun scale={[0.002, 0.0023, 0.002]} position={[-3, 0, 0]} /> */}

            {isEventLoading === true ? <>

                <RocketLoader position={[isMobile ? 0 : 3, 0, 0]} />
            </> : <>
                <EventDetails title={eventData?.title} event={eventData?.eventName} desc={eventData?.description} rules={eventData?.eventRules} heads={eventData?.eventHeads} noOfParticipants={eventData?.memberCount} noOfRounds={eventData?.noOfRounds} /> </>}


        </>
    )
}

const EventDetails = ({ title, event, desc, rules, heads, noOfParticipants, noOfRounds }) => {



    const isMobile = useMediaQuery({ maxWidth: 768 })


    return (
        <>
            <Html position={[isMobile ? -1 : 0, 0, 0]} className="w-[75vw] lg:w-[40vw]" style={{ transform: 'translateY(-50%)' }} >
                <div className="px-8 py-2 border border-slate-300 w-full flex flex-col space-y-3 justify-center items-center rounded-xl">
                    <div className="flex flex-col space-y-2 items-center">
                        <h3 className="text-white text-[40px] lg:text-[45px] font-dosisBold"> {title} </h3>
                        <p className="text-white text-[16px] lg:text-[18px] font-dosisMedium"> {event}</p>
                    </div>
                    <div className="w-full flex flex-col space-y-1">
                        <p className="text-white text-[16px] lg:text-[18px] font-dosisMedium w-full"> No. Of Participants : {noOfParticipants} </p>
                        <p className="text-white text-[16px] lg:text-[18px] font-dosisMedium w-full"> No. Of Rounds : {noOfRounds} </p>

                    </div>
                    <p className="text-white text-[20px] lg:text-[22px] font-dosisMedium w-full"> Rules : </p>
                    <div className="flex flex-col space-y-2">
                        {rules?.map((ele, index) => {
                            return (
                                <>
                                    <p className="text-slate-100 text-[14px] lg:text-[17px] font-dosisRegular w-full">
                                        {index + 1}. {ele?.eventRule}
                                    </p>
                                </>
                            )
                        })}
                    </div>
                    <p className="text-white text-[18px] lg:text-[20px] font-dosisMedium w-full text-center"> Event Heads : </p>
                    <div className="flex flex-row space-x-3 text-white justify-around w-full font-dosisMedium text-[16px] lg:text-[16px]">
                        {heads?.map((el, ind) => {
                            return (
                                <>
                                    <div className="flex flex-col space-y-1">
                                        <p> {el.user.fullName} </p>
                                        <p>{el.user.phoneNumber}</p>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>

            </Html>
        </>
    )
}

function ModelLoading() {
    return <meshBasicMaterial attach="material" color="grey" />
}

export { ModelLoading }
export { EventDetailsComponent }