'use client'
import { Loading } from "@/components/loading";
import { VerifyEmailComponent } from "@/components/verify_email_component";
import { Suspense } from "react";

const VerifyEmail = () => {

    return (
        <>
            <Suspense fallback={<Loading />} >
                <div className="flex flex-col w-screen h-screen overflow-hidden bg-gradient-to-br from-[#000080] to-[#00001A] items-center justify-center">
                    <VerifyEmailComponent />
                </div>
            </Suspense>
        </>
    )
}

export default VerifyEmail;