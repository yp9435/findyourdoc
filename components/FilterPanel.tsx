"use client";

interface FilterPanelProps {
  allSpecialties: string[];
  selectedConsultationType: string;
  selectedSpecialties: string[];
  selectedSortOption: string;
  onFilterChange: (filters: {
    consultType?: string;
    specs?: string[];
    sort?: string;
  }) => void;
}

export default function FilterPanel({
  allSpecialties,
  selectedConsultationType,
  selectedSpecialties,
  selectedSortOption,
  onFilterChange,
}: FilterPanelProps) {
  const handleConsultationTypeChange = (type: string) => {
    onFilterChange({
      consultType: type === selectedConsultationType ? "" : type,
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    let newSpecialties: string[];

    if (selectedSpecialties.includes(specialty)) {
      newSpecialties = selectedSpecialties.filter((s) => s !== specialty);
    } else {
      newSpecialties = [...selectedSpecialties, specialty];
    }

    onFilterChange({ specs: newSpecialties });
  };

  const handleSortChange = (sortOption: string) => {
    onFilterChange({ sort: sortOption });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h3 data-testid="filter-header-moc" className="font-semibold mb-2 pb-1 border-b">
          Consultation Type
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={selectedConsultationType === "Video"}
              onChange={() => handleConsultationTypeChange("Video")}
              className="form-radio text-black"
            />
            <span>Video</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={selectedConsultationType === "In-Clinic"}
              onChange={() => handleConsultationTypeChange("In-Clinic")}
              className="form-radio text-black"
            />
            <span>In-Clinic</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-and-in-clinic"
              checked={selectedConsultationType === "Video & In-Clinic"}
              onChange={() => handleConsultationTypeChange("Video & In-Clinic")}
              className="form-radio text-black"
            />
            <span>Video & In-Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 data-testid="filter-header-speciality" className="font-semibold mb-2 pb-1 border-b">
          Specialties
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {allSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace("/", "-")}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="form-checkbox text-black"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 data-testid="filter-header-sort" className="font-semibold mb-2 pb-1 border-b">
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={selectedSortOption === "fees"}
              onChange={() => handleSortChange("fees")}
              className="form-radio text-black"
            />
            <span>Fees (Low to High)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={selectedSortOption === "experience"}
              onChange={() => handleSortChange("experience")}
              className="form-radio text-black"
            />
            <span>Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
