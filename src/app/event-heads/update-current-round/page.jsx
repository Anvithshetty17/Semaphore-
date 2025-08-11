'use client'

import { DropDown } from "@/components/dropdown";
import { Loading } from "@/components/loading";
import { useQueryConfig } from "@/config/useQuery.config";
import { useCached } from "@/hooks/useCached";
import { useGetData } from "@/hooks/useGetData";
import { useSubmit } from "@/hooks/useSubmit";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const UpdateCurrentRound = () => {

    const { submitData, isLoading: isSubmitting } = useSubmit()
    const [selectedRoudNo, setSelectedRoundNo] = useState(null);
    const { cached } = useCached('isAuthenticated')
    const queryClient = useQueryClient()

    const { data: totalRounds, isLoading: isTotalRoundsLoading } = useGetData(
        `totalRounds`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/GetEventMaxRounds?${cached?.userId}`,
        useQueryConfig
    );

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            toast.info('Updating current Round')
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/UpdateCurrentRound`,
                {
                    currentRound: selectedRoudNo,
                    userId: cached?.userId,
                }
            )
            if (data) {
                await queryClient.invalidateQueries(`${cached?.userId}EventHeadDashboard`)
                toast.success('Successfully updated the current round data')
            }
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message ?? 'Registration failed')
        }
    }

    if (isTotalRoundsLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-6 border rounded-lg p-3 bg-white">
                <h3 className="font-dosisBold mb-3"> Update Current Round Status </h3>
                <div className="flex flex-col space-y-3">
                    <div className="grid grid-cols-4 gap-4">
                        <DropDown
                            name="currentRound"
                            label="Select Round"
                            DropDownItems={Array(totalRounds)
                                .fill("")
                                .map((_, index) => ({
                                    label: "Round " + (index + 1),
                                    value: index + 1,
                                }))}
                            placeholder="Select Round"
                            onChangeFunction={(val) => setSelectedRoundNo(val)}
                        />
                    </div>
                    <div className="flex justify-start mt-8">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-800 text-white py-3 px-6 rounded-md font-dosisBold hover:bg-blue-700 transition duration-300"
                            disabled={isSubmitting}
                        >
                            Update Current Round
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCurrentRound