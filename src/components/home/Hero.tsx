import React from "react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="https://media.assettype.com/outlooktraveller%2F2023-10%2F5b58aa6a-cfcb-45a1-ad9f-5bad3b8984ee%2F106554149_744865456346625_1735154775456169959_n.jpg?w=1024&auto=format%2Ccompress&fit=max"
          alt="Northeast India Landscapes"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover the Magic of Northeast India
          </h1>
          <p className="mt-6 text-lg leading-8">
            From the one-horned rhinos of Kaziranga to the living root bridges of Meghalaya,
            the towering monasteries of Tawang, and the vibrant tribal cultures of Nagaland —
            experience the breathtaking beauty, rich heritage, and untouched wilderness of 
            India's enchanting Northeast.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to="/packages"
              className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
            >
              View Packages
            </Link>
            <Link
              to="/contact"
              className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
