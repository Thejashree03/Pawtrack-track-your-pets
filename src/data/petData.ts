
export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  type: string;
  image: string;
  description: string;
  available: boolean;
  fee: number;
}

export const petData: Pet[] = [
  {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.",
    available: true,
    fee: 2500
  },
  {
    id: 2,
    name: "Bella",
    breed: "Siamese",
    age: 2,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Bella is a gentle and affectionate Siamese cat who enjoys lounging in sunny spots and being petted.",
    available: true,
    fee: 1500
  },
  {
    id: 3,
    name: "Charlie",
    breed: "Beagle",
    age: 4,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Charlie is an adventurous Beagle with a keen sense of smell. He's great with children and other pets.",
    available: true,
    fee: 2000
  },
  {
    id: 4,
    name: "Luna",
    breed: "Maine Coon",
    age: 3,
    type: "Cat",
    image: "https://img.freepik.com/free-photo/beautiful-cat-with-fluffy-background_23-2150752750.jpg",
    description: "Luna is a majestic Maine Coon with a fluffy coat and friendly personality. She loves interactive toys.",
    available: false,
    fee: 3000
  },
  {
    id: 5,
    name: "Cooper",
    breed: "Labrador Retriever",
    age: 5,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Cooper is a loyal and intelligent Labrador who excels at obedience training and loves to swim.",
    available: true,
    fee: 2800
  },
  {
    id: 6,
    name: "Oliver",
    breed: "Scottish Fold",
    age: 2,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Oliver is a curious and playful Scottish Fold who enjoys exploring and chasing toys.",
    available: true,
    fee: 2500
  },
  {
    id: 7,
    name: "Daisy",
    breed: "Shih Tzu",
    age: 4,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Daisy is a sweet and affectionate Shih Tzu who loves cuddling and being around people.",
    available: true,
    fee: 3000
  },
  {
    id: 8,
    name: "Milo",
    breed: "Bengal",
    age: 1,
    type: "Cat",
    image: "https://img.freepik.com/premium-photo/portrait-cat-sitting-against-white-background_1048944-24102732.jpg",
    description: "Milo is an energetic Bengal cat with striking markings. He's playful and loves interactive toys.",
    available: true,
    fee: 4500
  },
  {
    id: 9,
    name: "Rocky",
    breed: "German Shepherd",
    age: 3,
    type: "Dog",
    image: "https://img.freepik.com/free-photo/dog-german-shepherd-lying-grass-park_8353-6406.jpg",
    description: "Rocky is a loyal and protective German Shepherd. He's intelligent and quick to learn commands.",
    available: true,
    fee: 3200
  },
  {
    id: 10,
    name: "Lucy",
    breed: "Ragdoll",
    age: 2,
    type: "Cat",
    image: "https://img.freepik.com/premium-photo/beautiful-young-white-purebred-ragdoll-cat-with-blue-eyes-home_230573-3289.jpg",
    description: "Lucy is a gentle Ragdoll who loves being held. She's known for her calm and docile temperament.",
    available: false,
    fee: 3800
  },
  {
    id: 11,
    name: "Bailey",
    breed: "Dachshund",
    age: 2,
    type: "Dog",
    image: "https://img.freepik.com/premium-photo/dog-dachshund-grass_78621-2721.jpg",
    description: "Bailey is a spirited Dachshund with a big personality. She's curious and loves to explore.",
    available: true,
    fee: 2200
  },
  {
    id: 12,
    name: "Simba",
    breed: "Persian",
    age: 4,
    type: "Cat",
    image: "https://img.freepik.com/free-photo/beautiful-white-cat-with-balls-indoors_23-2150752870.jpg",
    description: "Simba is a regal Persian cat with a luxurious coat. He enjoys a calm environment and gentle grooming.",
    available: true,
    fee: 3500
  },
  {
    id: 13,
    name: "Teddy",
    breed: "Pomeranian",
    age: 1,
    type: "Dog",
    image: "https://img.freepik.com/free-photo/adorable-portrait-pomeranian-dog_23-2151771743.jpg",
    description: "Teddy is a fluffy Pomeranian with an outgoing personality. He's energetic and loves attention.",
    available: true,
    fee: 4000
  },
  {
    id: 14,
    name: "Cleo",
    breed: "Sphynx",
    age: 3,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Cleo is a unique Sphynx cat who seeks warmth and affection. She's intelligent and very social.",
    available: true,
    fee: 5000
  },
  {
    id: 15,
    name: "Winston",
    breed: "French Bulldog",
    age: 2,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Winston is a charming French Bulldog with a playful spirit. He gets along well with other pets.",
    available: true,
    fee: 4500
  },
  {
    id: 16,
    name: "Shadow",
    breed: "Russian Blue",
    age: 5,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Shadow is a quiet and reserved Russian Blue who bonds deeply with his human. He enjoys peaceful environments.",
    available: false,
    fee: 2800
  },
  {
    id: 17,
    name: "Rosie",
    breed: "Cavalier King Charles Spaniel",
    age: 3,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Rosie is a sweet and gentle Cavalier who forms strong bonds with her humans. She loves cuddles.",
    available: true,
    fee: 3800
  },
  {
    id: 18,
    name: "Oscar",
    breed: "British Shorthair",
    age: 2,
    type: "Cat",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Oscar is an easygoing British Shorthair with a plush coat. He's independent but affectionate.",
    available: true,
    fee: 3200
  },
  {
    id: 19,
    name: "Buddy",
    breed: "Jack Russell Terrier",
    age: 4,
    type: "Dog",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Buddy is an energetic Jack Russell who needs plenty of exercise. He's intelligent and eager to please.",
    available: true,
    fee: 2500
  },
  {
    id: 20,
    name: "Lily",
    breed: "Domestic Shorthair",
    age: 2,
    type: "Cat",
    image: "https://img.freepik.com/premium-photo/funny-cat-oriental-basket-inside-easter-holiday_231786-3715.jpg",
    description: "Lily is a sweet rescue cat who has adjusted well to home life. She enjoys playing and napping in sunny spots.",
    available: true,
    fee: 1200
  }
];

// Sample pet inquiries data
export interface PetInquiry {
  id: string;
  userId: string;
  petId: number;
  userName: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'approved' | 'cancelled';
  cancelReason?: string;
  createdAt: string;
}

export const petInquiries: PetInquiry[] = [
  {
    id: "inq_1",
    userId: "user_1",
    petId: 1,
    userName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    message: "I'm interested in adopting Max. I have a spacious home with a yard.",
    status: "pending",
    createdAt: "2025-05-10T10:30:00Z"
  },
  {
    id: "inq_2",
    userId: "user_2",
    petId: 3,
    userName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "8765432109",
    message: "Charlie sounds like a perfect fit for our family. We have two kids who love dogs.",
    status: "approved",
    createdAt: "2025-05-09T14:15:00Z"
  },
  {
    id: "inq_3",
    userId: "user_3",
    petId: 5,
    userName: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "7654321098",
    message: "I'm looking for a Labrador like Cooper. I'm an active person and can take him for daily runs.",
    status: "cancelled",
    cancelReason: "Applicant withdrew inquiry due to travel plans",
    createdAt: "2025-05-08T09:45:00Z"
  },
  {
    id: "inq_4",
    userId: "user_4",
    petId: 2,
    userName: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "6543210987",
    message: "Bella seems like a calm cat which would fit well in my apartment. I work from home so can give her attention.",
    status: "pending",
    createdAt: "2025-05-07T16:20:00Z"
  },
  {
    id: "inq_5",
    userId: "user_5",
    petId: 7,
    userName: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "5432109876",
    message: "I've always wanted a Shih Tzu and Daisy sounds perfect. I have experience with small dogs.",
    status: "approved",
    createdAt: "2025-05-06T11:10:00Z"
  },
  {
    id: "inq_6",
    userId: "user_1",
    petId: 10,
    userName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    message: "Lucy seems like a gentle cat. I already have one cat and looking for a companion for her.",
    status: "pending",
    createdAt: "2025-05-05T13:40:00Z"
  }
];

// Sample users data
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  inquiriesCount: number;
  adoptionsCount: number;
}

export const userData: User[] = [
  {
    id: "user_1",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    joinDate: "2025-01-15",
    inquiriesCount: 2,
    adoptionsCount: 0
  },
  {
    id: "user_2",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    phone: "8765432109",
    joinDate: "2025-01-20",
    inquiriesCount: 1,
    adoptionsCount: 1
  },
  {
    id: "user_3",
    firstName: "Amit",
    lastName: "Kumar",
    email: "amit.kumar@example.com",
    phone: "7654321098",
    joinDate: "2025-01-25",
    inquiriesCount: 1,
    adoptionsCount: 0
  },
  {
    id: "user_4",
    firstName: "Neha",
    lastName: "Gupta",
    email: "neha.gupta@example.com",
    phone: "6543210987",
    joinDate: "2025-02-01",
    inquiriesCount: 1,
    adoptionsCount: 0
  },
  {
    id: "user_5",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@example.com",
    phone: "5432109876",
    joinDate: "2025-02-05",
    inquiriesCount: 1,
    adoptionsCount: 1
  }
];

// Sample order data
export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled' | 'processing';
  amount: number;
  products: number[];
  paymentType: 'cod';
}

export const orderData: Order[] = [
  {
    id: "ord_1001",
    customerId: "user_1",
    customerName: "Rahul Sharma",
    date: "2025-05-12",
    status: "pending",
    amount: 1850,
    products: [101, 103],
    paymentType: "cod"
  },
  {
    id: "ord_1002",
    customerId: "user_2",
    customerName: "Priya Patel",
    date: "2025-05-11",
    status: "delivered",
    amount: 2500,
    products: [102, 105, 108],
    paymentType: "cod"
  },
  {
    id: "ord_1003",
    customerId: "user_3",
    customerName: "Amit Kumar",
    date: "2025-05-10",
    status: "processing",
    amount: 3200,
    products: [104, 106],
    paymentType: "cod"
  },
  {
    id: "ord_1004",
    customerId: "user_4",
    customerName: "Neha Gupta",
    date: "2025-05-09",
    status: "cancelled",
    amount: 1200,
    products: [107],
    paymentType: "cod"
  },
  {
    id: "ord_1005",
    customerId: "user_5",
    customerName: "Vikram Singh",
    date: "2025-05-08",
    status: "delivered",
    amount: 4300,
    products: [101, 103, 109],
    paymentType: "cod"
  },
  {
    id: "ord_1006",
    customerId: "user_1",
    customerName: "Rahul Sharma",
    date: "2025-05-07",
    status: "delivered",
    amount: 2100,
    products: [102, 110],
    paymentType: "cod"
  }
];
