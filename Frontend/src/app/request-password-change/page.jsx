'use client'

import { useCached } from "@/hooks/useCached"
import { useSubmit } from "@/hooks/useSubmit"
import { toast } from "react-toastify"

const RequestPasswordChange = () => {

    const { cached } = useCached('isAuthenticated')
    const { submitData, isLoading } = useSubmit()
    const handleClick = async () => {
        toast.info('Sending password reset link .. please wait')
        try {
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/users/v1/SendPasswordResetLink`,
                {
                    userId: cached?.userId,
                }
            )
            if (data) {
                toast.success(data)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Password change failed')
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#000080] to-[#00001A]">
                <div className="flex flex-col items-center w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-lg relative">
                    <h2 className="text-2xl font-bold text-center mb-8 font-dosisBold">Request Password Change</h2>
                    <p>Click the below button to recieve a link to change the password for your account !</p>
                    <div className="flex justify-center w-full font-dosisMedium mt-10">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
                            type="button"
                            onClick={handleClick}
                        >
                            Send Password Reset Link
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestPasswordChange