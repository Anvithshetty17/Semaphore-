'use client'

import { CustomTable } from "@/components/custom_table"
import { DropDown } from "@/components/dropdown"
import { TextInput } from "@/components/input"
import { Loading } from "@/components/loading"
import { PrimaryButton } from "@/components/primary_button"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useSubmit } from "@/hooks/useSubmit"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"

const CreateUser = () => {

    const { submitData, isLoading } = useSubmit()
    const queryClient = useQueryClient()
    const [inputData, setInputData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        userTypeId: '',
        phoneNumber: ''
    })

    const { data: userList, isLoading: isUserListLoading } = useGetData(
        `userList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/users/v1/GetUserList`,
        useQueryConfig
    )

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
                `${process.env.NEXT_PUBLIC_URL}/web/api/users/v1/CreateUser`,
                body,
            )
            if (data) {
                toast.success('User created successfully')
                setInputData({ status: '' })
                await queryClient.invalidateQueries('userList')
            }
        } catch (e) {
            toast.error(e?.response?.data?.message ?? e?.message ?? 'User creation failed')
        }
    }

    if (isUserListLoading || isUserTypeListLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Create User </h3>
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <TextInput
                            label={'Full Name'}
                            name={'fullName'}
                            placeholder={'Enter Full Name'}
                            type={'text'}
                            value={inputData.fullName}
                            onChange={(e) => setInputData({ ...inputData, fullName: e.target.value })}
                        />
                        <TextInput
                            label={'User name'}
                            name={'username'}
                            placeholder={'Enter User Name'}
                            type={'text'}
                            value={inputData.username}
                            onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                        />
                        <TextInput
                            label={'Email'}
                            name={'email'}
                            placeholder={'Enter email'}
                            type={'email'}
                            value={inputData.email}
                            onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                        />
                        <TextInput
                            label={'Phone Number'}
                            name={'phoneNumber'}
                            placeholder={'Enter Phone Number'}
                            type={'number'}
                            value={inputData.phoneNumber}
                            onChange={(e) => setInputData({ ...inputData, phoneNumber: e.target.value })}
                        />
                        <TextInput
                            label={'Password'}
                            name={'password'}
                            placeholder={'Enter Password'}
                            type={'password'}
                            value={inputData.password}
                            onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                        />
                        <DropDown
                            name={'userTypeId'}
                            label="Select User Type"
                            DropDownItems={userTypeList?.map((ele, index) => {
                                return {
                                    label: ele?.userType,
                                    value: ele?.userTypeId,
                                }
                            })}
                            placeholder={'Select User Type'}
                            firstValue={inputData.userTypeId}
                            onChange={(e) => setInputData({ ...inputData, userTypeId: e.target.value })}
                        />
                    </div>
                    <PrimaryButton name={'Create'} onClick={() => { }} isLoading={isLoading} />
                </form>
            </div>

            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4 mt-3">
                <h3 className="font-dosisBold mb-3"> Status List </h3>
                <CustomTable rows={['S.I No', 'Full Name', 'Username', 'Email', 'Phone Number', 'User Type', 'Action']} >
                    {userList?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != userList?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
                                    <th
                                        scope="row"
                                        className="p-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {ele?.fullName}
                                    </th>

                                    <td className="px-2 py-3">
                                        {ele?.username}
                                    </td>
                                    <td className="px-2 py-3">
                                        {ele?.email}
                                    </td>
                                    <td className="px-2 py-3">
                                        {ele?.phoneNumber}
                                    </td>
                                    <td className="px-2 py-3">
                                        {ele?.userType?.userType}
                                    </td>
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

export default CreateUser