const PrimaryButton = ({ name, onClick, isLoading = false }) => {

    return (
        <>
            <div className="flex justify-start mt-4">
                <button
                    className="w-min px-10 bg-blue-950 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300 font-dosisMedium"
                    type="submit"
                    onClick={isLoading === false ? onClick : () => { }}
                >
                    {isLoading === false ? name : 'Loading ... '}
                </button>
            </div>
        </>
    )
}

export { PrimaryButton }