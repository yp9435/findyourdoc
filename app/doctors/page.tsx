"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorList from "@/components/DoctorList";
import type { Doctor } from "@/lib/types";

export default function DoctorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchQuery = searchParams.get("search") || "";
  const consultationType = searchParams.get("consultationType") || "";
  const specialties = searchParams.get("specialties")?.split(",").filter(Boolean) || [];
  const sortBy = searchParams.get("sortBy") || "";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data: Doctor[] = await response.json();
        setDoctors(data);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const updateFilters = ({
    search = searchQuery,
    consultType = consultationType,
    specs = specialties,
    sort = sortBy,
  }: {
    search?: string;
    consultType?: string;
    specs?: string[];
    sort?: string;
  }) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (consultType) params.set("consultationType", consultType);
    if (specs.length > 0) params.set("specialties", specs.join(","));
    if (sort) params.set("sortBy", sort);

    router.push(`/doctors?${params.toString()}`);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    if (searchQuery && !doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (consultationType) {
      const consultTypeMatch =
        (consultationType === "Video" && doctor.video_consult) ||
        (consultationType === "In-Clinic" && doctor.in_clinic) ||
        (consultationType === "Video & In-Clinic" && doctor.video_consult && doctor.in_clinic);

      if (!consultTypeMatch) {
        return false;
      }
    }

    if (specialties.length > 0) {
      const doctorSpecialties = doctor.specialities.map((specialty) => specialty.name);
      const hasMatchingSpecialty = specialties.some((specialty) => doctorSpecialties.includes(specialty));

      if (!hasMatchingSpecialty) {
        return false;
      }
    }

    return true;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === "fees") {
      const feeA = parseInt(a.fees.replace("₹", "").trim());
      const feeB = parseInt(b.fees.replace("₹", "").trim());
      return feeA - feeB;
    }
    if (sortBy === "experience") {
      const expA = parseInt(a.experience.split(" ")[0]);
      const expB = parseInt(b.experience.split(" ")[0]);
      return expB - expA;
    }
    return 0;
  });

  const allSpecialties = Array.from(new Set(doctors.flatMap((doctor) => doctor.specialities.map((s) => s.name)))).sort();

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Your Doctor</h1>

      <SearchBar doctors={doctors} searchQuery={searchQuery} onSearch={(search) => updateFilters({ search })} />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-full md:w-1/4">
          <FilterPanel
            allSpecialties={allSpecialties}
            selectedConsultationType={consultationType}
            selectedSpecialties={specialties}
            selectedSortOption={sortBy}
            onFilterChange={(filters) => updateFilters(filters)}
          />
        </div>

        <div className="w-full md:w-3/4">
          <DoctorList doctors={sortedDoctors} loading={loading} />
        </div>
      </div>
    </div>
  );
}
