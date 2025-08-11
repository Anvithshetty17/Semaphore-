'use client'

import { CustomTable } from "@/components/custom_table";
import { Loading } from "@/components/loading";
import { useQueryConfig } from "@/config/useQuery.config";
import { useCached } from "@/hooks/useCached";
import { useGetData } from "@/hooks/useGetData";

const PaymentDetails = () => {

    const { cached } = useCached('isAuthenticated')

    const { data: paymentHistory, isLoading: isPaymentHistoryLoading } = useGetData(
        `paymentHistory`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetPaymentHistory?userId=${cached?.userId}`,
        useQueryConfig
    )

    if (isPaymentHistoryLoading) return <Loading />


    return (
        <>
            <div className="w-full min-h-full border rounded-lg bg-white p-4 space-y-6">
                <h3 className="font-dosisBold mb-3"> Payment History </h3>
                <CustomTable rows={['S.I. No', 'Account Holder Name', 'Phone Number', 'Amount', 'UPI ID', 'Transaction ID', 'Remarks', 'Status']} >
                    {paymentHistory?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != paymentHistory?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
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
                                        {ele?.remarks ?? ''}
                                    </td>
                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap">
                                        {ele?.status?.status}
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

export default PaymentDetails;