'use client'

import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const AccoladesDetailsPage = () => {

    return (
        <>
            <div className="w-full min-h-full border rounded-lg bg-white p-4 space-y-6 flex flex-col">
                <h3 className="font-dosisBold mb-3"> Team Details </h3>
                <Suspense fallback={<Loading />}>
                    <DetailsWidget /></Suspense>
            </div>
        </>
    )
}

const DetailsWidget = () => {
    const searchParams = useSearchParams()
    const { data: eventTeam, isLoading: isTeamDetailsLoading } = useGetData(
        `${searchParams.get('teamId')}teamDetails`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetTeamMembersForAccolades?teamId=${searchParams.get('teamId')}`,
        useQueryConfig
    )

    if (isTeamDetailsLoading) return <Loading />
    return (
        <>
            {eventTeam?.eventMembers?.map((ele, index) => {
                return (
                    <div key={index} className="grid grid-cols-3 gap-3 border rounded-lg bg-white p-4">
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-col space-y-2">
                                <span className="font-dosisBold"> Name : </span>
                                <span>{ele?.memberName}</span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <span className="font-dosisBold"> Phone Number : </span>
                                <span>{ele?.memberPhoneNumber}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default AccoladesDetailsPage