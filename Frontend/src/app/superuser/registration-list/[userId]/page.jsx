import AdminRegistrationDetailsComponent from "@/components/admin_registration_details_component"

export default function RegistrationDetailsPage({ params }) {
  const { userId } = params || {}

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <a href="/superuser/registration-list" className="inline-block mb-4 text-cyan-200 font-dosisMedium hover:underline">&larr; Back to list</a>
        <AdminRegistrationDetailsComponent userId={userId} />
      </div>
    </div>
  )
}
