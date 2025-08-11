'use client'

import { CustomTable } from "@/components/custom_table"
import { DropDown } from "@/components/dropdown"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useSubmit } from "@/hooks/useSubmit"
import { useState } from "react"
import { toast } from "react-toastify"

const DeleteEventMembers = () => {

    const { submitData: getEventMembers, isLoading: isEventMembersLoading } = useSubmit()
    const { submitData: deleteMember, isLoading: isDeleting } = useSubmit()

    const [showPopup, setShowPopup] = useState(false);
    const [memberId, setMemberId] = useState(null)


    const [eventMembers, setEventMembers] = useState([])
    const { data: regList, isLoading: isRegListLoading } = useGetData(
        `registeredCollegeList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig,
    )

    const handleGetEventMembers = async (registrationId) => {
        try {
            const { data } = await getEventMembers(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetTeamDetailsFromRegistration`,
                { registrationId }
            )
            if (data) {
                setEventMembers((prev) => data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Registration failed')
        }
    }

    const handleShowPopup = (memberId) => {
        setMemberId(memberId)
        setShowPopup(true)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
        setMemberId(null)
    }

    const handleClick = async () => {
        try {
            const { data } = await deleteMember(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/DeleteEventMember`,
                {
                    eventMemberId: memberId,
                }
            )
            if (data) {
                toast.success('Successfully deleted the member from the team')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Failed to delete registration')
        }
        handleClosePopup()
    }

    if (isRegListLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Delete Event Members </h3>
                <DropDown
                    name={'regListDropdown'}
                    label="Registration List"
                    placeholder={'Select Registration'}
                    DropDownItems={regList?.map((ele) => {
                        return {
                            label: `${ele?.college.collegeName} - ${ele?.user?.fullName} - ${ele?.teamName}`,
                            value: ele?.registrationId,
                        }
                    })}
                    onChangeFunction={(val) => handleGetEventMembers(val)}
                />
                <CustomTable rows={['S.I No', 'Member Name', 'Member Phone Number', 'Event Name', 'Actions']}  >
                    {eventMembers?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != eventMembers?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
                                    <th
                                        scope="row"
                                        className="p-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {ele?.memberName}
                                    </th>
                                    <td className="px-2 py-3">{ele?.memberPhoneNumber}</td>
                                    <td className="px-2 py-3">{ele?.eventTeam?.event?.eventName}</td>

                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap flex flex-row space-x-3 justify-center">
                                        <button
                                            onClick={() => handleShowPopup(ele?.eventMemberId)}
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
                        <p className="mb-4">Are you sure you want to delete this member from the team?</p>
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

export default DeleteEventMembers