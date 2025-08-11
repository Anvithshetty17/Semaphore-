'use client'
import { TextInput } from "@/components/input";
import { useCached } from "@/hooks/useCached";
import { useSubmit } from "@/hooks/useSubmit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const MakePayment = () => {

    const { cached } = useCached('isAuthenticated')
    const { submitData, isLoading: isSubmitting } = useSubmit()
    const router = useRouter()
    const queryClient = useQueryClient()

    const handleAcceptPayment = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const body = Object.fromEntries(formData)
        try {
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/mainEvent/v1/AcceptPaymentDetails`,
                {
                    ...body,
                    userId: cached?.userId,
                }
            )
            
            if (data) {
                toast.success('Payment Accepted')
                queryClient.invalidateQueries('paymentHistory')
                setTimeout(() => {
                    router.push('/participant/payment-details')
                }, 1500)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Payment failed')
        }
    }

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4 w-full min-h-full lg:h-full">
                <h3 className="font-dosisBold mb-3"> Payment Details Page</h3>
                <div className="flex flex-col w-full h-full justify-around items-center">
                    <Image
                        src="/images/payment_qr_code.jpeg"
                        alt="Payment QR Code"
                        width={300}
                        height={300}
                    />
                    <form className="w-full md:w-[75%] lg:w-[40%] flex flex-col space-y-3 mt-3" onSubmit={handleAcceptPayment}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <TextInput
                                name={'accountHolderName'}
                                label={'Account Holder Name'}
                                placeholder={'Enter Transaction Account Hodler Name'}
                                isRequired={true}
                            />
                            <TextInput
                                name={'phoneNumber'}
                                label={'Enter Phoner Number'}
                                placeholder={'Enter Transaction Phone Number'}
                                isRequired={true}
                            />
                            <TextInput
                                name={'upiId'}
                                label={'Account UPI Id'}
                                placeholder={'Enter Account UPI ID'}
                                isRequired={true}
                            />
                            <TextInput
                                name={'transactionId'}
                                label={'Transaction Id'}
                                placeholder={'Enter Transaction ID'}
                                isRequired={true}
                            />
                        </div>
                        <div className="flex justify-center w-full font-dosisMedium">
                            <button
                                className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
                                type="submit"
                            >
                                Confirm Payment Details
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MakePayment;