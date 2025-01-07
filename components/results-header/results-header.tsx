"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import VehicleSelector from "../vehicle-selector/vehicle-selector";

export function ResultsHeader({
  makeName,
  year,
}: {
  makeName: string;
  year: string;
}) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold text-center">
          {`Displaying vehicle models for ${makeName} (${year})`}
        </h1>
        <Button onClick={toggleFilters}>
          {showFilters ? "Hide filters" : "Show filters"}
        </Button>
      </div>

      {/* Dropdown filter */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showFilters ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="mb-4 p-4 rounded-lg shadow-md">
          <VehicleSelector model={"results-page"}/>
        </div>
      </div>
    </>
  );
}
