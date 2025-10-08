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
    const [teamNames, setTeamNames] = useState({})
    const [editingStates, setEditingStates] = useState({});
    const [filter, setFilter] = useState("all");
    const { data: regCollegeNames, isLoading: isEventLoading } = useGetData(
        'regCollegeNames',
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig,
    )

    useEffect(() => {
        if (regCollegeNames) {
            const nameMap = {}
            regCollegeNames.forEach((ele) => {
                if (ele?.registrationId) nameMap[ele.registrationId] = ele?.teamName || ''
            })
            setTeamNames(nameMap)
        }
    }, [regCollegeNames])

    // Filtered teams based on dropdown selection
    const filteredTeams = regCollegeNames?.filter((ele) => {
        if (filter === "all") return true;
        if (filter === "sa") return ele?.teamName === "sa";
        return true;
    });

    const handleClick = async (registrationId) => {
        toast.info('Assigning team names .. please wait')
        try {
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/AssignTeamName`,
                {
                    teamName: teamNames[registrationId],
                    registrationId,
                }
            )
            if (data) {
                toast.success('Successfully assigned team names')
                setEditingStates((prev) => ({ ...prev, [registrationId]: false }));

            }
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message ?? 'Registration failed')
        }
    }

    const handleChangeName = (name, registrationId) => {
        setTeamNames((prev) => ({ ...prev, [registrationId]: name }))
    }

    if (isEventLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-dosisBold"> Assign Team Name </h3>
                    <select
                        className="border rounded px-2 py-1 bg-slate-800 text-white"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="all">All Teams</option>
                        <option value="sa">Team Name: sa</option>
                    </select>
                </div>
                {filteredTeams?.map((ele, index) => {
                    return (
                        <div key={ele?.registrationId || index} className={`grid grid-cols-4 gap-x-3 gap-y-6 ${index != filteredTeams?.length - 1 && 'border-b'} p-3`}>
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
                                {editingStates[ele?.registrationId] !== false ? (
                                        <TextInput
                                            name="teamName"
                                            label={"Team Name"}
                                            placeholder="Enter Team Name"
                                            value={teamNames[ele?.registrationId] ?? ele.teamName}
                                            onChange={(e) => handleChangeName(e.target.value, ele?.registrationId)}
                                        />
                                    ) : (
                                        <span className="py-2 px-3 border border-gray-300 rounded-md">
                                            {teamNames[ele?.registrationId] ?? ele.teamName}
                                        </span>
                                    )}

                                    {editingStates[ele?.registrationId] !== false && (
                                        <button
                                            onClick={() => handleClick(ele?.registrationId)}
                                            className="bg-blue-950 text-white py-1 px-10 rounded-md text-lg font-dosisMedium hover:bg-blue-700 transition duration-300 cursor-pointer"
                                        >
                                            Update Team Name
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                })}
            </div>
        </>
    )
}

export default AssignTeamName