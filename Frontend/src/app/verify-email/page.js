'use client'
import { Loading } from "@/components/loading";
import { VerifyEmailComponent } from "@/components/verify_email_component";
import Image from "next/image";
import { Suspense } from "react";

const VerifyEmail = () => {

    return (
        <>
            <Suspense fallback={<Loading />} >
                <div className="relative flex flex-col w-screen h-screen overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 items-center justify-center">
                    <Image src="/images/change-password-bg.jpg" alt="Background" fill className="absolute inset-0 z-0 opacity-10 object-cover" priority/>
                    <div className="relative z-10">
                        <VerifyEmailComponent />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default VerifyEmail;