import React from 'react';
import { Camera, Compass, Users, Shield, Clock, Leaf } from 'lucide-react';

const features = [
  {
    name: 'Expert Photography Sessions',
    description: 'Capture perfect moments with our professional wildlife photographers',
    icon: Camera,
  },
  {
    name: 'Guided Tours',
    description: 'Experienced naturalists and local guides for an enriching experience',
    icon: Compass,
  },
  {
    name: 'Cultural Immersion',
    description: 'Authentic interactions with local communities and traditions',
    icon: Users,
  },
  {
    name: '24/7 Support',
    description: 'Round-the-clock assistance throughout your journey',
    icon: Shield,
  },
  {
    name: 'Flexible Scheduling',
    description: 'Customizable itineraries to suit your preferences',
    icon: Clock,
  },
  {
    name: 'Sustainable Tourism',
    description: 'Eco-friendly practices supporting local conservation',
    icon: Leaf,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience Assam like never before with our premium services and expert guidance
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-green-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}