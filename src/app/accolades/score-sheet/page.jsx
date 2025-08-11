"use client"

import { DropDown } from '@/components/dropdown';
import { Loading } from '@/components/loading';
import { useQueryConfig } from '@/config/useQuery.config';
import { useCached } from '@/hooks/useCached'
import { useGetData } from '@/hooks/useGetData';
import { useSubmit } from '@/hooks/useSubmit';
import React, { useState } from 'react'
import { EyeIcon } from 'hugeicons-react';
import { useRouter } from 'next/navigation';

export default function Accolades() {
  const router = useRouter()
  const { submitData, isLoading } = useSubmit(null);
  const [teamRankingData, setTeamRankingData] = useState()
  const { cached } = useCached('isAuthenticated');
  const { data: eventsData, isLoading: isEventsLoading } = useGetData(
    'eventsList',
    `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/FindAll`,
    useQueryConfig,
  );
  if (isEventsLoading) return <Loading />

  const handleEventChange = async (eventId) => {
    const { data } = await submitData(
      `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetEventRankings`,
      {
        eventId: eventId
      }
    )
    if (data) {
      setTeamRankingData(data);
    }
  };


  return (
    <div className="p-8 bg-white shadow rounded-lg w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-dosisBold text-gray-800">Top Rankings</h2>
      </div>

      <div className="mb-4 grid grid-cols-4">

        <DropDown
          name={'event'}
          label='Select Event'
          placeholder={'Select An Event'}
          DropDownItems={eventsData?.map((ele) => {
            return {
              label: ele?.eventName,
              value: ele?.eventId
            }
          })}
          onChangeFunction={handleEventChange}
        />
      </div>

      {/* Rankings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Team Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">College Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Max Round</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {teamRankingData && teamRankingData.length > 0 ? (
              teamRankingData.map((ranking, index) => (
                <tr key={ranking.id} className="border-b border-gray-200">
                  <td className="font-dosisMedium px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="font-dosisMedium px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ranking.teamName}</td>
                  <td className="font-dosisMedium px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ranking.collegeName}</td>
                  <td className="font-dosisMedium px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ranking.maxRound}</td>
                  <td className="font-dosisMedium px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ranking.totalScore}</td>
                  <td className="font-dosisMedium px-6 py-4 whitespace-nowrap text-sm text-gray-700"><EyeIcon color='#000' className='cursor-pointer' onClick={() => router.push(`/accolades/details-page?teamId=${ranking.teamId}`)} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No rankings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
