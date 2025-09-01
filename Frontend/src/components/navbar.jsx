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
            <div className="flex flex-row justify-between items-center h-[10vh] w-full px-6 py-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-sm rounded-lg">
                <div className="flex lg:hidden">
                    <Menu03Icon color="#06b6d4" onClick={function () {
                        setShowSidebar(!showSidebar)
                    }} />
                </div>
                <div className="flex flex-col space-y-1 text-cyan-100">
                    <p className="text-md font-dosisBold lg:text-[20px] text-white tracking-wide uppercase">{cached?.fullName}</p>
                    <p className="text-xs font-dosisMedium lg:text-[14px] text-cyan-300 tracking-widest md:pl-3 pl-1">{cached?.userType?.userType}</p>
                </div>
                <div className="flex flex-row space-x-4 lg:space-x-8">
                    <Notification01Icon color="#06b6d4" className="cursor-pointer hover:text-cyan-300 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" onClick={() => toast.info("Feature coming soon !!")} />
                    <Logout03Icon color="#ef4444" className="cursor-pointer hover:text-red-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" onClick={() => {
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