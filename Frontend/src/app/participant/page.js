'use client'

import { RegistrationStepsComponent } from "@/components/registration_steps_component"
import { useQueryConfig } from "@/config/useQuery.config"
import { useCached } from "@/hooks/useCached"
import { useGetData } from "@/hooks/useGetData"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Participant = () => {
    const { cached } = useCached('isAuthenticated')
    const router = useRouter()

    const { data: isAlreadyRegistered, isLoading: isRegistrationChecking } = useGetData(
        `${cached?.userId}IsAlreadyRegistered`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/IsAlreadyRegistred?userId=${cached?.userId}`,
        useQueryConfig
    )

    useEffect(() => {
        router.push(`/participant/registration`)
    }, [])
    return (
        <>
            {/* {isAlreadyRegistered === false && <RegistrationStepsComponent />}
            <div className="w-full min-h-full border rounded-lg bg-white p-4 space-y-6 flex flex-col justify-center items-center">
                <h3 className="font-dosisBold mb-3 text-[30px]"> Dashboard Coming Soon</h3>
            </div> */}
        </>
    )

}

export default Participant