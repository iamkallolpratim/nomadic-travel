import React from "react";
import { PackageCard } from "../components/packages/PackageCard";
import { packages } from "../data/packages";

export default function Packages() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Our Packages
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover our carefully curated packages designed to give you the
            best experience of Kaziranga National Park and Assam's rich culture.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}
