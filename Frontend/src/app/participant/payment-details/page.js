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
            <div className="flex flex-col space-y-3 border rounded-lg bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-6">
                <h3 className="font-dosisBold mb-3 text-white text-lg tracking-wider drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                    Payment History
                </h3>
                <CustomTable
                    rows={[
                        'S.I. No',
                        'Account Holder Name',
                        'Phone Number',
                        'Amount',
                        'UPI ID',
                        'Transaction ID',
                        'Remarks',
                        'Status'
                    ]}
                >
                    {paymentHistory?.map((ele, index) => {
                        return (
                            <tr
                                key={index}
                                className={`bg-white/10 ${index != paymentHistory?.length - 1 && 'border-b border-cyan-400/30'} text-[13px] text-cyan-200 hover:bg-purple-900/30 transition-all`}
                            >
                                <td className="px-3 py-3">{index + 1}</td>
                                <th
                                    scope="row"
                                    className="px-3 py-3 font-medium text-cyan-300 whitespace-nowrap"
                                >
                                    {ele?.accountHolderName}
                                </th>
                                <td className="px-3 py-3 font-medium text-cyan-200 whitespace-nowrap">
                                    {ele?.phoneNumber}
                                </td>
                                <td className="px-3 py-3 font-medium text-green-400 whitespace-nowrap">
                                    Rs. 2025.00 /-
                                </td>
                                <td className="px-3 py-3 font-medium text-cyan-200 whitespace-nowrap">
                                    {ele?.upiId}
                                </td>
                                <td className="px-3 py-3 font-medium text-cyan-200 whitespace-nowrap">
                                    {ele?.transactionId}
                                </td>
                                <td className="px-3 py-3 font-medium text-yellow-300 whitespace-nowrap">
                                    {ele?.remarks ?? ''}
                                </td>
                                <td className="px-3 py-3 font-medium text-purple-400 whitespace-nowrap">
                                    {ele?.status?.status}
                                </td>
                            </tr>
                        )
                    })}
                </CustomTable>
            </div>
        </>
    )
}

export default PaymentDetails;
