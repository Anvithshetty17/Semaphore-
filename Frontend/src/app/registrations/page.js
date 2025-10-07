"use client"
import { CustomTable } from '@/components/custom_table'
import { Loading } from '@/components/loading'
import { MainLayout } from '@/components/main_layout'
import { registrationMenu } from '@/config/route.config'
import { useQueryConfig } from '@/config/useQuery.config'
import { useCached } from '@/hooks/useCached'
import { useGetData } from '@/hooks/useGetData'
import { useSubmit } from '@/hooks/useSubmit'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

const Page = () => {
  const queryClient = useQueryClient()
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
  const { submitData, isLoading: isSubmitting } = useSubmit()

  const handleButtonClick = (registrationId) => {
    setSelectedRegistrationId(registrationId)
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedRegistrationId(null)
    setShowDialog(false);
  };

  const handleOkClick = async () => {
    toast.info('Marking as reported .. please wait')
    try {
      const { data } = await submitData(
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/UpdateTeamAsReported`,
        {
          registrationId: selectedRegistrationId,
          hello: "world"
        }
      )
      if (data) {
        toast.success('Successfully marked as reported')
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message ?? 'Marking as reported failed')
    }
    await queryClient.invalidateQueries('regCollegeNames')
    setShowDialog(false);
  };

  const { cached } = useCached('isAuthenticated');
  const { data: regCollegeNames, isLoading: isEventLoading } = useGetData(
    'regCollegeNames',
    `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
    useQueryConfig,
  )
  const [feeFilter, setFeeFilter] = useState('All')
  const handleFeeFilterChange = (e) => setFeeFilter(e.target.value)
  const filteredRegistrations = regCollegeNames?.filter((ele) => {
    if (!regCollegeNames) return []
    if (feeFilter === 'All') return true
    if (feeFilter === 'Paid') return !!ele?.isPaid
    if (feeFilter === 'Pending') return !ele?.isPaid
    return true
  })
  if (isEventLoading) return <Loading />
  return (
    <>
      <div className="flex flex-col space-y-3 border rounded-lg bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8">
        <h2 className="font-dosisBold text-2xl font-bold mb-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">Registrations List</h2>
        <div className="flex items-center space-x-3 mb-4">
          <label className="text-white">Filter Fees:</label>
          <select
            value={feeFilter}
            onChange={handleFeeFilterChange}
            className="rounded-md px-2 py-1 bg-slate-800 text-white border border-white/20"
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <CustomTable rows={['S.I. No', 'Team Name', 'College Name', 'Fees', 'Status Of Arrival']} centerIndex={[4]}>
          {filteredRegistrations?.map((ele, index) => {
            return (
                <tr
                  key={ele?.registrationId ?? index}
                  className={` bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900  text-white ${index != filteredRegistrations?.length - 1 && 'border-b border-white-400/30'} text-[13px] text-black-600 hover:bg-gray-100 transition-all`}
                >
                  <td className="px-2 py-3">{index + 1}</td>
                  <td className="px-2 py-3 ">{ele?.teamName}</td>
                  <th
                    scope="row"
                    className="p-2 font-medium text-white whitespace-nowrap"
                  >
                    {ele?.college.collegeName}
                  </th>

                  <td className={`px-2 py-3 font-dosisBold ${ele?.isPaid ? 'text-green-400' : 'text-yellow-300'}`}>{ele?.isPaid ? "Paid" : "Pending"}</td>
                  <td className="px-2 py-3 flex flex-row justify-center">
                      <div className="flex items-center space-x-2">
                        {ele?.isTeamReported === false && <button
                          onClick={() => handleButtonClick(ele?.registrationId)}
                          className="bg-blue-950 text-white py-1 px-2 rounded-md text-lg font-dosisMedium hover:bg-blue-700 transition duration-300 cursor-pointer"
                        >
                          Mark as reported
                        </button>}
                        <button
                          onClick={() => window.location.href = `/registrations/${ele?.user?.userId}`}
                          className="bg-cyan-600 text-white py-1 px-2 rounded-md text-sm font-dosisMedium hover:opacity-90"
                        >
                          View
                        </button>
                      </div>
                    </td>
                </tr>
            )
          })}
        </CustomTable>
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-5 rounded-lg shadow-lg w-1/3 border border-cyan-400/30">
            <h3 className="font-dosisBold text-lg mb-4 text-white">Confirm Action</h3>
            <p className="mb-4 text-cyan-200">Are you sure you want to mark this as reported?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDialogClose}
                className="bg-white text-black py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleOkClick}
                className="bg-blue-950 text-white hover:bg-blue-700 py-2 px-4 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
