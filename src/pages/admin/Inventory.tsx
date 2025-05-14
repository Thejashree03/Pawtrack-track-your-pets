import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash, AlertTriangle, Upload, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatIndianRupees, safeFormatPrice } from '@/services/api';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  brand?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  image?: string;
  description?: string;
}

// Mock inventory data
const initialMockInventory: InventoryItem[] = [
  { id: 1, name: 'Premium Dog Food', category: 'Food', stock: 75, price: 2999, brand: 'PawTrack Essentials', manufacturingDate: '01/01/2025', expiryDate: '01/01/2027', image: "https://static.vecteezy.com/system/resources/thumbnails/050/033/263/small_2x/a-premium-bag-of-dog-food-is-opened-with-kibble-spilling-out-onto-a-smooth-light-surface-the-setting-is-bright-showcasing-contemporary-design-elements-photo.jpeg" },
  { id: 2, name: 'Cat Scratching Post', category: 'Furniture', stock: 12, price: 4599, brand: 'ScratchNFun', image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { id: 3, name: 'Dog Collar (Medium)', category: 'Accessories', stock: 32, price: 1550, brand: 'PetStyle', image: "https://images.unsplash.com/photo-1667716705760-233650f8f3fe?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nJTIwY29sbGFyfGVufDB8fDB8fHww" },
  { id: 4, name: 'Pet Carrier', category: 'Travel', stock: 8, price: 6500, brand: 'TravelPet', image: "https://img.freepik.com/premium-photo/single-image-animal-travel-pack-white-background_431161-31959.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740" },
  { id: 5, name: 'Interactive Cat Toy', category: 'Toys', stock: 5, price: 1299, brand: 'Play Pets', image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { id: 6, name: 'Fish Food Flakes', category: 'Food', stock: 45, price: 899, brand: 'AquaLife', manufacturingDate: '01/02/2025', expiryDate: '01/02/2027', image: "https://img.freepik.com/free-photo/still-life-pet-food-assortment_23-2148982365.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740" },
  { id: 7, name: 'Bird Cage (Large)', category: 'Housing', stock: 3, price: 8999, brand: 'BirdHome', image: "https://img.freepik.com/premium-photo/close-up-bird-cage_1048944-16308943.jpg?ga=GA1.1.830790952.1746684119&semt=ais_hybrid&w=740" },
  { id: 8, name: 'Dog Bed', category: 'Bedding', stock: 18, price: 4850, brand: 'Cozy Pets', image: "https://images.unsplash.com/photo-1541188495357-ad2dc89487f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0JTIwYmVkfGVufDB8fDB8fHww" },
];

// Indian Rupee component
const IndianRupeeIcon = ({ className }: { className?: string }) => (
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
    <path d="M6 3h12"></path>
    <path d="M6 8h12"></path>
    <path d="M6 13l6 8"></path>
    <path d="M18 13l-6 8"></path>
  </svg>
);

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mockInventory, setMockInventory] = useState<InventoryItem[]>(initialMockInventory);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    category: '',
    stock: 1,
    price: 0,
    brand: '',
    manufacturingDate: '',
    expiryDate: '',
    image: '',
    description: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(mockInventory.map(item => item.category)))];

  const handleAddItem = () => {
    setFormData({
      name: '',
      category: '',
      stock: 1,
      price: 0,
      brand: '',
      manufacturingDate: '',
      expiryDate: '',
      image: '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (id: number) => {
    const itemToEdit = mockInventory.find(item => item.id === id);
    if (itemToEdit) {
      setFormData({ ...itemToEdit });
      setIsDialogOpen(true);
    }
  };

  const handleDeleteItem = (id: number) => {
    setMockInventory(prev => prev.filter(item => item.id !== id));
    toast.success(`Inventory item with ID: ${id} has been deleted`);
  };

  const handleRestock = (id: number) => {
    setMockInventory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: item.stock + 20 };
      }
      return item;
    }));
    toast.success(`Restock order placed for item ID: ${id}`);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast.success('Product image uploaded successfully');
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newItem = {
      id: formData.id || mockInventory.length + 1,
      name: formData.name || '',
      category: formData.category || '',
      stock: formData.stock || 0,
      price: formData.price || 0,
      brand: formData.brand,
      manufacturingDate: formData.manufacturingDate,
      expiryDate: formData.expiryDate,
      image: formData.image,
      description: formData.description
    };
    
    if (formData.id) {
      // Editing existing item
      setMockInventory(prev => prev.map(item => (item.id === formData.id ? newItem : item)));
      toast.success(`Updated inventory item: ${newItem.name}`);
    } else {
      // Adding new item
      setMockInventory(prev => [...prev, newItem]);
      toast.success(`Added new inventory item: ${newItem.name}`);
    }
    
    setIsDialogOpen(false);
  };

  // Function to calculate total inventory value
  const calculateTotalValue = () => {
    return mockInventory.reduce((total, item) => total + (item.price * item.stock), 0);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-gray-500">Manage your product inventory and stock levels.</p>
        </div>
        <Button 
          className="mt-4 sm:mt-0 bg-pawtrack-blue hover:bg-pawtrack-blue-dark"
          onClick={handleAddItem}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-bold">{mockInventory.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                <p className="text-2xl font-bold">{mockInventory.filter(item => item.stock < 10).length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">{formatIndianRupees(calculateTotalValue())}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <IndianRupeeIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category} Category</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Info</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      {item.image ? (
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.brand && (
                          <p className="text-xs text-gray-500">Brand: {item.brand}</p>
                        )}
                        {item.manufacturingDate && (
                          <p className="text-xs text-gray-500">MFG: {item.manufacturingDate}</p>
                        )}
                        {item.expiryDate && (
                          <p className="text-xs text-gray-500">EXP: {item.expiryDate}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                        ${item.stock > 20 ? 'bg-green-100 text-green-800' : 
                        item.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                        {item.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{formatIndianRupees(item.price)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {item.stock < 10 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestock(item.id)}
                            className="hidden sm:inline-flex h-8"
                          >
                            Restock
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditItem(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredInventory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No inventory items found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand || ''}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(new Set(mockInventory.map(item => item.category)))
                      .filter(Boolean)
                      .map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Toys">Toys</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Grooming">Grooming</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock || ''}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
                <Input
                  id="manufacturingDate"
                  name="manufacturingDate"
                  value={formData.manufacturingDate || ''}
                  onChange={handleFormChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate || ''}
                  onChange={handleFormChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <div className="flex flex-col gap-2">
                {formData.image && (
                  <div className="w-full max-w-[150px] h-auto rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={formData.image} 
                      alt="Product preview" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
                <input
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <Button type="button" variant="outline" onClick={triggerFileInput}>
                  <Upload className="h-4 w-4 mr-1" /> Upload Image
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description || ''}
                onChange={handleFormChange}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {formData.id ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Package component definition
const Package = ({ className }: { className?: string }) => (
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
    <path d="M16.5 9.4l-9-5.19"></path>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
    <polyline points="3.29 7 12 12 20.71 7"></polyline>
    <line x1="12" y1="22" x2="12" y2="12"></line>
  </svg>
);

export default Inventory;
