'use client'

import { CustomTable } from "@/components/custom_table";
import { Loading } from "@/components/loading";
import { useQueryConfig } from "@/config/useQuery.config";
import { Cancel02Icon, CheckmarkBadge03Icon } from "hugeicons-react";
import { useGetData } from "@/hooks/useGetData";
import { useState } from "react";
import { MultiLineText } from "@/components/input";
import { useSubmit } from "@/hooks/useSubmit";
import { useCached } from "@/hooks/useCached";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const VerifyPaymentsPage = () => {

    const { cached } = useCached('isAuthenticated')
    const { submitData: acceptPayment, isLoading: isPaymentAccepting } = useSubmit()
    const { submitData: rejectPayment, isLoading: isPaymentRejecting } = useSubmit()
    const queryClient = useQueryClient()

    const [showRejectPopup, setShowRejectPopup] = useState(false)
    const [showAcceptPopup, setShowAcceptPopup] = useState(false)
    const [selectPaymentId, setSelectPaymentId] = useState(null)

    const { data: paymentList, isLoading: isPaymentListLoading } = useGetData(
        `pendingPayment`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetPendingPaymentList`,
        useQueryConfig,
    )

    if (isPaymentListLoading) return <Loading />

    const handleReject = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const body = Object.fromEntries(formData)
            const { data } = await rejectPayment(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/RejectTransaction`,
                {
                    ...body,
                    paymentId: selectPaymentId,
                    useId: cached?.userId,
                }
            )
            if (data) {
                setSelectPaymentId(null)
                setShowRejectPopup(false)
                toast.success('Payment Rejected')
                queryClient.invalidateQueries('pendingPayment')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Payment failed')
        }
    }

    const handleAccept = async () => {
        try {
            const { data } = await acceptPayment(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/VerifyTransaction`,
                {
                    paymentId: selectPaymentId,
                    userId: cached?.userId,
                }
            )
            if (data) {
                setSelectPaymentId(null)
                setShowAcceptPopup(false)
                toast.success('Payment Accepted')
                queryClient.invalidateQueries('pendingPayment')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Payment failed')
        }
    }

    return (
        <>
            {showRejectPopup === true && <form onSubmit={handleReject} className="absolute top-32 right-10 bg-white p-4 border z-[999] w-[25vw] rounded-lg flex flex-col items-center space-y-3">
                <p className="text-[20px] font-dosisBold text-red-500">Reject Payment</p>
                <p> Are you sure you want to reject this payment  </p>
                <MultiLineText label={''} name={'remarks'} placeholder={'Enter Remarks'} isRequired={true} />
                <div className="flex flex-row space-x-2 w-full">
                    <div className="flex justify-center w-full font-dosisMedium">
                        <button
                            className="w-1/2 bg-red-900 text-white py-2 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300 cursor-pointer"
                            type="submit"
                        >
                            Reject
                        </button>
                    </div>
                    <div className="flex justify-center w-full font-dosisMedium">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
                            type="button"
                            onClick={() => {
                                setSelectPaymentId(null)
                                setShowRejectPopup(false)
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>}
            {showAcceptPopup === true && <div className="absolute top-32 right-10 bg-white p-4 border z-[999] w-[25vw] rounded-lg flex flex-col items-center space-y-6">
                <p className="text-[20px] font-dosisBold text-green-700">Accept Payment</p>
                <p> Are you sure you want to accept this payment  </p>
                <div className="flex flex-row space-x-2 w-full">
                    <div className="flex justify-center w-full font-dosisMedium">
                        <button
                            className="w-1/2 bg-green-900 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300 cursor-pointer"
                            type="button"
                            onClick={handleAccept}
                        >
                            Accept
                        </button>
                    </div>
                    <div className="flex justify-center w-full font-dosisMedium">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
                            type="button"
                            onClick={() => {
                                setSelectPaymentId(null)
                                setShowRejectPopup(false)
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}
            <div className="w-full min-h-full border rounded-lg bg-white p-4 space-y-6">
                <h3 className="font-dosisBold mb-3"> Payment List </h3>
                {paymentList?.length > 0 ? <CustomTable rows={['S.I. No', 'College Name', 'Account Holder Name', 'Phone Number', 'Amount', 'UPI ID', 'Transaction ID', 'Status', 'Action']} >
                    {paymentList?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != paymentList?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
                                    <td className="px-2 py-3">{ele?.registration?.college?.collegeName}</td>
                                    <th
                                        scope="row"
                                        className="p-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {ele?.accountHolderName}
                                    </th>
                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap">
                                        {ele?.phoneNumber}
                                    </td>
                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap">
                                        Rs. 1500.00 /-
                                    </td>
                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap">
                                        {ele?.upiId}
                                    </td>
                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap">
                                        {ele?.transactionId}
                                    </td>
                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap">
                                        {ele?.status.status}
                                    </td>
                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap flex flex-row space-x-3 justify-center">
                                        <Cancel02Icon color="#000" className="cursor-pointer" onClick={() => {
                                            setSelectPaymentId(ele?.paymentDetailsId)
                                            setShowRejectPopup(true)
                                        }} />
                                        <CheckmarkBadge03Icon color="#000" className="cursor-pointer" onClick={() => {
                                            setSelectPaymentId(ele?.paymentDetailsId)
                                            setShowAcceptPopup(true)
                                        }} />
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </CustomTable> : <>
                </>}
            </div>
        </>
    )
}

export default VerifyPaymentsPage;