const { AdminRegistrationDetailsComponent } = require("@/components/admin_registration_details_component")

const RegistrationDetails = () => {

    return (
        <div className="flex flex-col space-y-3 border rounded-lg bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-6">
            <h3 className="font-dosisBold mb-3 text-white text-lg tracking-wider drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                Registration Details
            </h3>
            <AdminRegistrationDetailsComponent />
        </div>
    )
}

export default RegistrationDetails