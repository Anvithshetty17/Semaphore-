'use client'

import { TextInput } from "@/components/input"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useCached } from "@/hooks/useCached"
import { useGetData } from "@/hooks/useGetData"
import { useSubmit } from "@/hooks/useSubmit"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const ParticipantRegistrationPage = () => {

    const { cached } = useCached('isAuthenticated')
    const router = useRouter()

    const { data: isPaymentPending, isLoading: isPaymentPendingLoading } = useGetData(
        isPaymentPending,
        ${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/IsPaymentPending?userId=${cached?.userId},
        useQueryConfig
    )

    const { data: eventList, isLoading: isEventListLoading } = useGetData(
        registrationEventList,
        ${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/GetEventsForRegistration,
        useQueryConfig
    )

    const { data: isAlreadyRegistered, isLoading: isRegistrationChecking } = useGetData(
        ${cached?.userId}IsAlreadyRegistered,
        ${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/IsAlreadyRegistred?userId=${cached?.userId},
        useQueryConfig
    )

    const isLoading = isEventListLoading || isRegistrationChecking

    if (isLoading) return <Loading />

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0033] to-[#0d0d2b] text-white px-6 py-10">
            {isPaymentPending === true && isAlreadyRegistered === true && (
                <div className="flex flex-col space-y-3 border border-[#FF00FF]/40 bg-[#0a0a1a]/80 p-6 rounded-xl shadow-[0_0_20px_#FF00FF] mb-6">
                    <h3 className="text-[#FF00FF] font-dosisBold text-xl">⚠ Payment Pending!</h3>
                    <p className="text-gray-300"> Please complete your payment procedure for successful registration. </p>
                    <div className="flex justify-start font-dosisMedium px-2">
                        <button
                            className="bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-black py-2 px-6 rounded-md font-semibold shadow-[0_0_15px_#FF00FF] hover:shadow-[0_0_25px_#00FFFF] transition"
                            type="submit"
                            onClick={() => router.push('/participant/make-payment')}
                        >
                            Make a Payment
                        </button>
                    </div>
                </div>
            )}
            {isAlreadyRegistered === true ? <AlreadyRegisteredSection /> : <RegisterSection eventList={eventList} />}
        </div>
    )
}

const RegisterSection = ({ eventList }) => {
    const { cached } = useCached('isAuthenticated')
    const { submitData: handleSubmit, isLoading: isSubmitting } = useSubmit()
    const router = useRouter()

    const [inputData, setInputData] = useState([])

    useEffect(() => {
        let eventListData = []
        eventList?.map((ele, index) => {
            let eventData = {
                eventId: ele?.eventId,
                eventName: ele?.eventName,
                memberCount: ele?.memberCount,
                memberList: []
            }
            const loopCount = ele?.eventName?.toLowerCase() == 'dance' ? 12 : ele?.memberCount
            for (let i = 0; i < loopCount; i++) {
                eventData?.memberList?.push({
                    memberName: '',
                    memberPhoneNumber: ''
                })
            }
            eventListData?.push(eventData)
        })
        setInputData(eventListData)
    }, [eventList])

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

    const handleCompleteRegistration = async (e) => {
        e.preventDefault()
        if (isSubmitting === true) return
        try {
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
            const { data } = await handleSubmit(
                ${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/CompleteRegistration,
                {
                    userId: cached?.userId,
                    eventRegistrationDetails: inputData,
                }
            )


            if (data) {
                toast.success('Event registration successful')
                setTimeout(() => {
                    router.push(/participant/make-payment)
                })
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Registration failed')
        }
    }

    return (
        <div className="flex flex-col space-y-4 border border-[#FF00FF]/40 rounded-xl bg-[white] p-6 ">
            <h3 className="font-dosisBold mb-4 text-2xl bg-gradient-to-r from-[#FF00FF] via-[#8A2BE2] to-[#00FFFF] text-transparent bg-clip-text drop-shadow-[0_0_15px_#FF00FF]">
                Enter Participant Details
            </h3>
            <form className="flex flex-col space-y-4" onSubmit={handleCompleteRegistration}>
                {inputData?.map((ele, index) => {
                    return (
                        <div key={index} className="flex flex-col space-y-3">
                            <p className="font-dosisMedium text-[#00FFFF] text-lg">{ele?.eventName}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {ele?.memberList?.map((_, ind) => {
                                    return (
                                        <div key={ind} className="flex flex-col space-y-2">
                                            <TextInput
                                                name={${ele?.eventId}_${ind}_memberName}
                                                label={Member ${ind + 1} Participant Name}
                                                placeholder="Enter Name"
                                                type="text"
                                                isRequired={false}
                                                value={ele?.memberName}
                                                onChange={(e) => handleInputChange(index, ind, 'memberName', e.target.value)}
                                                className="bg-[#0a0a1a] text-[#00FFFF] border border-[#FF00FF]/50 focus:ring-2 focus:ring-[#FF00FF] rounded-md shadow-[0_0_10px_#FF00FF]"
                                            />
                                            <TextInput
                                                name={${ele?.eventId}_${ind}_memberPhoneNumber}
                                                label={Member ${ind + 1} Phone Number}
                                                placeholder="Enter Phone Number"
                                                type="number"
                                                isRequired={false}
                                                value={ele?.memberPhoneNumber}
                                                onChange={(e) => handleInputChange(index, ind, 'memberPhoneNumber', e.target.value)}
                                                className="bg-[#0a0a1a] text-[#00FFFF] border border-[#00FFFF]/50 focus:ring-2 focus:ring-[#00FFFF] rounded-md shadow-[0_0_10px_#00FFFF]"
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            {index != eventList.length - 1 && <hr className="border-[#FF00FF]/30" />}
                        </div>
                    )
                })}
                <div className="flex justify-center w-full font-dosisMedium mt-6">
                    <button
                        className="w-1/2 bg-gradient-to-r from-[#FF00FF] to-[#9500ff] text-black py-3 rounded-md text-lg font-dosisBold shadow-[0_0_20px_#FF00FF] "
                        type="submit"
                    >
                        {isSubmitting ? 'Processing ... Please wait' : 'Save & Proceed to Payment'}
                    </button>
                </div>
            </form>
        </div>
    )
}

const AlreadyRegisteredSection = () => {
    const { cached } = useCached('isAuthenticated')
    const { data: registrationData } = useGetData(
        registrationDetails,
        ${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegistrationDetails?userId=${cached?.userId},
        useQueryConfig,
    )

    return (
        <div className="w-full min-h-full border border-[#00FFFF]/40 rounded-xl bg-[#0a0a1a]/80 p-6 space-y-6 shadow-[0_0_20px_#00FFFF]">
            <h3 className="font-dosisBold mb-3 text-2xl bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF00FF] text-transparent bg-clip-text drop-shadow-[0_0_15px_#00FFFF]">
                Registration Details
            </h3>
            <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-2">
                    <RegistrationDetailCard1 name="College Name" value={registrationData?.college?.collegeName} />
                    <RegistrationDetailCard1 name="Registered User Name" value={registrationData?.user.fullName} />
                    <RegistrationDetailCard1 name="Email" value={registrationData?.user.email} />
                    <RegistrationDetailCard1 name="Phone Number" value={registrationData?.user.phoneNumber} />
                    <RegistrationDetailCard1 name="Status" value={registrationData?.status?.status} />
                </div>
                <p className="font-dosisBold text-[#FF00FF] text-lg">Event & Participants Details</p>
                {registrationData?.eventTeams?.map((ele, index) => {
                    return (
                        <div key={index} className="flex flex-col space-y-3 font-dosisMedium">
                            <p className="text-[#00FFFF]">{ele?.event.eventName}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {ele.eventMembers?.map((el, ind) => {
                                    return (
                                        <MemberCard key={ind} name={el.memberName} phoneNumber={el.memberPhoneNumber} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const MemberCard = ({ name, phoneNumber }) => {
    return (
        <div className="flex flex-col space-y-1 border border-[#FF00FF]/40 rounded-lg p-3 shadow-[0_0_15px_#FF00FF]">
            <RegistrationDetailCard1 name="FullName" value={name} />
            <RegistrationDetailCard1 name="Phone Number" value={phoneNumber} />
        </div>
    )
}

const RegistrationDetailCard1 = ({ name, value }) => {
    return (
        <div className="flex flex-row space-x-2 text-gray-300">
            <p className="font-dosisRegular">{name}</p>
            <p className="font-dosisMedium">:</p>
            <p className="font-dosisMedium text-[#00FFFF]">{value}</p>
        </div>
    )
}

export default ParticipantRegistrationPage
export { MemberCard, RegistrationDetailCard1 }