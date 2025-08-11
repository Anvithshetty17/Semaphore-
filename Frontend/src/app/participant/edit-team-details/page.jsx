'use client'

import { TextInput } from "@/components/input"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useCached } from "@/hooks/useCached"
import { useGetData } from "@/hooks/useGetData"
import { useSubmit } from "@/hooks/useSubmit"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"

const EditTeamDetails = () => {
    const { cached } = useCached('isAuthenticated')
    const router = useRouter()
    const queryClient = useQueryClient()
    const [inputData, setInputData] = useState(null)
    const { submitData, isLoading: isSubmitting } = useSubmit()

    const { data: registrationData, isLoading: isRegistrationDataLoading } = useGetData(
        `registrationDetails`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegistrationDetails?userId=${cached?.userId}`,
        useQueryConfig,
    )

    useEffect(() => {
        if (registrationData) {
            let eventListData = [];
            registrationData?.eventTeams?.map((ele, index) => {
                let eventTeamList = []
                ele?.eventMembers?.map((el, ind) => eventTeamList.push(el))
                if (ele?.event?.eventName?.toLowerCase() === 'dance') {
                    const newLength = 12 - eventTeamList.length;
                    for (let i = 0; i < newLength; i++) {
                        eventTeamList.push({
                            eventMemberId: null,
                            memberName: '',
                            memberPhoneNumber: ''
                        })
                    }
                }
                let data = {
                    eventId: ele?.event.eventId,
                    eventName: ele?.event.eventName,
                    memberList: eventTeamList
                }
                eventListData.push(data)
            });
            setInputData(eventListData)
        }
    }, [registrationData])

    const handleInputChange = (eventIndex, memberIndex, field, value) => {
        setInputData((prevData) => {
            return prevData.map((eventData, eIndex) => {
                if (eIndex === eventIndex) {
                    const updatedMemberList = eventData.memberList.map((member, mIndex) => {
                        if (mIndex === memberIndex) {
                            return { ...member, [field]: value };
                        }
                        return member;
                    });
                    return { ...eventData, memberList: updatedMemberList };
                }
                return eventData;
            });
        });
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        if (isSubmitting === true) return
        let itManagerPhoneNumber = '';
        inputData?.map((ele) => {
            if (ele?.eventName?.toLowerCase() === 'it manager') {
                itManagerPhoneNumber = ele?.memberList[0]?.memberPhoneNumber
            }
        })
        let photoGraphy = []
        inputData?.map((ele) => {
            if (ele?.eventName?.toLowerCase() === 'photography') {
                photoGraphy.push(ele?.memberList[0]?.memberPhoneNumber)
            }
        })

        try {
            let phoneNumberList = []
            let isError = false;
            inputData?.map((ele, index) => {
                ele?.memberList?.map((el, ind) => {
                    if (el?.memberName !== '' && el?.memberPhoneNumber?.toString()?.length !== 10) {
                        toast.error('Phone Number must be exactly 10 digits')
                        isError = true;
                        return
                    }
                    if (el?.memberPhoneNumber?.toString() !== '') {
                        if (ele?.eventName?.toLowerCase() !== 'it manager' && el?.memberPhoneNumber === itManagerPhoneNumber) {
                            toast.error('IT Manager candidate cannot participate in dance')
                            isError = true;
                            return
                        }
                        if (ele?.eventName?.toLowerCase() !== 'photography' && photoGraphy?.includes(el?.memberPhoneNumber)) {
                            toast.error('Photography event candidate cannot participate in dance')
                            isError = true;
                            return
                        }
                        if (!phoneNumberList?.includes(el?.memberPhoneNumber)) {
                            phoneNumberList?.push(el?.memberPhoneNumber)
                        }
                    }
                })
            })
            if (phoneNumberList?.length > 15) {
                toast.error('Maximum 15 participants allowed')
                isError = true
                return
            }
            if (isError === true) {
                return
            }
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/UpdateTeamMemberDetails`,
                {
                    userId: cached?.userId,
                    eventRegistrationDetails: inputData,
                }
            )
            if (data) {
                toast.success('Event registration successful')
                // queryClient.invalidateQueries('registrationDetails')
                // router.back()
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Registration failed')
        }
    }

    if (isRegistrationDataLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Edit Team Details </h3>
                <form className="flex flex-col space-y-3" onSubmit={handleUpdate}>
                    {inputData?.map((ele, index) => {
                        return (
                            <>
                                <div className="flex flex-col space-y-3">
                                    <p className="font-dosisMedium">{ele?.eventName}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                        {ele?.memberList?.map((el, ind) => {
                                            return (
                                                <>
                                                    <TextInput
                                                        name={`${ele?.eventId}_${ind}_memberName`}
                                                        label={`Member ${ind + 1} Participant Name`}
                                                        placeholder="Enter Name"
                                                        type="text"
                                                        // isRequired={ind < 4 ? true : false}
                                                        isRequired={false}
                                                        value={el?.memberName}
                                                        onChange={(e) => handleInputChange(index, ind, 'memberName', e.target.value)}
                                                    />
                                                    <TextInput
                                                        name={`${ele?.eventId}_${ind}_memberPhoneNumber`}
                                                        label={`Member ${ind + 1} Phone Number`}
                                                        placeholder="Enter Phone Number"
                                                        type="number"
                                                        // isRequired={ind < 4 ? true : false}
                                                        isRequired={false}
                                                        value={el?.memberPhoneNumber}
                                                        onChange={(e) => handleInputChange(index, ind, 'memberPhoneNumber', e.target.value)}
                                                    />
                                                </>
                                            )
                                        })}
                                    </div>
                                    {index != inputData.length - 1 && <hr />}
                                </div>
                            </>
                        )
                    })}
                    <div className="flex justify-center w-full font-dosisMedium">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-dosisBold hover:bg-blue-700 transition duration-300 cursor-pointer"
                            type="submit"
                        >
                            {isSubmitting ? 'Processing ... Please wait' : 'Update Details'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTeamDetails