
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductDetail from '@/components/ProductDetail';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  brand?: string;
  manufacturingDate?: string;
  expiryDate?: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Food",
    price: 1299,
    image: "https://static.vecteezy.com/system/resources/thumbnails/050/033/263/small_2x/a-premium-bag-of-dog-food-is-opened-with-kibble-spilling-out-onto-a-smooth-light-surface-the-setting-is-bright-showcasing-contemporary-design-elements-photo.jpeg",
    description: "High-quality, nutritionally balanced dog food suitable for all breeds and ages.",
    inStock: true,
    brand: "PawTrack Essentials",
    manufacturingDate: "01/03/2025",
    expiryDate: "01/03/2027"
  },
  {
    id: 2,
    name: "Luxury Cat Bed",
    category: "Bedding",
    price: 1899,
    image: "https://images.unsplash.com/photo-1541188495357-ad2dc89487f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwYmVkfGVufDB8fDB8fHww",
    description: "Soft, comfortable bed for your feline friend with raised edges for security.",
    inStock: true,
    brand: "Cozy Pets",
    manufacturingDate: "15/02/2025",
    expiryDate: "N/A"
  },
  {
    id: 3,
    name: "Interactive Dog Toy",
    category: "Toys",
    price: 699,
    image: "https://images.unsplash.com/photo-1679689385005-8fe5edd03204?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Durable toy that dispenses treats and keeps your dog entertained for hours.",
    inStock: false,
    brand: "Play Pets",
    manufacturingDate: "05/01/2025",
    expiryDate: "N/A"
  },
  {
    id: 4,
    name: "Automatic Water Fountain",
    category: "Accessories",
    price: 1499,
    image: "https://thumbs.dreamstime.com/b/plastic-dog-water-fountain-filtration-system-automatic-plastic-dog-water-fountain-built-filtration-system-fresh-375125898.jpg",
    description: "Fresh flowing water to encourage pets to drink more and stay hydrated.",
    inStock: true,
    brand: "PetHydrate",
    manufacturingDate: "10/04/2025",
    expiryDate: "N/A"
  },
  {
    id: 5,
    name: "Cat Scratching Post",
    category: "Furniture",
    price: 1299,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Sturdy scratching post with a sisal surface to protect your furniture.",
    inStock: true,
    brand: "ScratchNFun",
    manufacturingDate: "22/03/2025",
    expiryDate: "N/A"
  },
  {
    id: 6,
    name: "Pet Grooming Kit",
    category: "Grooming",
    price: 999,
    image: "https://img.freepik.com/premium-photo/pet-grooming-kit-complete-with-brushes-combs-nail-clippers-allowing-owners-maintain-thei_1176614-34279.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Complete grooming set including brushes, combs, and nail clippers.",
    inStock: true,
    brand: "GroomPro",
    manufacturingDate: "15/02/2025",
    expiryDate: "N/A"
  },
  {
    id: 7,
    name: "Dog Collar with GPS",
    category: "Accessories",
    price: 2499,
    image: "https://images.unsplash.com/photo-1667716705760-233650f8f3fe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nJTIwY29sbGFyfGVufDB8fDB8fHww",
    description: "Smart collar with GPS tracking to always know where your pet is.",
    inStock: true,
    brand: "PetTrack",
    manufacturingDate: "01/03/2025",
    expiryDate: "N/A"
  },
  {
    id: 8,
    name: "Automatic Pet Feeder",
    category: "Accessories",
    price: 3499,
    image: "https://m.media-amazon.com/images/I/71AWGWHk9wL.jpg",
    description: "Programmable feeder that dispenses food on schedule for your pet.",
    inStock: true,
    brand: "AutoFeed",
    manufacturingDate: "20/01/2025",
    expiryDate: "N/A"
  },
  {
    id: 9,
    name: "Premium Cat Food",
    category: "Food",
    price: 1099,
    image: "https://img.freepik.com/free-photo/still-life-pet-food-assortment_23-2148982365.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Nutrient-rich food specially formulated for indoor cats.",
    inStock: true,
    brand: "PawTrack Essentials",
    manufacturingDate: "05/04/2025",
    expiryDate: "05/04/2027"
  },
  {
    id: 10,
    name: "Pet Training Clicker",
    category: "Training",
    price: 299,
    image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Essential tool for positive reinforcement training with your pet.",
    inStock: true,
    brand: "TrainRight",
    manufacturingDate: "10/02/2025",
    expiryDate: "N/A"
  },
  {
    id: 11,
    name: "Pet First Aid Kit",
    category: "Healthcare",
    price: 899,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Comprehensive first aid kit designed specifically for pets.",
    inStock: true,
    brand: "PetCare",
    manufacturingDate: "15/01/2025",
    expiryDate: "15/01/2028"
  },
  {
    id: 12,
    name: "Dog Rain Coat",
    category: "Clothing",
    price: 799,
    image: "https://img.freepik.com/free-photo/front-view-cute-dog-sitting_23-2148423669.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Waterproof coat to keep your dog dry during walks in the rain.",
    inStock: true,
    brand: "PetStyle",
    manufacturingDate: "01/02/2025",
    expiryDate: "N/A"
  },
  {
    id: 13,
    name: "Cat Tree Condo",
    category: "Furniture",
    price: 4999,
    image: "https://img.freepik.com/free-photo/adorable-ginger-maine-coon-kitten-is-relaxing-special-cat-s-equipment_613910-20403.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Multi-level cat tree with scratching posts, hideaways, and perches.",
    inStock: false,
    brand: "CatCastle",
    manufacturingDate: "10/03/2025",
    expiryDate: "N/A"
  },
  {
    id: 14,
    name: "Pet Dental Care Kit",
    category: "Healthcare",
    price: 549,
    image: "https://img.freepik.com/free-photo/boy-hygienic-accessories-blue-surface_23-2148116136.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Complete kit for maintaining your pet's oral hygiene.",
    inStock: true,
    brand: "DentalPet",
    manufacturingDate: "25/02/2025",
    expiryDate: "25/02/2027"
  },
  {
    id: 15,
    name: "Bird Cage",
    category: "Housing",
    price: 2299,
    image: "https://img.freepik.com/premium-photo/close-up-bird-cage_1048944-16308943.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Spacious cage for small to medium birds with multiple perches.",
    inStock: true,
    brand: "BirdHome",
    manufacturingDate: "05/03/2025",
    expiryDate: "N/A"
  },
  {
    id: 16,
    name: "Reptile Heat Lamp",
    category: "Accessories",
    price: 899,
    image: "https://m.media-amazon.com/images/I/51u+1JQgobL._AC_UY1000_.jpg",
    description: "Essential lamp to provide warmth for reptiles.",
    inStock: true,
    brand: "ReptiWarm",
    manufacturingDate: "01/04/2025",
    expiryDate: "N/A"
  },
  {
    id: 17,
    name: "Fish Tank Starter Kit",
    category: "Aquariums",
    price: 3699,
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Complete setup for beginners including tank, filter, and accessories.",
    inStock: true,
    brand: "AquaLife",
    manufacturingDate: "15/03/2025",
    expiryDate: "N/A"
  },
  {
    id: 18,
    name: "Pet Carrier Backpack",
    category: "Travel",
    price: 1999,
    image: "https://img.freepik.com/premium-photo/single-image-animal-travel-pack-white-background_431161-31959.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Comfortable carrier backpack for small pets during travel.",
    inStock: true,
    brand: "TravelPet",
    manufacturingDate: "10/02/2025",
    expiryDate: "N/A"
  },
  {
    id: 19,
    name: "Dog Training Treats",
    category: "Food",
    price: 449,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Delicious and healthy treats perfect for training sessions.",
    inStock: true,
    brand: "TreatPro",
    manufacturingDate: "01/04/2025",
    expiryDate: "01/04/2026"
  },
  {
    id: 20,
    name: "Pet Hair Remover",
    category: "Cleaning",
    price: 599,
    image: "https://img.freepik.com/premium-photo/dog-brush-isolated-pink-background_1187-160373.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740",
    description: "Effective tool for removing pet hair from furniture and clothing.",
    inStock: true,
    brand: "CleanPet",
    manufacturingDate: "20/03/2025",
    expiryDate: "N/A"
  }
];

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const { addToCart } = useCart();
  
  const categories = ['All', ...Array.from(new Set(mockProducts.map(product => product.category)))];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = categoryFilter === 'All' || product.category === categoryFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-2">Pet Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our selection of premium pet products, from food to toys and accessories.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={categoryFilter === category ? 'default' : 'outline'}
              onClick={() => setCategoryFilter(category)}
              className={categoryFilter === category ? 'bg-black text-white' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleProductClick(product)}>
              <div className="relative h-48">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <span className="text-pawtrack-orange font-medium">₹{product.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {selectedProduct && (
        <ProductDetail 
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
