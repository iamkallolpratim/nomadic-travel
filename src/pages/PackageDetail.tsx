import React from 'react';
import { useParams } from 'react-router-dom';
import { packages } from '../data/packages';
import { PackageDetails } from '../components/packages/PackageDetails';

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const packageData = packages.find((pkg) => pkg.id === id);

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Package Not Found</h2>
          <p className="mt-2 text-gray-600">The package you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <PackageDetails package={packageData} />;
}