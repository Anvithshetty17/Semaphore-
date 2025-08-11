"use client";
import { DropDown } from "@/components/dropdown";
import { TextInput } from "@/components/input";
import { Loading } from "@/components/loading";
import { useQueryConfig } from "@/config/useQuery.config";
import { useCached } from "@/hooks/useCached";
import { useGetData } from "@/hooks/useGetData";
import { useSubmit } from "@/hooks/useSubmit";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateScores() {
    const { submitData: updateScore, isLoading: isSubmitting } = useSubmit();
    const [teamData, setTeamData] = useState([]);
    const [roundNo, setRoundNo] = useState(null);
    const { cached } = useCached("isAuthenticated");
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: totalRounds, isLoading: isTotalRoundsLoading } = useGetData(
        `totalRounds`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/GetEventMaxRounds?${cached?.userId}`,
        useQueryConfig
    );

    const { data: eventTeamDetails, isLoading: isTeamDetailsLoading } =
        useGetData(
            `${searchParams.get("roundNo")}eventDetailsData`,
            `${process.env.NEXT_PUBLIC_URL
            }/web/api/mainEvent/v1/GetTeamScoresForEventHeads?userId=${cached?.userId
            }&roundNo=${searchParams.get("roundNo")}`,
            useQueryConfig
        );

    const { data: regCollege, isLoading: isCollegeRoundsLoading } = useGetData(
        `regCollege`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig
    );

    useEffect(() => {
        if (eventTeamDetails) {
            let newList = [];
            eventTeamDetails?.map((ele) => {
                const newData = {
                    teamId: ele?.eventTeam?.eventTeamId,
                    marks: ele?.score,
                    collegeName: ele?.eventTeam?.registration?.college?.collegeName,
                    teamName: ele?.eventTeam?.registration?.teamName,
                };
                newList.push(newData);
            });
            setTeamData(newList);
        }
    }, [eventTeamDetails]);


    const handleInputChange = (e, index) => {
        const updatedTeamData = [...teamData];
        updatedTeamData[index].marks = parseInt(e.target.value) || 0;
        setTeamData(updatedTeamData);
    };

    const handleRoundChange = (selectedRound) => {
        setRoundNo(selectedRound);
        router.push(`/event-heads/update-scores?roundNo=${selectedRound}`);
    };

    const handleSubmit = async () => {
        try {
            toast.info("Updating scores .. please wait")
            const { data } = await updateScore(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/UpdateTeamScoreForEventHeads`,
                {
                    userId: cached?.userId,
                    roundNo: searchParams.get("roundNo"),
                    scoreData: teamData,
                }
            );

            if (data) {
                toast.success("Successfully Updated The Score");
            }
        } catch (error) {
            toast.error("There was an error updating the scores.");
        }
    };
    if (isTotalRoundsLoading) return <Loading />;

    return (
        <div className="bg-gray-100 flex items-center justify-center font-dosisRegular">
            <div className="bg-white w-full p-8 rounded-lg shadow-md">
                {/* Select Round */}
                <div className="mb-8 w-48">
                    <DropDown
                        name="round"
                        label="Select Round"
                        DropDownItems={Array(totalRounds)
                            .fill("")
                            .map((_, index) => ({
                                label: "Round " + (index + 1),
                                value: index + 1,
                            }))}
                        placeholder="Select Round"
                        onChangeFunction={handleRoundChange}
                    />
                </div>
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-8 text-center font-dosisBold text-black mb-4">
                    <div>S.I No</div>
                    <div>Team Name</div>
                    <div>College Name</div>
                    <div>Score</div>
                </div>

                {/* Table Rows */}
                {teamData.map((team, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-4 gap-8 items-center text-center mb-4"
                    >
                        <div className="font-dosisMedium">{index + 1}</div>
                        <div className="font-dosisMedium">{team.teamName}</div>
                        <div className="font-dosisMedium">{team.collegeName}</div>
                        <TextInput
                            name={""}
                            label={""}
                            value={team?.marks}
                            onChange={(e) => {
                                setTeamData((prevData) =>
                                    prevData.map((ele) =>
                                        team.teamId === ele?.teamId
                                            ? { ...ele, marks: e.target.value }
                                            : ele
                                    )
                                );
                            }}
                            placeholder={"Enter Score"}
                        />
                    </div>
                ))}
                {/* Update Button */}
                <div className="flex justify-start mt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-800 text-white py-3 px-6 rounded-md font-dosisBold hover:bg-blue-700 transition duration-300"
                        disabled={isSubmitting}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
