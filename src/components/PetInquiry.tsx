
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Info } from "lucide-react";
import { useAuth } from '@/context/AuthContext';

interface Inquiry {
  id: string;
  petId: number;
  petName: string;
  petImage: string;
  userId: string;
  username: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
  cancelReason?: string;
}

// Mock data for pet inquiries
const mockInquiries: Inquiry[] = [
  {
    id: "INQ-001",
    petId: 1,
    petName: "Max",
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    userId: "2",
    username: "user",
    date: "2023-06-15",
    status: "Pending"
  },
  {
    id: "INQ-002",
    petId: 7,
    petName: "Daisy",
    petImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    userId: "2",
    username: "user",
    date: "2023-06-10",
    status: "Approved"
  },
  {
    id: "INQ-003",
    petId: 4,
    petName: "Luna",
    petImage: "https://img.freepik.com/free-photo/beautiful-cat-with-fluffy-background_23-2150752750.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    userId: "2",
    username: "user",
    date: "2023-06-05",
    status: "Cancelled",
    cancelReason: "Changed my mind about adoption at this time."
  }
];

// Map to track inquiry count per pet
const petInquiryCounts: Record<number, number> = {};
mockInquiries.forEach(inquiry => {
  petInquiryCounts[inquiry.petId] = (petInquiryCounts[inquiry.petId] || 0) + 1;
});

interface PetInquiryProps {
  className?: string;
}

const PetInquiry: React.FC<PetInquiryProps> = ({ className }) => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Filter inquiries for current user
  const userInquiries = inquiries.filter(inquiry => inquiry.userId === user?.id);

  const handleCancelInquiry = (inquiryId: string) => {
    if (!cancelReason.trim()) {
      return;
    }

    const updatedInquiries = inquiries.map(inq => 
      inq.id === inquiryId 
        ? { ...inq, status: 'Cancelled' as const, cancelReason } 
        : inq
    );

    setInquiries(updatedInquiries);
    setCancelReason("");
    setSelectedInquiry(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Pet Inquiries</h2>
        <Button variant="outline" className="flex gap-2">
          <Mail size={16} />
          <span>Contact Support</span>
        </Button>
      </div>

      {userInquiries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userInquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{inquiry.petName}</CardTitle>
                    <p className="text-sm text-gray-500">Inquiry ID: {inquiry.id}</p>
                  </div>
                  <div>
                    {getStatusBadge(inquiry.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex gap-4">
                  <img 
                    src={inquiry.petImage} 
                    alt={inquiry.petName}
                    className="w-20 h-20 rounded-md object-cover" 
                  />
                  <div>
                    <p className="text-sm"><span className="font-medium">Date:</span> {inquiry.date}</p>
                    <p className="text-sm"><span className="font-medium">Pet ID:</span> {inquiry.petId}</p>
                    <p className="text-sm">
                      <span className="font-medium">Total Inquiries for this pet:</span> {petInquiryCounts[inquiry.petId]}
                    </p>
                    {inquiry.cancelReason && (
                      <p className="text-sm mt-2">
                        <span className="font-medium">Cancellation Reason:</span> {inquiry.cancelReason}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="w-full flex justify-end">
                  {inquiry.status === "Pending" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          Cancel Inquiry
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Pet Inquiry</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Please provide a reason for cancelling your inquiry for {selectedInquiry?.petName}.
                          </p>
                          <Textarea
                            placeholder="Reason for cancellation..."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setCancelReason("");
                              setSelectedInquiry(null);
                            }}
                          >
                            Nevermind
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={() => selectedInquiry && handleCancelInquiry(selectedInquiry.id)}
                            disabled={!cancelReason.trim()}
                          >
                            Submit Cancellation
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-2">
                        <Info size={16} className="mr-1" /> Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Inquiry Details for {inquiry.petName}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex justify-center mb-4">
                          <img 
                            src={inquiry.petImage} 
                            alt={inquiry.petName}
                            className="w-40 h-40 rounded-md object-cover" 
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="border p-2 rounded-md">
                            <p className="font-medium">Inquiry ID</p>
                            <p>{inquiry.id}</p>
                          </div>
                          <div className="border p-2 rounded-md">
                            <p className="font-medium">Date</p>
                            <p>{inquiry.date}</p>
                          </div>
                          <div className="border p-2 rounded-md">
                            <p className="font-medium">Status</p>
                            <p>{getStatusBadge(inquiry.status)}</p>
                          </div>
                          <div className="border p-2 rounded-md">
                            <p className="font-medium">Pet ID</p>
                            <p>{inquiry.petId}</p>
                          </div>
                          <div className="border p-2 rounded-md col-span-2">
                            <p className="font-medium">Total Inquiries</p>
                            <p>{petInquiryCounts[inquiry.petId]} people have inquired about this pet</p>
                          </div>
                          {inquiry.cancelReason && (
                            <div className="border p-2 rounded-md col-span-2">
                              <p className="font-medium">Cancellation Reason</p>
                              <p>{inquiry.cancelReason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">You haven't made any pet inquiries yet.</p>
          <Button className="mt-4">Browse Pets</Button>
        </div>
      )}
    </div>
  );
};

export default PetInquiry;
