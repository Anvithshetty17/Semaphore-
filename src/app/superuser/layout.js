'use client'

import { MainLayout } from "@/components/main_layout";
import { superUserMenu } from "@/config/route.config";

export default function Layout({ children }) {

    return (
        <>
            <MainLayout
                menuItems={superUserMenu}
                routeType={1}
            >
                {children}
            </MainLayout>
        </>
    );
}