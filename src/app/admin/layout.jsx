'use client'
const { MainLayout } = require("@/components/main_layout")
const { adminMenuItems } = require("@/config/route.config")

const AdminLayout = ({ children }) => {

    return (
        <>
            <MainLayout
                menuItems={adminMenuItems}
                routeType={2}
            >
                {children}
            </MainLayout>
        </>
    )
}

export default AdminLayout