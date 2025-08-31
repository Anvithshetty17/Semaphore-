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
            <div className="w-full min-h-full border rounded-lg 
                            bg-[#f5f5f6] p-6 space-y-6 
                            border-[#00FFFF]/50 
                            shadow-[0_0_25px_#00FFFF]">
                
                <h3 className="font-dosisBold mb-3 
                               text-[#FF00FF] text-lg 
                               tracking-wider 
                               drop-shadow-[0_0_6px_#FF00FF]">
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
                                className={`${
                                    index % 2 === 0
                                        ? 'bg-[#0f0f2a]/70'
                                        : 'bg-[#1a1a3d]/70'
                                } ${index != paymentHistory?.length - 1 && 'border-b border-[#00FFFF]/30'}
                                   text-[13px] text-[#00FFFF] 
                                   hover:bg-[#1a0033]/80 
                                   transition-all`}
                            >
                                <td className="px-3 py-3">{index + 1}</td>
                                <th
                                    scope="row"
                                    className="px-3 py-3 font-medium text-[#FF00FF] whitespace-nowrap"
                                >
                                    {ele?.accountHolderName}
                                </th>
                                <td className="px-3 py-3 font-medium text-[#00FFFF] whitespace-nowrap">
                                    {ele?.phoneNumber}
                                </td>
                                <td className="px-3 py-3 font-medium text-[#39FF14] whitespace-nowrap">
                                    Rs. 1500.00 /-
                                </td>
                                <td className="px-3 py-3 font-medium text-[#00FFFF] whitespace-nowrap">
                                    {ele?.upiId}
                                </td>
                                <td className="px-3 py-3 font-medium text-[#00FFFF] whitespace-nowrap">
                                    {ele?.transactionId}
                                </td>
                                <td className="px-3 py-3 font-medium text-[#FFFF00] whitespace-nowrap">
                                    {ele?.remarks ?? ''}
                                </td>
                                <td className="px-3 py-3 font-medium text-[#FF00FF] whitespace-nowrap">
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
