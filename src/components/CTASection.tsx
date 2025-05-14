
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Pet Deserves the Best Care
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              PawTrack helps you manage your pet's health, schedule vet visits, set feeding reminders, and stay on top of grooming — all in one friendly dashboard.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">🐾</span>
                <p className="text-gray-700">Personalized care reminders for feeding, grooming & walks</p>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📅</span>
                <p className="text-gray-700">Vet appointment tracking and vaccination records</p>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📊</span>
                <p className="text-gray-700">Health insights and activity logs</p>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">👩‍⚕️</span>
                <p className="text-gray-700">Connect with nearby pet care services</p>
              </div>
            </div>
            
            {/* <div className="mt-10">
              <Button className="bg-pawtrack-blue hover:bg-pawtrack-blue-dark text-white">
                Get Started
              </Button>
            </div> */}
          </div>
          
          <div className="relative">
            <div className="relative rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://img.freepik.com/free-photo/ai-generated-labrador-retriever-dog-picture_23-2150644882.jpg?ga=GA1.1.313484626.1747128887&semt=ais_hybrid&w=740" 
                alt="Pet care dashboard" 
                className="w-full h-auto object-cover" 
              />
            </div>
            
            {/* <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Next vet checkup:</p>
                  <p className="text-xs text-gray-500">3 days from now</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
