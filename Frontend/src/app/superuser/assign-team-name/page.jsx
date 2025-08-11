'use client'

import { TextInput } from "@/components/input"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useSubmit } from "@/hooks/useSubmit"
import { toast } from "react-toastify"

const AssignTeamName = () => {
    const { submitData: updateName, isLoading: isNameUpdating } = useSubmit()
    const { data: registrationList, isLoading: isRegistrationListLoading } = useGetData(
        `registrationList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig
    )

    const handleUpdateName = (registrationId, teamName) => {
        try {

        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Registration failed')
        }
    }

    if (isRegistrationListLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Assign Team Name </h3>
                {registrationList?.map((ele, index) => {
                    return (
                        <>
                            <div className={`flex flex-row space-x-3 ${index != registrationList?.length - 1 && 'border-b'} p-3`}>
                                <div className="flex flex-row space-x-1">
                                    <p>College Name</p>
                                    <p>:</p>
                                    <p className="font-dosisBold">{ele?.college?.collegeName}</p>
                                </div>
                                <TextInput
                                    name={''}
                                    label={''}


                                />
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default AssignTeamName