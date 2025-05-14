
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PawPrint, Home, Dog, ShoppingCart, Package, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const UserLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const handleLogout = () => {
    logout();
    toast.info('You have been logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-pawtrack-blue" />
            <span className="text-xl font-bold">PawTrack</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-pawtrack-blue flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/pets" className="text-gray-700 hover:text-pawtrack-blue flex items-center gap-1">
              <Dog className="h-4 w-4" />
              <span>Pets</span>
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-pawtrack-blue flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-pawtrack-blue flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span>Services</span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-pawtrack-blue">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-pawtrack-orange text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {getCartCount()}
              </span>
            </Link>
            
            <div className="flex items-center gap-2 border-l pl-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-pawtrack-blue text-white flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden md:inline">{user?.firstName || user?.username || 'User'}</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2025 PawTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
