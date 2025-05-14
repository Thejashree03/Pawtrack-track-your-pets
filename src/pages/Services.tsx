import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Calendar, Phone, Mail, Star, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingForm from '@/components/BookingForm';
import PaymentOptions from '@/components/PaymentOptions';

interface Service {
  id: number;
  name: string;
  icon: string;
  description: string;
  price: string;
  priceAmount: number;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    name: "Basic Grooming",
    icon: "🧼",
    description: "Essential grooming service for your pet's hygiene and comfort.",
    price: "₹800",
    priceAmount: 800,
    features: [
      "Bath with premium pet shampoo",
      "Brush out & blow dry",
      "Nail trimming",
      "Ear cleaning",
      "30-minute session"
    ]
  },
  {
    id: 2,
    name: "Premium Grooming",
    icon: "✂️",
    description: "Complete grooming package to keep your pet looking and feeling their best.",
    price: "₹1,500",
    priceAmount: 1500,
    features: [
      "All Basic Grooming services",
      "Haircut & styling",
      "Teeth brushing",
      "Paw pad trimming",
      "Scented finishing spray",
      "60-minute session"
    ]
  },
  {
    id: 3,
    name: "Dog Walking",
    icon: "🦮",
    description: "Regular exercise to keep your dog healthy and happy.",
    price: "₹350/walk",
    priceAmount: 350,
    features: [
      "30-minute walks",
      "Flexible scheduling",
      "GPS tracking",
      "Post-walk report",
      "Fresh water provided"
    ]
  },
  {
    id: 4,
    name: "Pet Sitting",
    icon: "🏠",
    description: "In-home care when you're away, keeping your pet comfortable in familiar surroundings.",
    price: "₹1,200/day",
    priceAmount: 1200,
    features: [
      "Feeding & water refreshment",
      "Medication administration",
      "Playtime & exercise",
      "Litter box/waste cleanup",
      "Daily updates with photos"
    ]
  },
  {
    id: 5,
    name: "Veterinary Check-up",
    icon: "🩺",
    description: "Routine health examination by our licensed veterinarians.",
    price: "₹1,800",
    priceAmount: 1800,
    features: [
      "Physical examination",
      "Weight monitoring",
      "Vaccination review",
      "Dental check",
      "Nutritional consultation",
      "45-minute appointment"
    ]
  },
  {
    id: 6,
    name: "Training Sessions",
    icon: "🏆",
    description: "Professional training to address behavior issues or teach new skills.",
    price: "₹1,500/session",
    priceAmount: 1500,
    features: [
      "Personalized training plan",
      "Basic commands",
      "Behavior modification",
      "Positive reinforcement techniques",
      "Progress tracking",
      "60-minute session"
    ]
  },
  {
    id: 7,
    name: "Pet Photography",
    icon: "📸",
    description: "Professional photoshoot for your pets to capture their unique personality.",
    price: "₹2,500/session",
    priceAmount: 2500,
    features: [
      "Studio or outdoor setting",
      "Multiple poses and setups",
      "Professional editing",
      "10 digital photos included",
      "Additional prints available",
      "90-minute session"
    ]
  },
  {
    id: 8,
    name: "Pet Taxi",
    icon: "🚕",
    description: "Safe and reliable transportation for your pet to vet appointments, grooming, or other destinations.",
    price: "₹400/trip",
    priceAmount: 400,
    features: [
      "Secure pet carriers provided",
      "Climate-controlled vehicle",
      "Professional pet handler",
      "Door-to-door service",
      "Flexible scheduling"
    ]
  },
  {
    id: 9,
    name: "Dental Cleaning",
    icon: "🦷",
    description: "Professional cleaning to maintain your pet's oral health and prevent dental issues.",
    price: "₹2,000",
    priceAmount: 2000,
    features: [
      "Tartar removal",
      "Tooth polishing",
      "Gum assessment",
      "Breath freshening",
      "Preventative recommendations",
      "45-minute procedure"
    ]
  },
  {
    id: 10,
    name: "Nutrition Consultation",
    icon: "🥗",
    description: "Expert advice on your pet's dietary needs for optimal health and wellness.",
    price: "₹1,200",
    priceAmount: 1200,
    features: [
      "Diet assessment",
      "Weight management plan",
      "Allergy considerations",
      "Supplement recommendations",
      "Follow-up consultation",
      "60-minute session"
    ]
  },
  {
    id: 11,
    name: "Microchipping",
    icon: "💻",
    description: "Permanent identification for your pet's safety and your peace of mind.",
    price: "₹900",
    priceAmount: 900,
    features: [
      "Quick and painless procedure",
      "Lifetime registration",
      "Improved chances of reunion if lost",
      "Digital record keeping",
      "ID card for owner"
    ]
  },
  {
    id: 12,
    name: "Flea & Tick Treatment",
    icon: "🦟",
    description: "Effective treatment to eliminate and prevent parasites on your pet.",
    price: "₹700",
    priceAmount: 700,
    features: [
      "Topical application",
      "Safe for most pets",
      "Preventative protection",
      "Home environment recommendations",
      "Follow-up treatment plan"
    ]
  },
  {
    id: 13,
    name: "Pet Birthday Party",
    icon: "🎂",
    description: "Celebrate your fur baby's special day with a customized pet party.",
    price: "₹3,500",
    priceAmount: 3500,
    features: [
      "Decorated party space",
      "Pet-safe cake and treats",
      "Games and activities",
      "Party favors for pet guests",
      "Professional photography",
      "2-hour event"
    ]
  },
  {
    id: 14,
    name: "Behavior Assessment",
    icon: "🔍",
    description: "Expert evaluation of your pet's behavior to address concerns and improve their quality of life.",
    price: "₹2,200",
    priceAmount: 2200,
    features: [
      "In-home assessment",
      "Problem behavior identification",
      "Trigger analysis",
      "Customized behavior modification plan",
      "Follow-up support",
      "90-minute session"
    ]
  },
  {
    id: 15,
    name: "Pet Massage Therapy",
    icon: "💆",
    description: "Therapeutic massage to improve your pet's circulation, flexibility, and overall wellbeing.",
    price: "₹900/session",
    priceAmount: 900,
    features: [
      "Stress reduction techniques",
      "Joint mobility improvement",
      "Muscle tension relief",
      "Circulation enhancement",
      "Relaxation promotion",
      "45-minute session"
    ]
  }
];

const Services: React.FC = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const bookService = (service: Service) => {
    setSelectedService(service);
    setIsPaymentOpen(true);
  };

  const bookAppointment = () => {
    setIsBookingFormOpen(true);
  };

  const handlePaymentComplete = () => {
    setIsPaymentOpen(false);
    toast.success(`Booking confirmed for ${selectedService?.name}!`);
    toast.success("Confirmation email has been sent to your registered email address");
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional pet care services to keep your furry friends healthy, happy, and looking their best.
        </p>
      </div>
      
      <div className="mb-12 bg-gradient-to-r from-black to-gray-800 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Book a Veterinary Consultation</h2>
        <p className="mb-4 max-w-2xl mx-auto">
          Our experienced veterinarians provide comprehensive care for your pets. Schedule a check-up today!
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Calendar className="h-5 w-5" />
            <span>Appointments 7 days a week</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <Star className="h-5 w-5" />
            <span>Expert veterinarians</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <AlertCircle className="h-5 w-5" />
            <span>Emergency services available</span>
          </div>
        </div>
        <Button 
          onClick={bookAppointment}
          className="bg-white text-black hover:bg-gray-200"
        >
          Book an Appointment
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <span className="text-4xl mb-2 block">{service.icon}</span>
                <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                <p className="text-pawtrack-orange font-bold text-xl mt-2">{service.price}</p>
              </div>
              
              <p className="text-gray-600 mb-4 text-center">{service.description}</p>
              
              <ul className="mb-6 space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-pawtrack-blue mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center py-10 bg-pawtrack-blue/10 rounded-lg">
        <h3 className="text-xl font-bold mb-2">For services booking and inquiries</h3>
        <p className="text-lg mb-4">Visit PawTrack Solutions to book your service</p>
        {/* <p className="text-gray-600">Contact us at <span className="font-semibold">contact@pawtrack.com</span> or call <span className="font-semibold">+91 98765 43210</span></p> */}
      </div>
      
      <Dialog>
        <div className="mt-12 bg-pawtrack-blue/10 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Custom Pet Care Plans</h2>
          <p className="text-gray-600 mb-4">
            Need a customized care plan for your pet? Contact us to discuss your specific requirements and we'll tailor our services to meet your needs.
          </p>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-black hover:text-white"
            >
              Contact Us
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Information</DialogTitle>
            <DialogDescription>
              Reach out to us through any of these channels
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-pawtrack-blue/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-pawtrack-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">+91 98765 43210</p>
                <p className="text-xs text-muted-foreground">Available Mon-Sat, 9am-7pm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-pawtrack-blue/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-pawtrack-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">contact@pawtrack.com</p>
                <p className="text-xs text-muted-foreground">We typically respond within 24 hours</p>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-medium">PawTrack Pet Care Center</p>
              <p className="text-sm text-gray-600">123 Pet Avenue, Bangalore</p>
              <p className="text-sm text-gray-600">Karnataka, India - 560001</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => toast.success("We'll contact you soon!")}>
              Request Callback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <BookingForm 
        isOpen={isBookingFormOpen} 
        onClose={() => setIsBookingFormOpen(false)}
      />

      {selectedService && (
        <PaymentOptions
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          onCompletePayment={handlePaymentComplete}
          totalAmount={selectedService.priceAmount}
        />
      )}
    </div>
  );
};

export default Services;
