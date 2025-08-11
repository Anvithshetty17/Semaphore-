
const Loading = () => {

    return (

        <div className="flex flex-col space-y-3 w-screen h-screen items-center justify-center bg-[#F2F2F2]">
            <div className="flex flex-col space-y-3 border rounded-lg bg-white px-24 py-10 items-center">
                <h3 className="text-[20px] font-dosisBold"> Loading </h3>

                <p className="text-[16px] font-dosisMedium text-slate-400"> Please be patient while we load your content </p>
            </div>

        </div>
    )
}

export { Loading }