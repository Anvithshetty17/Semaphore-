"use client"

import React, { useState } from "react"
import { Loading } from "@/components/loading"
import { useGetData } from "@/hooks/useGetData"
import { useQueryConfig } from "@/config/useQuery.config"

const SuperuserRegistrationDetailsModal = ({ userId, onClose }) => {
  const { data: registrationData, isLoading } = useGetData(
    `su-registration-${userId}`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegistrationDetails?userId=${userId}`,
    useQueryConfig
  )

  if (!userId) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[90%] max-w-3xl bg-white rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-start">
          <h3 className="font-dosisBold text-lg">Team Details</h3>
          <button className="text-sm text-gray-600" onClick={onClose}>Close</button>
        </div>
        <div className="mt-3">
          {isLoading && <Loading />}
          {!isLoading && registrationData && (
            <div className="space-y-3 text-sm text-gray-800">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Team Name</div>
                <div>{registrationData.teamName}</div>
                <div className="font-medium">College</div>
                <div>{registrationData.college?.collegeName}</div>
                <div className="font-medium">Registered User</div>
                <div>{registrationData.user?.fullName} ({registrationData.user?.email})</div>
                <div className="font-medium">Is Paid</div>
                <div>{registrationData.isPaid ? 'Yes' : 'No'}</div>
              </div>

              <div>
                <p className="font-medium mt-2">Event participants</p>
                {registrationData?.eventTeams?.length ? (
                  registrationData.eventTeams.map((et) => (
                    <div key={et.eventTeamsId || et.event?.eventId} className="mt-2 border rounded p-2 bg-gray-50">
                      <div className="text-sm font-semibold">{et.event?.eventName}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {et.eventMembers?.map((m) => (
                          <div key={m.eventMemberId || m.memberPhoneNumber} className="p-2 rounded bg-white shadow-sm">
                            <div className="text-sm font-medium">{m.memberName}</div>
                            <div className="text-xs text-gray-500">{m.memberPhoneNumber}</div>
                            <div className="text-xs text-gray-500">{m.memberEmail}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No event participants linked.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SuperuserRegistrationDetailsModal
