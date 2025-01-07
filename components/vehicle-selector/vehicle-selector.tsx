"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Combobox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { capitalize } from "@/lib/utils";

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

const VehicleSelector = ({ model }: { model?: string }) => {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();

        setVehicleMakes(
          (data.Results || []).sort((a: VehicleMake, b: VehicleMake) =>
            a.MakeName.localeCompare(b.MakeName)
          )
        );
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
      }
    };

    fetchVehicleMakes();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  const isButtonDisabled = !selectedMake || !selectedYear;
  const linkHref =
    selectedMake && selectedYear
      ? `/result/${selectedMake.MakeId}/${selectedYear}`
      : "#";

  return (
    <section
      className={`flex gap-3 text-center ${
        model === "results-page"
          ? "flex-col lg:flex-row items-center justify-center"
          : "flex-col"
      }`}
    >
      <div
        className={`flex justify-center items-center gap-4 lg:flex-row ${
          model === "results-page" ? "flex-row" : "flex-col"
        }`}
      >
        <Combobox
          placeholder="Select a vehicle make"
          items={vehicleMakes.map((make) => ({
            value: make.MakeId.toString(),
            label: capitalize(make.MakeName),
          }))}
          selectedValue={selectedMake?.MakeId.toString()}
          onSelect={(value) => {
            const make = vehicleMakes.find(
              (make) => make.MakeId.toString() === value
            );
            setSelectedMake(make || null);
          }}
        />

        <Select value={selectedYear || ""} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-2/3 lg:w-[130px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Link
          href={linkHref}
          className={`inline-block h-9   ${
            isButtonDisabled ? "cursor-not-allowed" : ""
          }`}
        >
          <Button disabled={isButtonDisabled} className="h-full w-full">
            Search
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default VehicleSelector;
