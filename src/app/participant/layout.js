'use client'

import { MainLayout } from "@/components/main_layout";
import { participantMenu } from "@/config/route.config";

export default function Layout({ children }) {

    return (
        <>
            <MainLayout
                menuItems={participantMenu}
                routeType={6}
            >
                {children}
            </MainLayout>
        </>
    );
}