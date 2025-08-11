'use client'

import { CustomTable } from "@/components/custom_table";
import { Loading } from "@/components/loading";
import { useQueryConfig } from "@/config/useQuery.config";
import { useGetData } from "@/hooks/useGetData";
import { useSubmit } from "@/hooks/useSubmit";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const DeleteRegistration = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [registrationId, setRegistrationId] = useState(null)
    const { submitData, isLoading: isSubmitting } = useSubmit()
    const queryClient = useQueryClient()

    const { data: registrationList, isLoading: isRegistrationListLoading } = useGetData(
        `registrationList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig
    )

    if (isRegistrationListLoading) return <Loading />

    const handleShowPopup = (registrationId) => {
        setRegistrationId(registrationId)
        setShowPopup(true)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
        setRegistrationId(null)
    }

    const handleClick = async () => {
        try {
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/DeleteRegistrationDetails`,
                {
                    registrationId: registrationId,
                }
            )
            if (data) {
                toast.success('Successfully deleted the registration details')
                await queryClient.invalidateQueries('registrationList')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Failed to delete registration')
        }
        handleClosePopup()
    }

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Delete Registration </h3>
                <CustomTable
                    rows={['S.I No', 'Team Name', 'College Name', 'Name', 'Email', 'Status', 'Is Reported', 'Action']}
                >
                    {registrationList?.map((ele, index) => {
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
                                    <td className="px-2 py-3">{ele?.status?.status}</td>
                                    <td className="px-2 py-3">{ele?.isTeamReported === true ? 'Reported' : 'Not Reported'}</td>
                                    <td className="px-2 py-3">
                                        <button
                                            onClick={() => handleShowPopup(ele?.registrationId)}
                                            className="bg-blue-950 text-white py-1 px-2 rounded-md text-lg font-dosisMedium hover:bg-blue-700 transition duration-300 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </CustomTable>
            </div>

            {showPopup && showPopup === true && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                        <h3 className="font-dosisBold text-lg mb-4">Confirm Action</h3>
                        <p className="mb-4">Are you sure you want to delete this registration detail?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleClosePopup}
                                className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClick}
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

export default DeleteRegistration