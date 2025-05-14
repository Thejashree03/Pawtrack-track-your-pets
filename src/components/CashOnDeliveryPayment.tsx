
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Package, TruckIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CashOnDeliveryPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  onCompletePayment: () => void;
  totalAmount: number;
}

const CashOnDeliveryPayment: React.FC<CashOnDeliveryPaymentProps> = ({
  isOpen,
  onClose,
  onCompletePayment,
  totalAmount = 0,
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Safe format for total amount
  const getFormattedTotal = () => {
    return typeof totalAmount === 'number' ? totalAmount.toFixed(2) : '0.00';
  };
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate processing for COD
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Order placed successfully! You'll pay ₹${getFormattedTotal()} upon delivery.`);
      onCompletePayment();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Cash on Delivery</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="flex flex-col items-center justify-center text-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <TruckIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Pay Cash on Delivery</h3>
              <p className="text-gray-500 mt-1">Pay when your order arrives at your doorstep.</p>
            </div>
          </div>
          
          <div className="border-y py-4 my-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order Total:</span>
              <span className="font-medium text-lg">₹{getFormattedTotal()}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-md">
              <Package className="h-5 w-5 text-gray-600 mt-0.5" />
              <div className="text-sm">
                <p>Your items will be delivered within 3-5 business days.</p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order with Cash on Delivery'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashOnDeliveryPayment;
