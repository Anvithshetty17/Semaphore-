'use client'

import { PasswordTextInput } from "@/components/input"
import { Loading } from "@/components/loading"
import { useSubmit } from "@/hooks/useSubmit"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { toast } from "react-toastify"

const ChangePasswordPage = () => {
    return (
        <>
            <Suspense fallback={<Loading />} >
                <ChangePasswordComponent />
            </Suspense>
        </>
    )
}

const ChangePasswordComponent = () => {
    const searchParams = useSearchParams()
    const { submitData: changePassword, isLoading: isPasswordChanging } = useSubmit()

    const [inputData, setInputData] = useState({
        oldPassword: '',
        newPassword: '',
        reEnterPassword: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const body = Object.fromEntries(formData)
            if (inputData?.newPassword !== inputData?.reEnterPassword) {
                toast.error('Passwords do not match')
                return
            }
            const { data } = await changePassword(
                `${process.env.NEXT_PUBLIC_URL}/web/api/users/v1/ChangePassword`,
                {
                    ...body,
                    userId: searchParams.get('userId'),
                }
            )
            if (data) {
                toast.success(data)
            }
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message ?? 'Password change failed')
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#000080] to-[#00001A]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-lg relative">
                    <h2 className="text-2xl font-bold text-center mb-8 font-dosisBold">Change Password</h2>
                    <PasswordTextInput
                        name={'oldPassword'}
                        label={'Old Password'}
                        placeholder={'Enter old password'}
                        value={inputData.oldPassword}
                        type="password"
                        onChange={(e) => setInputData({
                            ...inputData, oldPassword: e.target.value
                        })}
                    />

                    <PasswordTextInput
                        name={'newPassword'}
                        label={'New Password'}
                        placeholder={'Enter New password'}
                        value={inputData.newPassword}
                        type="password"
                        onChange={(e) => setInputData({
                            ...inputData, newPassword: e.target.value
                        })}
                    />
                    <PasswordTextInput
                        name={'reEnterPassword'}
                        label={'Re-Enter Password'}
                        placeholder={'Re-Enter new password'}
                        value={inputData.reEnterPassword}
                        type="password"
                        onChange={(e) => setInputData({
                            ...inputData, reEnterPassword: e.target.value
                        })}
                    />
                    <div className="flex justify-center w-full font-dosisMedium">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
                            type="submit"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePasswordPage