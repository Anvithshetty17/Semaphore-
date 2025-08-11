import { useCached } from "@/hooks/useCached"
import { useAuthStore } from "@/store"
import { Menu03Icon, Notification01Icon, Logout03Icon, Notification03Icon } from "hugeicons-react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"

const NavBar = ({ showSidebar, setShowSidebar }) => {
    const queryClient = useQueryClient()
    const { logout } = useAuthStore()
    const router = useRouter()
    const { cached } = useCached('isAuthenticated')

    return (
        <>
            <div className="flex flex-row justify-between bg-white p-3 h-[10vh] w-full rounded-lg items-center">
                <div className="flex lg:hidden">
                    <Menu03Icon color="#000" onClick={function () {
                        setShowSidebar(!showSidebar)
                    }} />
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-md font-dosisBold lg:text-[20px]">{cached?.fullName}</p>
                    <p className="text-xs font-dosisMedium lg:text-[14px]">{cached?.userType?.userType}</p>
                </div>
                <div className="flex flex-row space-x-2 lg:space-x-8">
                    <Notification01Icon color="#000" className="cursor-pointer" onClick={() => toast.info("Feature coming soon !!")} />
                    <Logout03Icon color="#000" className="cursor-pointer" onClick={() => {
                        logout()
                        toast.success("Logout Success")
                        queryClient.invalidateQueries()
                        router.push('/login')
                    }} />
                </div>
            </div>
        </>
    )
}

export { NavBar }