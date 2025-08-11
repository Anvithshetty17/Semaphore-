"use client";

import { DropDown } from "@/components/dropdown";
import { PasswordTextInput, TextInput } from "@/components/input";
import { useQueryConfig } from "@/config/useQuery.config";
import { useGetData } from "@/hooks/useGetData";
import { useSubmit } from "@/hooks/useSubmit";
import { Mail01Icon, LockPasswordIcon, BankIcon, UserGroupIcon, SmartPhone01Icon, UserAccountIcon } from "hugeicons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

export default function Register_Page() {
    //state to list selectable colleges
    const [colleges, setColleges] = useState([]);
    const router = useRouter()
    const { submitData: registerUser, isLoading: isRegistering } = useSubmit()

    const { data: collegeList, isLoading: isCollegeListLoading } = useGetData(
        `collegeList`,
        `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/GetCollegeList`,
        useQueryConfig
    )

    //states
    const [formData, setformData] = useState({
        email: "",
        password: "",
        college: "",
        phoneNumber: "",
        teamName: "",
        fullName: ''
    })

    //Handling input change
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        if (name == "email") {
            setformData({ email: value })
        } else if (name == "password") {
            setformData({ password: value })
        } else if (name == "college") {
            setformData({ college: value })
        } else if (name == 'teamName') {
            setformData({ teamName: value })
        } else if (name == 'phoneNumber') {
            setformData({ phoneNumber: value })
        } else if (name == 'fullName') {
            setformData({ fullName: value })
        }
    }

    //TODO: Fetch college list
    useEffect(() => {
        async function fetchData() {
            setColleges(["NMAMIT Nitte", "St. Philomena", "Vivekananda College"]);
        }
        fetchData();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData(e.target);
            const body = Object.fromEntries(formData);
            if (body?.phoneNumber?.toString().length != 10) {
                toast.info("Phone Number should be exactly 10 digits")
                return
            }
            const { data } = await registerUser(
                `${process.env.NEXT_PUBLIC_URL}/web/api/registration/v1/RegisterParticipant`,
                body,
            )
            if (data) {
                toast.success('Account created successfully');
                toast.info("Please check your email for account verification");
                setTimeout(() => {
                    router.push('/login')
                }, 1500)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? error?.message ?? 'Registration failed')
        }
    }

    return (
        <>
            {/* <C>
                <ambientLight intensity={0.5} />
                <Stars />
                </C */}
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#000080] to-[#00001A]">


                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm mx-4 lg:mx-auto bg-white p-8 rounded-lg shadow-lg relative">
                    <Image
                        className="absolute -top-9 -left-8 rounded-full"

                        src={'/images/semaphore_logo.jpeg'}
                        width={120}
                        height={120}
                        alt="Sempahore Logo"
                    />
                    <h2 className="text-2xl font-bold text-center mb-8 font-dosisBold">Register</h2>

                    <TextInput
                        label={"Full Name"}
                        name={'fullName'}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        icon={<UserAccountIcon color="#000" />}
                        placeholder={'Enter Full Name'}
                    />

                    <TextInput
                        label={"Email"}
                        name={'email'}
                        value={formData.email}
                        onChange={handleInputChange}
                        icon={<Mail01Icon color="#000" />}
                        placeholder={'Enter Email'}
                    />

                    {/*Password*/}
                    <PasswordTextInput
                        label={"Password"}
                        name={'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        icon={<LockPasswordIcon color="#000" />}
                        placeholder={'Enter Password'}
                    />
                    <TextInput
                        label={"Phone Number"}
                        name={'phoneNumber'}
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        type="number"
                        icon={<SmartPhone01Icon color="#000" />}
                        placeholder={'Enter Phone Number'}
                    />
                    {/* <TextInput
                        label={"Team Name"}
                        name={'teamName'}
                        value={formData.teamName}
                        onChange={handleInputChange}
                        icon={<UserGroupIcon color="#000" />}
                        placeholder={'Enter Team Name'}
                    /> */}
                    <DropDown
                        name={'collegeId'}
                        label="Select College"
                        DropDownItems={collegeList?.map((ele, index) => {
                            return {
                                label: ele?.collegeName,
                                value: ele?.collegeId,
                            }
                        })}
                        placeholder={'Select College'}
                    />
                    <div className="flex justify-center w-full mt-4">
                        <button
                            className="w-1/2 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 font-dosisMedium"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}