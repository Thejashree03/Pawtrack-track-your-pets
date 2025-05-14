
import React from 'react';
import { PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <PawPrint className="h-8 w-8 text-pawtrack-blue" />
          <span className="text-xl font-bold text-pawtrack-blue">PawTrack</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/pets" className="text-gray-600 hover:text-pawtrack-blue">Pets</Link>
          <Link to="/products" className="text-gray-600 hover:text-pawtrack-blue">Products</Link>
          <Link to="/services" className="text-gray-600 hover:text-pawtrack-blue">Services</Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-pawtrack-blue hover:bg-pawtrack-blue-dark">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
