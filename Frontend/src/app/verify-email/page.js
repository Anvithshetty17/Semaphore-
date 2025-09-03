'use client'
import { Loading } from "@/components/loading";
import { VerifyEmailComponent } from "@/components/verify_email_component";
import Image from "next/image";
import { Suspense } from "react";

const VerifyEmail = () => {

    return (
        <>
            <Suspense fallback={<Loading />} >
            <Image src="/images/change-password-bg.jpg" alt="Background" fill className="absolute z-0 opacity-10 object-cover" priority/>
                <div className="flex flex-col w-screen h-screen overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900  items-center justify-center">
                    <VerifyEmailComponent />
                </div>
            </Suspense>
        </>
    )
}

export default VerifyEmail;