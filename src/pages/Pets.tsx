import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  type: string;
  image: string;
  description: string;
  available: boolean;
  fee?: number;
}

const mockPets: Pet[] = [
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
    image: "https://img.freepik.com/free-photo/beautiful-cat-with-fluffy-background_23-2150752750.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
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
    image: "https://img.freepik.com/premium-photo/portrait-cat-sitting-against-white-background_1048944-24102732.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
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
    image: "https://img.freepik.com/free-photo/dog-german-shepherd-lying-grass-park_8353-6406.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
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
    image: "https://img.freepik.com/premium-photo/beautiful-young-white-purebred-ragdoll-cat-with-blue-eyes-home_230573-3289.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
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
    image: "https://img.freepik.com/premium-photo/dog-dachshund-grass_78621-2721.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
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
    image: "https://img.freepik.com/free-photo/beautiful-white-cat-with-balls-indoors_23-2150752870.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
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
    image: "https://img.freepik.com/free-photo/adorable-portrait-pomeranian-dog_23-2151771743.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
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
    image: "https://images.unsplash.com/photo-1511275539165-cc46b1ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
    image: "https://img.freepik.com/premium-photo/funny-cat-oriental-basket-inside-easter-holiday_231786-3715.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Lily is a sweet rescue cat who has adjusted well to home life. She enjoys playing and napping in sunny spots.",
    available: true,
    fee: 1200
  }
];

const Pets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('All');
  
  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'All' || pet.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const inquireAboutPet = (petName: string) => {
    toast.success(`Inquiry sent about ${petName}. We'll contact you soon!`);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">Pets for Adoption</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet our adorable pets looking for a loving home. Browse through our selection and find your perfect companion.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search pets by name or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === 'All' ? 'default' : 'outline'}
            onClick={() => setFilterType('All')}
            className={filterType === 'All' ? 'bg-black text-white' : ''}
          >
            All
          </Button>
          <Button
            variant={filterType === 'Dog' ? 'default' : 'outline'}
            onClick={() => setFilterType('Dog')}
            className={filterType === 'Dog' ? 'bg-black text-white' : ''}
          >
            Dogs
          </Button>
          <Button
            variant={filterType === 'Cat' ? 'default' : 'outline'}
            onClick={() => setFilterType('Cat')}
            className={filterType === 'Cat' ? 'bg-black text-white' : ''}
          >
            Cats
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="w-full h-full object-cover"
                />
                {!pet.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Adopted</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                  <span className="text-pawtrack-orange font-medium">{pet.type}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{pet.breed} · {pet.age} years old</p>
                <p className="text-gray-600 mb-2 line-clamp-2">{pet.description}</p>
                {pet.fee && (
                  <p className="text-sm text-gray-500 mb-2">Adoption Fee: ₹{pet.fee}</p>
                )}
                <div className="flex space-x-2">
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    disabled={!pet.available}
                    onClick={() => inquireAboutPet(pet.name)}
                  >
                    {pet.available ? 'Inquire' : 'Not Available'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No pets found matching your search.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setFilterType('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;
