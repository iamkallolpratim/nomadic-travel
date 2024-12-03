/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Package } from "../../types";
import { PricingTier } from "./PricingTier";
import { Clock, MapPin } from "lucide-react";

interface PackageDetailsProps {
  package: Package;
}

export function PackageDetails({ package: pkg }: PackageDetailsProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Header */}
        <div className="relative">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="aspect-[3/1] w-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 rounded-xl bg-black/40 flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-3xl font-bold">{pkg.title}</h1>
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-5 w-5" />
                  <span>Kaziranga National Park</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 max-w-3xl">
          <p className="text-lg text-gray-600">{pkg.description}</p>
        </div>

        {/* Highlights */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Package Highlights
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pkg.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
                  •
                </span>
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Itinerary */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Detailed Itinerary
          </h2>
          <div className="mt-6 space-y-6">
            {pkg.itinerary.map((day) => (
              <div key={day.day} className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-gray-900">
                  Day {day.day}: {day.title}
                </h3>
                <p className="mt-2 text-gray-600">{day.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Package Options</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <PricingTier
              type="budget"
              price={pkg.price.budget}
              features={pkg.included}
            />
            <PricingTier
              type="premium"
              price={pkg.price.premium}
              features={pkg.included}
            />
            <PricingTier
              type="luxury"
              price={pkg.price.luxury}
              features={pkg.included}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
