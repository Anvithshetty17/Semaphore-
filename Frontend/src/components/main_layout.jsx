import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useAccountStore, useAuthStore } from "@/store"
import { useEffect, useState } from "react"
import Sidebar, { MobileSideBar } from "./sidebar"
import { NavBar } from "./navbar"
import { useRouter } from "next/navigation"
import { Loading } from "./loading"

const MainLayout = ({
    menuItems,
    children,
    routeType,
    selectedMenu, }) => {


    const [showSidebar, setShowSidebar] = useState(false);
    const { token } = useAuthStore()
    const { setAccountName, setUserType } = useAccountStore()
    const router = useRouter()
    const { isLoading, data, isFetched, error } = useGetData(
        'isAuthenticated',
        `${process.env.NEXT_PUBLIC_URL}/web/api/auth/v1/IsAuthenticated?token=${token}`,
        useQueryConfig
    )



    useEffect(() => {
        if (data) {
            setAccountName(data?.fullName)
            setUserType(data?.userType?.userType)
            if (data?.userType?.orderNo != routeType) {
                router.push("/error")
            }
        }
    }, [data])

    useEffect(() => {
        if (error) {
            router.push("/error")
        }
    }, [error])


    if (isLoading) {
        return <Loading />
    } else

        return (
            <>
                <div className="flex flex-row space-x-1 lg:space-x-3 h-screen w-screen overflow-hidden py-3 px-2 lg:p-3 bg-[#F2F2F2]">
                    <Sidebar menuList={menuItems} setShowSideBar={setShowSidebar} />
                    {showSidebar === true && <MobileSideBar setShowSideBar={setShowSidebar} menuList={menuItems} />}
                    <div className="flex flex-col h-full w-full space-y-3">
                        <NavBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                        <div className="w-full h-full overflow-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
}

export { MainLayout }