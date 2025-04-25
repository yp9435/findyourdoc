import type { Doctor } from "@/lib/types";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div
      data-testid="doctor-card"
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Doctor Photo */}
        <div className="w-full md:w-1/4">
          <div className="aspect-square bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            {doctor.photo ? (
              <img
                src={doctor.photo}
                alt={`${doctor.name}'s photo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-16 h-16 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Doctor Details */}
        <div className="w-full md:w-3/4">
          <h2 data-testid="doctor-name" className="text-xl font-bold mb-2">
            {doctor.name}
          </h2>

          <p className="text-sm text-gray-600 mb-2">{doctor.doctor_introduction}</p>

          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-600">Specialties:</span>{" "}
            <span data-testid="doctor-specialty">
              {doctor.specialities.map((specialty) => specialty.name).join(", ")}
            </span>
          </div>

          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-600">Experience:</span>{" "}
            <span data-testid="doctor-experience">{doctor.experience}</span>
          </div>

          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-600">Languages:</span>{" "}
            <span data-testid="doctor-languages">{doctor.languages.join(", ")}</span>
          </div>

          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-600">Consultation Fee:</span>{" "}
            <span data-testid="doctor-fee">{doctor.fees}</span>
          </div>

          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-600">Clinic:</span>{" "}
            <span data-testid="doctor-clinic">{doctor.clinic.name}</span>
          </div>

          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-600">Address:</span>{" "}
            <span data-testid="doctor-address">
              {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality},{" "}
              {doctor.clinic.address.city}
            </span>
          </div>

          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-600">Consultation Type:</span>{" "}
            <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full">
              {doctor.video_consult && doctor.in_clinic
                ? "Video & In-Clinic"
                : doctor.video_consult
                ? "Video"
                : "In-Clinic"}
            </span>
          </div>

          <button className="mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
