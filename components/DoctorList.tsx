import DoctorCard from "./DoctorCard"
import type { Doctor } from "@/lib/types"

interface DoctorListProps {
  doctors: Doctor[]
  loading: boolean
}

export default function DoctorList({ doctors, loading }: DoctorListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
        <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  )
}
