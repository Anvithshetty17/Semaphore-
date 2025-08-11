const RegistrationStepsComponent = () => {
    return (
        <>
            <div className="flex flex-col space-y-3 border rounded-lg bg-white p-4 justify-center mb-3">
                <h3 className="text-[20px] font-dosisBold"> Registration Steps </h3>
                <ol className="font-dosisRegular text-[16px] flex flex-col space-y-1">
                    <li>1. Go to the Registration Menu and enter the name and phone number of the participants.</li>
                    <li>2. Proceed to the payment step, scan the QR code, and provide payment details including Account Holder Name, Phone Number, UPI ID, and Transaction ID. Confirm the details.</li>
                    <li>3. After the payment is verified, a confirmation email will be sent to this email.</li>
                </ol>

                <p className="font-dosisMedium text-[16px]"><strong>Note:</strong> Registration of the team is completed only after the payment is received successfully.</p>

            </div>
        </>
    )
}

export { RegistrationStepsComponent }