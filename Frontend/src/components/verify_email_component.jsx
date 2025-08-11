'use client'

import { useSubmit } from "@/hooks/useSubmit";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifyEmailComponent = () => {

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams()
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const fetchedUserId = searchParams.get('userId')
        if (fetchedUserId) {
            setUserId(fetchedUserId)
        }
    }, [searchParams])

    const { submitData, isLoading: isVerifying } = useSubmit()

    const handleVerify = async () => {
        try {
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/users/v1/VerifyEmailUser`,
                {
                    userId,
                }
            )
            if (data) {
                toast.success('Email has been verified')
                setIsEmailVerified(true)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Email verification failed')
        }
    }

    return (
        <>
            <div
                className="flex flex-col items-center w-full max-w-sm mx-4 lg:mx-auto bg-white p-8 rounded-lg shadow-lg"
            >
                {isEmailVerified === false ? <><h3 className="font-dosisBold text-[25px]"> Verify Email </h3>
                    <p className="font-dosisMedium text-md text-center mt-4">Click the button below to complete your email verification. This will confirm your registration and give you full access to our event details.</p>
                    <div className="flex justify-center w-full mt-10">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 font-dosisMedium"
                            type="submit"
                            onClick={handleVerify}
                        >
                            {isVerifying === true ? 'Verifying ... please wait' : 'Verify Email'}
                        </button>
                    </div> </> :
                    <><h3 className="font-dosisBold text-[25px]"> Email Verified </h3>
                        <p className="font-dosisMedium text-md text-center mt-4">Your email has been successfully verified. You’re all set! Now you can access all event details and updates. We’re excited to have you on board!</p>
                        <div className="flex justify-center w-full mt-10">
                            <button
                                className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 font-dosisMedium"
                                type="submit"
                                onClick={() => router.push('/login')}
                            >
                                Login
                            </button>
                        </div>
                    </>}
            </div>
        </>
    )
}

export { VerifyEmailComponent }