
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PaymentOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onCompletePayment: () => void;
  totalAmount: number;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  isOpen,
  onClose,
  onCompletePayment,
  totalAmount = 0, 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('gpay');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [upiId, setUpiId] = useState<string>('');
  const [showUpiInput, setShowUpiInput] = useState<boolean>(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'gpay',
      name: 'Google Pay',
      icon: <div className="bg-white p-1 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-500">
          <path d="M6,3h12c1.7,0,3,1.3,3,3v12c0,1.7-1.3,3-3,3H6c-1.7,0-3-1.3-3-3V6C3,4.3,4.3,3,6,3z" />
          <path d="M12 7.5v9M7.5 12h9" stroke="white" strokeWidth="2" />
        </svg>
      </div>
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: <div className="bg-indigo-600 p-1 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
          <path d="M12 6v8l4 4" />
        </svg>
      </div>
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: <div className="bg-blue-700 p-1 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    },
    {
      id: 'creditcard',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="text-gray-600" />
    },
  ];

  // Safe format for total amount
  const getFormattedTotal = () => {
    return typeof totalAmount === 'number' ? totalAmount.toFixed(2) : '0.00';
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setSelectedMethod(value);
    setShowUpiInput(value === 'gpay' || value === 'phonepe');
  };

  const handleUpiSubmit = () => {
    if (!upiId || !upiId.includes('@')) {
      toast.error('Please enter a valid UPI ID');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate redirect to respective payment app
    setTimeout(() => {
      // This would be where you'd actually redirect to the payment app
      // For demo purposes, we'll just complete the payment after a delay
      setIsProcessing(false);
      
      // Simulate successful payment
      const paymentApp = selectedMethod === 'gpay' ? 'Google Pay' : 
                      selectedMethod === 'phonepe' ? 'PhonePe' : 
                      selectedMethod === 'razorpay' ? 'Razorpay' : 'payment gateway';
      
      toast.success(`Payment of ₹${getFormattedTotal()} processed successfully through ${paymentApp}!`);
      onCompletePayment();
    }, 2000);
  };

  const handlePayment = () => {
    if ((selectedMethod === 'gpay' || selectedMethod === 'phonepe') && !showUpiInput) {
      setShowUpiInput(true);
      return;
    }
    
    if ((selectedMethod === 'gpay' || selectedMethod === 'phonepe') && showUpiInput) {
      handleUpiSubmit();
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing for other methods
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Payment of ₹${getFormattedTotal()} processed successfully!`);
      onCompletePayment();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Choose Payment Method</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            value={selectedMethod} 
            onValueChange={handlePaymentMethodChange}
            className="space-y-4"
          >
            {paymentMethods.map((method) => (
              <div 
                key={method.id} 
                className={`flex items-center space-x-3 border rounded-lg p-4 transition-all
                ${selectedMethod === method.id ? 'border-black bg-gray-50' : 'border-gray-200'}`}
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex flex-1 items-center justify-between">
                  <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer">
                    <span className="flex items-center justify-center h-10 w-10">{method.icon}</span>
                    <span>{method.name}</span>
                  </Label>
                  {selectedMethod === method.id && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
          
          {showUpiInput && (selectedMethod === 'gpay' || selectedMethod === 'phonepe') && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <Label htmlFor="upi-id" className="mb-2 block">Enter your UPI ID</Label>
              <div className="flex gap-2">
                <Input 
                  id="upi-id" 
                  value={upiId} 
                  onChange={(e) => setUpiId(e.target.value)} 
                  placeholder="yourname@upi"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: username@bankname (e.g., john@okicici)
              </p>
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Order Total:</span>
              <span className="font-medium">₹{getFormattedTotal()}</span>
            </div>
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptions;
