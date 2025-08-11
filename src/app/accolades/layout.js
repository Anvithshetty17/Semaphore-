'use client'

import { MainLayout } from "@/components/main_layout";
import { NavBar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { accoMenuItems } from "@/config/route.config";

export default function Layout({ children }) {

    return (
        <>
            <MainLayout
                menuItems={accoMenuItems}
                routeType={7}
            >
                {children}
            </MainLayout>
        </>
    );
}