
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash, ShoppingBag, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import CheckoutAddressForm from '@/components/CheckoutAddressForm';
import CashOnDeliveryPayment from '@/components/CashOnDeliveryPayment';
import { Link } from 'react-router-dom';
const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, updateItemQuantity } = useCart();
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalWithTaxAndShipping = () => {
    const subtotal = getTotalPrice();
    const shipping = 150;
    const tax = subtotal * 0.18;
    return subtotal + shipping + tax;
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Add some items before checkout.');
      return;
    }
    setIsAddressFormOpen(true);
  };
  
  const handleAddressSubmit = (addressData: any) => {
    console.log('Address submitted:', addressData);
    setShippingAddress(addressData);
    setIsAddressFormOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentComplete = () => {
    setIsPaymentOpen(false);
    setOrderCompleted(true);
    // Simulate sending order confirmation email
    setTimeout(() => {
      toast.success("Order confirmation email sent!");
    }, 1500);
    clearCart();
  };

  const handleIncreaseQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      updateItemQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      updateItemQuantity(itemId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeFromCart(itemId);
    }
  };
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">Your Cart</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Review your items and proceed to checkout
        </p>
      </div>
      
      {orderCompleted ? (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h2>
            <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
          </div>
          
          <div className="border-t border-gray-200 py-4 mb-4">
            <div className="text-sm text-gray-600">
              <p>A confirmation email has been sent to your email address.</p>
              <p className="mt-2">Your order will be processed shortly.</p>
            </div>
          </div>
          
          <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
             <Link to="/Products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {cartItems.map((item) => (
                  <Card key={item.id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 overflow-hidden rounded-md">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-500">{item.category}</p>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              <p className="text-pawtrack-blue">₹{item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleDecreaseQuantity(item.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleIncreaseQuantity(item.id)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-500 hover:text-red-500 ml-2"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>₹150.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>₹{getTotalWithTaxAndShipping().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-black hover:bg-gray-800 text-white"
                      onClick={handleCheckout}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex justify-center items-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild className="bg-black hover:bg-gray-800 text-white">
                <a href="/products">Continue Shopping</a>
              </Button>
            </div>
          )}
        </>
      )}
      
      <CheckoutAddressForm 
        isOpen={isAddressFormOpen} 
        onClose={() => setIsAddressFormOpen(false)}
        onSubmitAddress={handleAddressSubmit}
      />
      
      <CashOnDeliveryPayment
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onCompletePayment={handlePaymentComplete}
        totalAmount={getTotalWithTaxAndShipping()}
      />
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default Cart;
