"use client";

import VehicleSelector from "@/components/vehicle-selector/vehicle-selector";

export default function Home() {
  return (
    <main className="px-4 space-y-5 pt-8">
      <section className="space-y-2 text-center">
        <h1 className="text-5xl font-extrabold">Welcome to Highway Motors</h1>
        <p className="text-tertiary">Please select a maker and model of the vehicle you want to search</p>
      </section>
      <VehicleSelector />
    </main>
  );
}
