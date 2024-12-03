import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingTierProps {
  type: "budget" | "premium" | "luxury";
  price?: number;
  features: string[];
}

const tiers = {
  budget: {
    name: "Budget",
    description: "Perfect for budget-conscious travelers",
    color: "bg-gray-600",
  },
  premium: {
    name: "Premium",
    description: "Enhanced comfort and experiences",
    color: "bg-green-600",
  },
  luxury: {
    name: "Luxury",
    description: "Ultimate luxury and exclusivity",
    color: "bg-amber-600",
  },
};

export function PricingTier({ type, price, features }: PricingTierProps) {
  const tier = tiers[type];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
      <div>
        <div className="flex items-center justify-between gap-x-4">
          <h3 className="text-lg font-semibold leading-8 text-gray-900">
            {tier.name}
          </h3>
          <p
            className={`rounded-full ${tier.color} px-2.5 py-1 text-xs font-semibold leading-5 text-white`}
          >
            {tier.name}
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-600">
          {tier.description}
        </p>
        {/* <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            ₹{price.toLocaleString()}
          </span>
          <span className="text-sm font-semibold leading-6 text-gray-600">
            /person
          </span>
        </p> */}
        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
        >
          {features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <Check
                className="h-6 w-5 flex-none text-green-600"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => navigate(`/contact`)}
        type="button"
        className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tier.color}`}
      >
        Book {tier.name} Package
      </button>
    </div>
  );
}
