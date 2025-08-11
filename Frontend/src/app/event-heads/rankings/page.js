"use client"; // Add this line at the top of the file

import React from "react";
import Widgetsv from "@/components/widgets";
import { useCached } from "@/hooks/useCached";
import { useGetData } from "@/hooks/useGetData";
import { useQueryConfig } from "@/config/useQuery.config";
import { Loading } from "@/components/loading";
import { CustomTable } from "@/components/custom_table";

function EventHeadsPage() {
  const { cached } = useCached("isAuthenticated");

  // Fetch data for dashboard using useGetData
  const { data, isLoading, error } = useGetData(
    `${cached?.userId}EventHeadRankList`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetTeamRanking?userId=${cached?.userId}`,
    useQueryConfig
  );

  if (isLoading) return <Loading />


  return (
    <>
      <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
        <h3 className="font-dosisBold mb-3"> Team Rankings </h3>
        <CustomTable rows={['S.I. No', 'Team Name', 'College Name', 'Max Round', 'Score']}>
          {data?.map((ele, index) => {
            return (
              <>
                <tr
                  className={`bg-white ${index != data?.length - 1 && 'border-b'
                    } text-[13px]`}
                >
                  <td className="px-2 py-3">{index + 1}</td>
                  <td className="px-2 py-3">{ele?.teamName}</td>
                  <th
                    scope="row"
                    className="p-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {ele?.collegeName}
                  </th>
                  <td className="px-2 py-3">{ele?.maxRound}</td>
                  <td className="px-2 py-3">{ele?.totalScore}</td>
                </tr>
              </>
            )
          })}
        </CustomTable>
      </div>
    </>
    // <div className="p-4 font-mono">
    //   {/* Container for widgets */}
    //   <h5 className="border-b border-gray-300 mb-4"></h5>
    //   <h2 className="text-2xl font-semibold mb-4">Top Rankings</h2>

    //   <table className="w-full border-collapse">
    //     <thead>
    //       <tr>
    //         <th className="text-left p-2 border-b">Rank</th>
    //         <th className="text-left p-2 border-b">Team Name</th>
    //         <th className="text-left p-2 border-b">Score</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {topRankings.map((team, index) => (
    //         <tr key={team.teamName} className="border-b">
    //           <td className="p-2">{index + 1}.</td>
    //           <td className="p-2">{team.teamName}</td>
    //           <td className="p-2">{team.totalScore}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default EventHeadsPage;
