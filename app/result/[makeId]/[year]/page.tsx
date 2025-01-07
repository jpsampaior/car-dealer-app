import React, { Suspense } from "react";
import { notFound } from "next/navigation";

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
      <h1 className="text-2xl font-bold mb-4 text-center">
        {`Displaying vehicle models for ${vehicleModels[0].Make_Name} (${year})`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicleModels.map((model) => (
          <div
            key={model.Model_Name}
            className="p-4 border rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{model.Model_Name}</h2>
            <p>{model.Make_Name}</p>
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
