
import React from 'react';

const testimonials = [
  {
    content: "PawTrack has transformed how we manage our pet shop. The inventory system alone has saved us countless hours of manual work.",
    author: "Sarah Johnson",
    role: "Pet Shop Owner",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    content: "As a veterinary clinic, we needed a system that could handle both appointments and pet records. PawTrack delivers on all fronts.",
    author: "Dr. Michael Chen",
    role: "Veterinarian",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    content: "The customer portal makes it so easy for me to schedule grooming appointments and order supplies for my pets. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Pet Owner",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
  }
];

const TestimonialSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600">
            Trusted by pet businesses and owners across the country
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
              <div className="flex items-center mt-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
