import { useQueryConfig } from "@/config/useQuery.config"
import { useGetData } from "@/hooks/useGetData"
import { useAccountStore, useAuthStore } from "@/store"
import { useEffect, useState } from "react"
import Sidebar, { MobileSideBar } from "./sidebar"
import { NavBar } from "./navbar"
import { useRouter } from "next/navigation"
import { Loading } from "./loading"
import Image from "next/image";

const MainLayout = ({
    menuItems,
    children,
    routeType,
    selectedMenu, }) => {

 const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('/images/loading_bg_mobile.png');
    const { token } = useAuthStore()
    const { setAccountName, setUserType } = useAccountStore()
    const router = useRouter()
    const { isLoading, data, isFetched, error } = useGetData(
        'isAuthenticated',
        `${process.env.NEXT_PUBLIC_URL}/web/api/auth/v1/IsAuthenticated?token=${token}`,
        useQueryConfig
    )
     useEffect(() => {
    // Responsive check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

const bgImg = isMobile ? "/images/loading_bg_mobile.png" : "/images/loading_bg_pc.png";





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
             <div className="absolute inset-0 w-full h-full  z-0">
            <Image src={bgImg} alt="Loading background" fill style={{ objectFit: "cover" }} priority sizes="100vw" />
          </div>

                <div 
                    className="flex flex-row space-x-1 lg:space-x-3 h-screen w-screen overflow-hidden py-3 px-2 lg:p-3 bg-[#F2F2F2] bg-cover bg-center bg-no-repeat"

                >
                    <Sidebar menuList={menuItems} setShowSideBar={setShowSidebar} />
                    {showSidebar === true && <MobileSideBar setShowSideBar={setShowSidebar} menuList={menuItems} />}
                    <div className="flex flex-col h-full w-full space-y-3">
                                                                        <NavBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                                                                        <div className="relative w-full h-full overflow-auto z-1 custom-scrollbar">
                                                                                {/* Custom transparent scrollbar for Chrome, Safari and Opera */}
                                                                                <style jsx>{`
                                                                                    .custom-scrollbar::-webkit-scrollbar {
                                                                                        width: 8px;
                                                                                    }
                                                                                    .custom-scrollbar::-webkit-scrollbar-thumb {
                                                                                        background: rgba(255,255,255,0.15);
                                                                                        border-radius: 8px;
                                                                                    }
                                                                                    .custom-scrollbar::-webkit-scrollbar-track {
                                                                                        background: transparent;
                                                                                    }
                                                                                    /* Firefox */
                                                                                    .custom-scrollbar {
                                                                                        scrollbar-width: thin;
                                                                                        scrollbar-color: rgba(255,255,255,0.15) transparent;
                                                                                    }
                                                                                `}</style>
                                                                                {children}
                                                                        </div>
                    </div>
                </div>
            </>
        )
}

export { MainLayout }