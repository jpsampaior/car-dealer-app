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

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

const VehicleSelector = () => {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();
        setVehicleMakes(data.Results || []);
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
      }
    };

    fetchVehicleMakes();
  }, []);

  const filteredMakes = vehicleMakes.filter((make) =>
    make.MakeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  const isButtonDisabled = !selectedMake || !selectedYear;
  const linkHref =
    selectedMake && selectedYear
      ? `/vehicles/${selectedMake.MakeId}/${selectedYear}`
      : "#";

  return (
    <section className="text-center">
      <div className="flex justify-center gap-4">
        <Combobox
          placeholder="Select a vehicle make"
          items={filteredMakes.map((make) => ({
            value: make.MakeId.toString(),
            label: make.MakeName,
          }))}
          selectedValue={selectedMake?.MakeName || ""}
          onSelect={(value) => {
            const make = vehicleMakes.find(
              (make) => make.MakeId.toString() === value
            );
            setSelectedMake(make || null);
          }}
        />
        <Select value={selectedYear || ""} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[100px]">
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
      <Link
        href={linkHref}
        className={`h-11 m-0 ${isButtonDisabled ? "cursor-not-allowed" : ""}`}
      >
        <Button disabled={isButtonDisabled}>Search</Button>
      </Link>
    </section>
  );
};

export default VehicleSelector;
