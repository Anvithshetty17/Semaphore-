'use client'

import { Loading } from "@/components/loading";
import { useQueryConfig } from "@/config/useQuery.config";
import { useGetData } from "@/hooks/useGetData";

const { MemberCard, RegistrationDetailCard1 } = require("@/app/participant/registration/page")
const { useSearchParams } = require("next/navigation");

const AdminRegistrationDetailsComponent = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId')

    const { data: registrationData, isLoading: isRegistrationDataLoading } = useGetData(
        `${userId}registrationDetails`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegistrationDetails?userId=${userId}`,
        useQueryConfig,
    )

    if (isRegistrationDataLoading) return <Loading />
    return (
        <>
            <div className="w-full min-h-full border rounded-lg bg-white p-4 space-y-6">
                <h3 className="font-dosisBold mb-3"> Registration Details </h3>
                <div className="flex flex-col space-y-10">
                    <div className="flex flex-col space-y-2">
                        <RegistrationDetailCard1 name="College Name" value={registrationData?.college?.collegeName} />
                        <RegistrationDetailCard1 name="Registered User Name" value={registrationData?.user?.fullName} />
                        <RegistrationDetailCard1 name="Email" value={registrationData?.user?.email} />
                        <RegistrationDetailCard1 name="Phone Number" value={registrationData?.user?.phoneNumber} />
                        <RegistrationDetailCard1 name="Status" value={registrationData?.status?.status} />
                    </div>
                    <p className="font-dosisBold">Event & Participants Details</p>
                    {registrationData?.eventTeams?.map((ele, index) => {
                        return (
                            <>
                                <div className="flex flex-col space-y-3 font-dosisMedium">
                                    <p>{ele?.event.eventName}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                        {ele.eventMembers?.map((el, ind) => {
                                            return (
                                                <>
                                                    <MemberCard name={el.memberName} phoneNumber={el.memberPhoneNumber} />
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export { AdminRegistrationDetailsComponent }