'use client'

import { CustomTable } from "@/components/custom_table"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { EyeIcon } from "hugeicons-react"
import Link from "next/link"

const AdminPage = () => {
    const { data: registrationList, isLoading: isRegistrationListLoading } = useGetData(
        'registrationCollegeList',
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig,
    )


    if (isRegistrationListLoading) return <Loading />
    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Registration List </h3>
                <CustomTable rows={['S.I No', 'College Name', 'User Name', 'Email', 'Phone Number', 'Registration Status', 'Action']} >
                    {registrationList?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != registrationList?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
                                    <th
                                        scope="row"
                                        className="p-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {ele?.college?.collegeName}
                                    </th>
                                    <td className="px-2 py-3">{ele?.user?.fullName}</td>
                                    <td className="px-2 py-3">{ele?.user?.email}</td>
                                    <td className="px-2 py-3">{ele?.user?.phoneNumber}</td>
                                    <td className="px-2 py-3">{ele?.status?.status}</td>

                                    <td className="px-2 py-3 font-medium text-gray-700 whitespace-nowrap flex flex-row space-x-3 justify-center">
                                        <Link href={`/admin/registration-details?userId=${ele?.user?.userId}`}><EyeIcon color="#000" /></Link>
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

export default AdminPage