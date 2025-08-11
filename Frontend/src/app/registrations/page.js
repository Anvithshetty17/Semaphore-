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
  if (isEventLoading) return <Loading />
  return (
    <>
      <div className="p-8 bg-gray-50 rounded-lg">
        <h2 className="font-dosisBold text-2xl font-bold mb-6">Registrations List</h2>
        <CustomTable rows={['S.I. No', 'Team Name', 'College Name', 'Fees', 'Status Of Arrival']} centerIndex={[4]}>
          {regCollegeNames?.map((ele, index) => {
            return (
              <>
                <tr
                  className={`bg-white ${index != regCollegeNames?.length - 1 && 'border-b'
                    } text-[13px]`}
                >
                  <td className="px-2 py-3">{index + 1}</td>
                  <td className="px-2 py-3">{ele?.teamName}</td>
                  <th
                    scope="row"
                    className="p-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {ele?.college.collegeName}
                  </th>

                  <td className="px-2 py-3">{ele?.isPaid ? "Paid" : "Pending"}</td>
                  <td className="px-2 py-3 flex flex-row justify-center">
                    {ele?.isTeamReported === false && <button
                      onClick={() => handleButtonClick(ele?.registrationId)}
                      className="bg-blue-950 text-white py-1 px-2 rounded-md text-lg font-dosisMedium hover:bg-blue-700 transition duration-300 cursor-pointer"
                    >
                      Mark as reported
                    </button>}</td>
                </tr>
              </>
            )
          })}
        </CustomTable>
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h3 className="font-dosisBold text-lg mb-4">Confirm Action</h3>
            <p className="mb-4">Are you sure you want to mark this as reported?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDialogClose}
                className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg"
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
