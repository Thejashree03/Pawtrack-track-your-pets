
import React from 'react';
import { PawPrint, ShoppingCart, Users, Calendar } from 'lucide-react';

const features = [
  {
    name: 'Pet Management',
    description: 'Track all pets with detailed profiles, health records, and availability status.',
    icon: PawPrint,
  },
  {
    name: 'Product Inventory',
    description: 'Manage food, supplies, and equipment with real-time stock tracking.',
    icon: ShoppingCart,
  },
  {
    name: 'Customer Records',
    description: 'Keep detailed customer information and purchase history in one place.',
    icon: Users,
  },
  {
    name: 'Appointment Scheduling',
    description: 'Schedule and manage grooming, training, and veterinary appointments.',
    icon: Calendar,
  },
];

const FeatureSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Helping You Care, Track, and Love Better
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
           Everything you need to care for pets with love and ease
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-md bg-pawtrack-blue bg-opacity-10">
                <feature.icon className="w-6 h-6 text-pawtrack-blue" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
