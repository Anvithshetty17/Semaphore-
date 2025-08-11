'use client'

import { CustomTable } from "@/components/custom_table"
import { Loading } from "@/components/loading"
import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"

const RegistrationListPage = () => {
    const { data: registrationList, isLoading: isRegistrationListLoading } = useGetData(
        `registrationList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetRegisteredCollegeList`,
        useQueryConfig
    )

    if (isRegistrationListLoading) return <Loading />

    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4">
                <h3 className="font-dosisBold mb-3"> Registration List </h3>
                <CustomTable
                    rows={['S.I No', 'Team Name', 'College Name', 'Name', 'Email', 'Status', 'Is Reported']}
                >
                    {registrationList?.map((ele, index) => {
                        return (
                            <>
                                <tr
                                    className={`bg-white ${index != registrationList?.length - 1 && 'border-b'
                                        } text-[13px]`}
                                >
                                    <td className="px-2 py-3">{index + 1}</td>
                                    <td className="px-2 py-3">{ele?.teamName}</td>
                                    <th
                                        scope="row"
                                        className="p-2 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {ele?.college?.collegeName}
                                    </th>

                                    <td className="px-2 py-3">{ele?.user?.fullName}</td>
                                    <td className="px-2 py-3">{ele?.user?.email}</td>
                                    <td className="px-2 py-3">{ele?.status?.status}</td>
                                    <td className="px-2 py-3">{ele?.isTeamReported === true ? 'Reported' : 'Not Reported'}</td>
                                </tr>
                            </>
                        )
                    })}
                </CustomTable>
            </div>
        </>
    )
}

export default RegistrationListPage