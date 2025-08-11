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

export default function PromoteScores() {
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

  useEffect(() => {
    if (eventTeamDetails) {
      let newList = [];
      eventTeamDetails?.map((ele) => {
        const newData = {
          teamId: ele?.eventTeam?.eventTeamId,
          score: ele?.score,
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
    updatedTeamData[index].score = parseInt(e.target.value) || 0;
    setTeamData(updatedTeamData);
  };

  const handleRoundChange = (selectedRound) => {
    setRoundNo(selectedRound);
    router.push("/event-heads/promote-participants?roundNo=" + selectedRound);
  };

  const handleSubmit = async (teamId) => {
    try {
      toast.info("Promoting participants .. please wait")
      const { data } = await updateScore(
        `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/PromoteTeamToNextRound`,
        {
          roundNo: searchParams.get("roundNo"),
          teamId: teamId,
        }
      );

      if (data) {
        toast.success("Successfully Promoted Team");
      }
    } catch (error) {
      toast.error("There was an error updating the scores.");
    }
  };

  if (isTotalRoundsLoading) return <Loading />

  return (
    <div className="bg-gray-100 flex items-center justify-center font-dosisRegular">
      <div className="bg-white w-full p-8 rounded-lg shadow-md">
        {/* Select Round */}
        <div className="mb-8 w-48">
          <DropDown
            name={"round"}
            label="Select Round"
            firstValue={roundNo}
            DropDownItems={Array(totalRounds)
              .fill("")
              ?.map((ele, index) => ({
                label: "Round " + (index + 1),
                value: index + 1,
              }))}

            placeholder={"Select Round"}
            onChangeFunction={handleRoundChange}
          />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 gap-8 text-center font-dosisBold text-black mb-4">
          <div>S.I No</div>
          <div>Team Name</div>
          <div>College Name</div>
          <div>Score</div>
          <div>Promote</div>
        </div>

        {/* Table Rows */}
        {teamData?.map((team, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-8 items-center text-center mb-4"
          >
            <div className="font-dosisMedium">{index + 1}</div>
            <div className="font-dosisMedium">{team.teamName}</div>
            <div className="font-dosisMedium">{team.collegeName}</div>
            <p>{team.score}</p>
            <button
              onClick={() => handleSubmit(team.teamId)}
              className="bg-blue-800 w-full text-white py-2 px-3 rounded-md font-dosisBold hover:bg-blue-700 transition duration-300"
            >
              Promote
            </button>
          </div>
        ))}

        {/* Update Button */}
      </div>
    </div>
  );
}
