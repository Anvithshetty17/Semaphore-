"use client";

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
  const { cached } = useCached("isAuthenticated");
  const { submitData: acceptPayment, isLoading: isPaymentAccepting } = useSubmit();
  const { submitData: rejectPayment, isLoading: isPaymentRejecting } = useSubmit();
  const queryClient = useQueryClient();

  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [selectPaymentId, setSelectPaymentId] = useState(null);
  // view state: 'pending' | 'history'
  const [view, setView] = useState("pending");

  const { data: paymentList, isLoading: isPaymentListLoading } = useGetData(
    `pendingPayment`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetPendingPaymentList`,
    useQueryConfig
  );

  const { data: paymentHistory, isLoading: isPaymentHistoryLoading } = useGetData(
    `allPayments`,
    `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/GetAllPaymentList`,
    useQueryConfig
  );

  if (isPaymentListLoading || isPaymentHistoryLoading) return <Loading />;

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const body = Object.fromEntries(formData);
      const { data } = await rejectPayment(`${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/RejectTransaction`, {
        ...body,
        paymentId: selectPaymentId,
        useId: cached?.userId,
      });
      if (data) {
        setSelectPaymentId(null);
        setShowRejectPopup(false);
        toast.success("Payment Rejected");
        queryClient.invalidateQueries("pendingPayment");
        queryClient.invalidateQueries("allPayments");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message ?? "Payment failed");
    }
  };

  const handleAccept = async () => {
    try {
      const { data } = await acceptPayment(`${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/VerifyTransaction`, {
        paymentId: selectPaymentId,
        userId: cached?.userId,
      });
      if (data) {
        setSelectPaymentId(null);
        setShowAcceptPopup(false);
        toast.success("Payment Accepted");
        queryClient.invalidateQueries("pendingPayment");
        queryClient.invalidateQueries("allPayments");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message ?? "Payment failed");
    }
  };

  return (
    <>
      {/* View selector */}
      <div className="w-full flex justify-end mb-4">
        <label className="mr-2 text-cyan-100 font-dosisMedium self-center">Show:</label>
        <select
          value={view}
          onChange={(e) => {
            const v = e.target.value;
            setView(v);
            // reset any popups / selection when switching views
            setSelectPaymentId(null);
            setShowAcceptPopup(false);
            setShowRejectPopup(false);
          }}
          className="bg-slate-800 text-cyan-100 p-2 rounded-md">
          <option value="pending">Pending Payments</option>
          <option value="history">Payment History</option>
        </select>
      </div>
      {showRejectPopup === true && (
        <form
          onSubmit={handleReject}
          className="absolute top-32 right-10 bg-white p-4 border z-[999] w-[25vw] rounded-lg flex flex-col items-center space-y-3">
          <p className="text-[20px] font-dosisBold text-red-500">Reject Payment</p>
          <p className="text-black"> Are you sure you want to reject this payment </p>
          <MultiLineText
            label={""}
            name={"remarks"}
            placeholder={"Enter Remarks"}
            isRequired={true}
            className="text-black"
          />
          <div className="flex flex-row space-x-2 w-full">
            <div className="flex justify-center w-full font-dosisMedium">
              <button
                className="w-1/2 bg-red-900 text-white py-2 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300 cursor-pointer"
                type="submit">
                Reject
              </button>
            </div>
            <div className="flex justify-center w-full font-dosisMedium">
              <button
                className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
                type="button"
                onClick={() => {
                  setSelectPaymentId(null);
                  setShowRejectPopup(false);
                  // setShowAcceptPopup(false) // <-- Fix here
                }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      {showAcceptPopup === true && (
        <div className="absolute top-32 right-10 bg-white p-4 border z-[999] w-[25vw] rounded-lg flex flex-col items-center space-y-6">
          <p className="text-[20px] font-dosisBold text-green-700">Accept Payment</p>
          <p className="text-black"> Are you sure you want to accept this payment </p>
          <div className="flex flex-row space-x-2 w-full">
            <div className="flex justify-center w-full font-dosisMedium">
              <button
                className="w-1/2 bg-green-900 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300 cursor-pointer"
                type="button"
                onClick={handleAccept}>
                Accept
              </button>
            </div>
            <div className="flex justify-center w-full font-dosisMedium">
              <button
                className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
                type="button"
                onClick={() => {
                  setSelectPaymentId(null);
                  // setShowRejectPopup(false)
                  setShowAcceptPopup(false);
                }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {view === "pending" && (
        <div className="w-full min-h-full border border-cyan-400/30 rounded-lg bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-sm p-4 space-y-6">
          <h3 className="font-dosisBold mb-3 text-cyan-100 tracking-wide"> Payment List </h3>
          {paymentList?.length > 0 ? (
            <CustomTable
              rows={[
                "S.I. No",
                "College Name",
                "Account Holder Name",
                "Phone Number",
                "Amount",
                "UPI ID",
                "Transaction ID",
                "Status",
                "Action",
              ]}>
              {paymentList?.map((ele, index) => {
                return (
                  <tr
                    key={ele?.paymentDetailsId || index}
                    className={`bg-slate-800/50 ${index != paymentList?.length - 1 && "border-b border-cyan-400/20"
                      } text-[13px] text-cyan-100`}>
                    <td className="px-2 py-3">{index + 1}</td>
                    <td className="px-2 py-3">{ele?.registration?.college?.collegeName}</td>
                    <th scope="row" className="p-2 font-medium text-cyan-100 whitespace-nowrap">
                      {ele?.accountHolderName}
                    </th>
                    <td className="px-2 py-3 font-medium text-cyan-100 whitespace-nowrap">{ele?.phoneNumber}</td>
                    <td className="px-2 py-3 font-medium text-cyan-100 whitespace-nowrap">Rs. 2025.00 /-</td>
                    <td className="px-2 py-3 font-medium text-cyan-100 whitespace-nowrap">{ele?.upiId}</td>
                    <td className="px-2 py-3 font-medium text-cyan-100 whitespace-nowrap">{ele?.transactionId}</td>
                    <td className="px-2 py-3 font-medium text-cyan-100 whitespace-nowrap">{ele?.status.status}</td>
                    <td className="px-2 py-3 font-medium text-cyan-100 whitespace-nowrap flex flex-row space-x-3 justify-center">
                      <Cancel02Icon
                        color="#ef4444"
                        className="cursor-pointer hover:text-red-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                        onClick={() => {
                          setSelectPaymentId(ele?.paymentDetailsId);
                          setShowRejectPopup(true);
                        }}
                      />
                      <CheckmarkBadge03Icon
                        color="#22c55e"
                        className="cursor-pointer hover:text-green-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                        onClick={() => {
                          setSelectPaymentId(ele?.paymentDetailsId);
                          setShowAcceptPopup(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </CustomTable>
          ) : (
            <></>
          )}
        </div>
      )}

      {/* Payment History Section */}
      {view === "history" && (

        <div className="w-full min-h-full border border-amber-400/30 rounded-lg bg-gradient-to-r from-slate-900 via-amber-900/20 to-slate-900 shadow-[0_0_30px_rgba(245,158,11,0.3)] backdrop-blur-sm p-4 space-y-6">
          <h3 className="font-dosisBold mb-3 text-amber-100 tracking-wide"> Payment History (All Records) </h3>
          {paymentHistory?.length > 0 ? (
            <CustomTable
              rows={[
                "S.I. No",
                "College Name",
                "Account Holder Name",
                "Phone Number",
                "Amount",
                "UPI ID",
                "Transaction ID",
                "Status",
              ]}>
              {paymentHistory?.map((ele, index) => {
                const statusColor =
                  ele?.status?.status?.toLowerCase() === "approved"
                    ? "text-green-400"
                    : ele?.status?.status?.toLowerCase() === "rejected"
                      ? "text-red-400"
                      : "text-yellow-400";

                return (
                  <tr
                    key={ele?.paymentDetailsId || index}
                    className={`bg-slate-800/30 ${index != paymentHistory?.length - 1 && "border-b border-amber-400/20"
                      } text-[13px] text-amber-100`}>
                    <td className="px-2 py-3">{index + 1}</td>
                    <td className="px-2 py-3">{ele?.registration?.college?.collegeName}</td>
                    <th scope="row" className="p-2 font-medium text-amber-100 whitespace-nowrap">
                      {ele?.accountHolderName}
                    </th>
                    <td className="px-2 py-3 font-medium text-amber-100 whitespace-nowrap">{ele?.phoneNumber}</td>
                    <td className="px-2 py-3 font-medium text-amber-100 whitespace-nowrap">Rs. 2025.00 /-</td>
                    <td className="px-2 py-3 font-medium text-amber-100 whitespace-nowrap">{ele?.upiId}</td>
                    <td className="px-2 py-3 font-medium text-amber-100 whitespace-nowrap">{ele?.transactionId}</td>
                    <td className={`px-2 py-3 font-bold whitespace-nowrap ${statusColor}`}>{ele?.status?.status}</td>
                  </tr>
                );
              })}
            </CustomTable>
          ) : (
            <>
              <p className="text-amber-200 text-center py-4">No payment history found</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default VerifyPaymentsPage;
