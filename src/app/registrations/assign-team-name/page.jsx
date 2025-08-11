'use client'

import { TextInput } from "@/components/input"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useSubmit } from "@/hooks/useSubmit"
import { reconciler } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const AssignTeamName = () => {
    const { submitData, isLoading: isSubmitting } = useSubmit()
    const [teamNames, setTeamNames] = useState([])
    const { data: regCollegeNames, isLoading: isEventLoading } = useGetData(
        'regCollegeNames',
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig,
    )

    useEffect(() => {
        if (regCollegeNames) {
            let nameList = []
            regCollegeNames?.map((ele) => {
                nameList.push(ele?.teamName)
            })
            setTeamNames(nameList)
        }
    }, [regCollegeNames])

    const handleClick = async (index, registrationId) => {
        toast.info('Assigning team names .. please wait')
        try {
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/AssignTeamName`,
                {
                    teamName: teamNames[index],
                    registrationId,
                }
            )
            if (data) {
                toast.success('Successfully assigned team names')
            }
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message ?? 'Registration failed')
        }
    }

    const handleChangeName = (name, index) => {
        let nameList = [...teamNames];
        nameList[index] = name
        setTeamNames((prev) => nameList)
    }

    if (isEventLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Assign Team Name </h3>
                {regCollegeNames?.map((ele, index) => {
                    return (
                        <>
                            <div className={`grid grid-cols-4 gap-x-3 gap-y-6 ${index != regCollegeNames?.length - 1 && 'border-b'} p-3`}>
                                <div className="flex flex-col space-y-1 text-[16px] font-dosisRegular">
                                    <p> College Name</p>
                                    <p className="font-dosisMedium"> {ele?.college?.collegeName}</p>
                                </div>
                                <div className="flex flex-col space-y-1 text-[16px] font-dosisRegular">
                                    <p> Payment Status</p>
                                    <p className="font-dosisMedium"> {ele?.isPaid === true ? "Payment Successful" : "Pending"}</p>
                                </div>
                                <div className="flex flex-col space-y-1 text-[16px] font-dosisRegular">
                                    <p> Name</p>
                                    <p className="font-dosisMedium"> {ele?.user?.fullName}</p>
                                </div>
                                <div className="flex flex-col space-y-1 text-[16px] font-dosisRegular">
                                    <p> Phone No</p>
                                    <p className="font-dosisMedium"> {ele?.user?.phoneNumber}</p>
                                </div>
                                <div className="flex flex-col space-y-1 text-[16px] font-dosisRegular">
                                    <TextInput
                                        name="teamName"
                                        label={"Team Name"}
                                        placeholder={'Enter Team Name'}
                                        value={teamNames[index]}
                                        onChange={(e) => handleChangeName(e.target.value, index)}

                                    />
                                    <button
                                        onClick={() => handleClick(index, ele?.registrationId)}
                                        className="bg-blue-950 text-white py-1 px-10 rounded-md text-lg font-dosisMedium hover:bg-blue-700 transition duration-300 cursor-pointer"
                                    >
                                        Update Team Name
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default AssignTeamName