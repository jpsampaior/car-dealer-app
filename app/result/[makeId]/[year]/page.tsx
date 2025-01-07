import React, { useState, Suspense } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import VehicleSelector from "@/components/vehicle-selector/vehicle-selector";
import { ResultsHeader } from "@/components/results-header/results-header";

interface VehicleModel {
  Model_Name: string;
  Make_Name: string;
}

const fetchVehicleModels = async (makeId: string, year: string) => {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vehicle models");
  }

  const data = await res.json();
  return data.Results as VehicleModel[];
};

const VehicleModels = async ({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) => {
  let vehicleModels: VehicleModel[] = [];

  try {
    vehicleModels = await fetchVehicleModels(makeId, year);
  } catch (error) {
    console.error("Error fetching vehicle models:", error);
    return notFound();
  }

  if (vehicleModels.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-semibold">No models found</h1>
        <p className="text-gray-500">
          No vehicle models were found for the selected make and year.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 w-11/12">
      <ResultsHeader makeName={vehicleModels[0].Make_Name} year={year} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicleModels.map((model) => (
          <div
            key={model.Model_Name}
            className="p-4 border rounded-lg shadow-md"
          >
            <img
              src="https://placehold.co/400"
              alt={model.Model_Name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{model.Model_Name}</h2>
            <p className="text-gray-600">{model.Make_Name}</p>
            <p className="mt-2 text-lg font-bold text-blue-500">
              ${Math.floor(Math.random() * (50000 - 20000 + 1)) + 20000}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const VehicleModelsPage = ({
  params,
}: {
  params: { makeId: string; year: string };
}) => {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <VehicleModels makeId={params.makeId} year={params.year} />
    </Suspense>
  );
};

export default VehicleModelsPage;
