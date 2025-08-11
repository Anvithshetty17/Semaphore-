'use client'

import { CustomTable } from "@/components/custom_table"
import { TextInput } from "@/components/input"
import { Loading } from "@/components/loading"
import { PrimaryButton } from "@/components/primary_button"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useSubmit } from "@/hooks/useSubmit"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"

const CreateUserType = () => {

    const { submitData, isLoading } = useSubmit()
    const queryClient = useQueryClient()
    const [inputData, setInputData] = useState({
        userType: '',
        orderNo: '',
    })

    const { data: userTypeList, isLoading: isUserTypeListLoading } = useGetData(
        `userTypeList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/userType/v1/FindAll`,
        useQueryConfig
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const body = Object.fromEntries(formData)
            const { data } = await submitData(
                `${process.env.NEXT_PUBLIC_URL}/web/api/userType/v1/Create`,
                body,
            )
            if (data) {
                toast.success('User type created successfully')
                setInputData({ userType: '', orderNo: '' })
                await queryClient.invalidateQueries('userTypeList')
            }
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message ?? 'User type creation failed')
        }
    }

    if (isUserTypeListLoading) return <Loading />
    return (
        <>

            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Create User Type </h3>
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <TextInput
                            label={'User Type'}
                            name={'userType'}
                            placeholder={'Enter User Type'}
                            type={'text'}
                            value={inputData.userType}
                            onChange={(e) => setInputData({ ...inputData, userType: e.target.value })}
                        />
                        <TextInput
                            label={'Order No'}
                            name={'orderNo'}
                            placeholder={'Enter Order No'}
                            type={'number'}
                            value={inputData.orderNo}
                            onChange={(e) => setInputData({ ...inputData, orderNo: e.target.value })}
                        />
                    </div>
                    <PrimaryButton name={'Create'} onClick={() => { }} isLoading={isLoading} />
                </form>
            </div>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4 mt-3">
                <h3 className="font-dosisBold mb-3"> User Type List </h3>
                <CustomTable rows={['S.I No', 'User Type', 'Order No', 'Action']} >
                    {userTypeList?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != userTypeList?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
                                    <td className="px-2 py-3">{ele?.userType}</td>
                                    <th
                                        scope="row"
                                        className="p-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {ele?.orderNo}
                                    </th>

                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap flex flex-row space-x-3 justify-center">
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

export default CreateUserType