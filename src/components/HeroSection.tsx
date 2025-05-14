
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white paw-print-bg">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              PawTrack <span className="block text-pawtrack-blue">Smart Pet Care</span>
            </h1>
            <p className="max-w-md mt-4 text-lg text-gray-600">
              Your all-in-one platform for pet tracking, health monitoring, and personalized care solutions to keep your furry friends healthy and happy.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-pawtrack-blue hover:bg-pawtrack-blue-dark">
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
          
          <div >
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Dog with owner" 
              className="w-full rounded-lg shadow-xl" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
