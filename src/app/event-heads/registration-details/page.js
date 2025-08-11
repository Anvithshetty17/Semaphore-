"use client"

import { Loading } from '@/components/loading';
import { useQueryConfig } from '@/config/useQuery.config';
import { useCached } from '@/hooks/useCached'
import { useGetData } from '@/hooks/useGetData';
import React from 'react'

export default function Page() {
  const { cached } = useCached('isAuthenticated');

  const { data: registrationDetails, isLoading: isEventLoading } = useGetData(
    'registrationDetails',
    `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetEventTeamsForHead?userId=${cached?.userId}`,
    useQueryConfig,
  )
  if (isEventLoading) return <Loading />

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="font-dosisBold text-2xl font-bold mb-6">Registration List</h2>
      {registrationDetails?.map((registration) => (
        <div
          key={registration.eventTeamId}
          className="border border-gray-300 mb-6 p-6 bg-white shadow-md rounded-lg"
        >
          {/* Event Details */}
          <div className="flex justify-between border-b pb-4 mb-4">
            <div>
              <span className="font-dosisMedium text-gray-600">Team Name</span><br />
              <span className="font-dosisMedium">{registration.registration.teamName}</span>
            </div>
            <div>
              <span className="font-dosisMedium text-gray-600">College Name</span><br />
              <span className="font-dosisMedium">{registration.registration.college.collegeName || "Not Available"}</span> {/* Add actual college data if available */}
            </div>
            <div>
              <span className="font-dosisMedium text-gray-600">Is Reported</span><br />
              <span className="font-dosisMedium">{registration.registration.isTeamReported ? "Yes" : "No"}</span>
            </div>
          </div>

          <div>
            <span className="font-dosisMedium text-gray-600">Participants</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {registration.eventMembers.map((participant) => (
                <div key={participant.eventMemberId} className="flex flex-col">
                  <div className="font-dosisMedium">Name: <span className="ml-1">{participant.memberName}</span></div>
                  <div className="font-dosisMedium">Phone No: <span className="ml-1">{participant.memberPhoneNumber}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


