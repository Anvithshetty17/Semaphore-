import AdminRegistrationDetailsComponent from '@/components/admin_registration_details_component'

export default function RegistrationCommitteeDetailsPage({ params }) {
  const { userId } = params || {}

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <a href="/registrations" className="inline-block mb-4 text-cyan-200 font-dosisMedium hover:underline">&larr; Back to registrations</a>
        <AdminRegistrationDetailsComponent userId={userId} />
      </div>
    </div>
  )
}
