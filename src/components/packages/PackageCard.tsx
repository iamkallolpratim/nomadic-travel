/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Clock, IndianRupee } from "lucide-react";
import { Package } from "../../types";
import { Link } from "react-router-dom";

interface PackageCardProps {
  package: Package;
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={pkg.image}
          alt={pkg.title}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1.5 h-4 w-4" />
              {pkg.duration}
            </div>
            {/* <div className="flex items-center text-sm text-gray-500">
              <IndianRupee className="mr-1.5 h-4 w-4" />
              From ₹{pkg.price.budget.toLocaleString()}
            </div> */}
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            {pkg.title}
          </h3>
          <p className="mt-3 text-base text-gray-500">{pkg.description}</p>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Highlights:</h4>
            <ul className="mt-2 space-y-1">
              {pkg.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="text-sm text-gray-500">
                  • {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to={`/packages/${pkg.id}`}
            className="block w-full rounded-md bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
