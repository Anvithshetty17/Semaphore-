'use client'

import { MainLayout } from "@/components/main_layout";
import { eventHeadMenu } from "@/config/route.config";

export default function Layout({ children }) {

    return (
        <>
            <MainLayout
                menuItems={eventHeadMenu}
                routeType={4}
            >
                {children}
            </MainLayout>
        </>
    );
}