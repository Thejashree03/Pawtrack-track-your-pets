
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pets from "./pages/Pets";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Inventory from "./pages/admin/Inventory";
import Settings from "./pages/admin/Settings";
import Adoptions from "./pages/admin/Adoptions";
import Cart from "./pages/Cart";
import PetInquiry from "./components/PetInquiry";
import AddressManager from "./components/AddressManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Make login the default landing page */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Protected user routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<UserLayout />}>
                  <Route path="/home" element={<Index />} />
                  <Route path="/pets" element={<Pets />} />
                  <Route path="/pet-inquiries" element={<PetInquiry />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/addresses" element={<AddressManager />} />
                </Route>
              </Route>

              {/* Protected admin routes */}
              <Route element={<ProtectedRoute requireAdmin />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="adoptions" element={<Adoptions />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
