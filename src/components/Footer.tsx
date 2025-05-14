
import React from 'react';
import { PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <PawPrint className="h-6 w-6 text-pawtrack-blue" />
              <span className="text-lg font-bold">PawTrack</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Your complete solution for pet care management.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Solutions</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/pets" className="text-gray-600 hover:text-pawtrack-blue text-sm">Find Pets</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-pawtrack-blue text-sm">Pet Products</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-pawtrack-blue text-sm">Grooming</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pawtrack-blue text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pawtrack-blue text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pawtrack-blue text-sm">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pawtrack-blue text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pawtrack-blue text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pawtrack-blue text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} PawTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
