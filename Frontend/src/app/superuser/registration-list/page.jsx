"use client"

import { CustomTable } from "@/components/custom_table"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useRouter } from "next/navigation"
import React, { useState } from 'react'


const RegistrationListPage = () => {
    const { data: registrationList, isLoading: isRegistrationListLoading } = useGetData(
        `registrationList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig
    )

    const router = useRouter()
    const [feeFilter, setFeeFilter] = React.useState('All')

    if (isRegistrationListLoading) return <Loading />

    const filteredList = registrationList?.filter((ele) => {
        if (!registrationList) return []
        if (feeFilter === 'All') return true
        if (feeFilter === 'Paid') return !!ele?.isPaid
        // allow 'NotPaid' or 'Pending' option
        if (feeFilter === 'NotPaid' || feeFilter === 'Pending') return !ele?.isPaid
        return true
    })
    

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900  p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-dosisBold mb-3 text-white"> Registration List </h3>
                    <div className="flex items-center space-x-2">
                        <label className="text-white text-sm">Filter Fees:</label>
                        <select value={feeFilter} onChange={(e) => setFeeFilter(e.target.value)} className="rounded-md px-2 py-1 bg-slate-800 text-white border border-white/20">
                            <option value="All">All</option>
                            <option value="Paid">Paid</option>
                            <option value="NotPaid">NotPaid</option>
                        </select>
                    </div>
                </div>
                <CustomTable
                    rows={['S.I No', 'Team Name', 'College Name', 'Name', 'Email', 'isPaid', 'Is Reported', 'Actions']}
                >
                    {/* modal state handled in this file via local state */}
                    
                    {filteredList?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != registrationList?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
                                    <td className="px-2 py-3">{ele?.teamName}</td>
                                    <th
                                        scope="row"
                                        className="p-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {ele?.college?.collegeName}
                                    </th>

                                    <td className="px-2 py-3">{ele?.user?.fullName}</td>
                                    <td className="px-2 py-3">{ele?.user?.email}</td>
                                    <td className="px-2 py-3">{ele?.isPaid?.toString()}</td>
                                    <td className="px-2 py-3">{ele?.isTeamReported === true ? 'Reported' : 'Not Reported'}</td>
                                    <td className="px-2 py-3">
                                        <button
                                            onClick={() => router.push(`/superuser/registration-list/${ele?.user?.userId}`)}
                                            className="bg-cyan-600 text-white px-3 py-1 rounded text-sm hover:opacity-90"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </CustomTable>
            </div>
        </>
    )
}

export default RegistrationListPage