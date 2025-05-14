
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { formatIndianRupees } from '@/services/api';

// Mock data for adoptions
const mockAdoptions = [

  {
    id: "ADT-001",
    petName: "Max",
    petType: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    status: "Available",
    fee: 2500,
    date: "2023-05-01",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-002",
    petName: "Bella",
    petType: "Cat",
    breed: "Siamese",
    age: "2 years",
    status: "Available",
    fee: 1500,
    date: "2023-05-02",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-003",
    petName: "Charlie",
    petType: "Dog",
    breed: "Beagle",
    age: "4 years",
    status: "Available",
    fee: 2000,
    date: "2023-05-03",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-004",
    petName: "Luna",
    petType: "Cat",
    breed: "Maine Coon",
    age: "3 years",
    status: "Pending",
    fee: 3000,
    date: "2023-05-04",
    image: "https://img.freepik.com/free-photo/beautiful-cat-with-fluffy-background_23-2150752750.jpg"
  },
  {
    id: "ADT-005",
    petName: "Cooper",
    petType: "Dog",
    breed: "Labrador Retriever",
    age: "5 years",
    status: "Available",
    fee: 2800,
    date: "2023-05-05",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-006",
    petName: "Oliver",
    petType: "Cat",
    breed: "Scottish Fold",
    age: "2 years",
    status: "Available",
    fee: 2500,
    date: "2023-05-06",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-007",
    petName: "Daisy",
    petType: "Dog",
    breed: "Shih Tzu",
    age: "4 years",
    status: "Available",
    fee: 3000,
    date: "2023-05-07",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-008",
    petName: "Milo",
    petType: "Cat",
    breed: "Bengal",
    age: "1 year",
    status: "Available",
    fee: 4500,
    date: "2023-05-08",
    image: "https://img.freepik.com/premium-photo/portrait-cat-sitting-against-white-background_1048944-24102732.jpg"
  },
  {
    id: "ADT-009",
    petName: "Rocky",
    petType: "Dog",
    breed: "German Shepherd",
    age: "3 years",
    status: "Available",
    fee: 3200,
    date: "2023-05-09",
    image: "https://img.freepik.com/free-photo/dog-german-shepherd-lying-grass-park_8353-6406.jpg"
  },
  {
    id: "ADT-010",
    petName: "Lucy",
    petType: "Cat",
    breed: "Ragdoll",
    age: "2 years",
    status: "Pending",
    fee: 3800,
    date: "2023-05-10",
    image: "https://img.freepik.com/premium-photo/beautiful-young-white-purebred-ragdoll-cat-with-blue-eyes-home_230573-3289.jpg"
  },
  {
    id: "ADT-011",
    petName: "Bailey",
    petType: "Dog",
    breed: "Dachshund",
    age: "2 years",
    status: "Available",
    fee: 2200,
    date: "2023-05-11",
    image: "https://img.freepik.com/premium-photo/dog-dachshund-grass_78621-2721.jpg"
  },
  {
    id: "ADT-012",
    petName: "Simba",
    petType: "Cat",
    breed: "Persian",
    age: "4 years",
    status: "Available",
    fee: 3500,
    date: "2023-05-12",
    image: "https://img.freepik.com/free-photo/beautiful-white-cat-with-balls-indoors_23-2150752870.jpg"
  },
  {
    id: "ADT-013",
    petName: "Teddy",
    petType: "Dog",
    breed: "Pomeranian",
    age: "1 year",
    status: "Available",
    fee: 4000,
    date: "2023-05-13",
    image: "https://img.freepik.com/free-photo/adorable-portrait-pomeranian-dog_23-2151771743.jpg"
  },
  {
    id: "ADT-014",
    petName: "Cleo",
    petType: "Cat",
    breed: "Sphynx",
    age: "3 years",
    status: "Available",
    fee: 5000,
    date: "2023-05-14",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-015",
    petName: "Winston",
    petType: "Dog",
    breed: "French Bulldog",
    age: "2 years",
    status: "Available",
    fee: 4500,
    date: "2023-05-15",
    image: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-016",
    petName: "Shadow",
    petType: "Cat",
    breed: "Russian Blue",
    age: "5 years",
    status: "Pending",
    fee: 2800,
    date: "2023-05-16",
    image: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-017",
    petName: "Rosie",
    petType: "Dog",
    breed: "Cavalier King Charles Spaniel",
    age: "3 years",
    status: "Available",
    fee: 3800,
    date: "2023-05-17",
    image: "https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-018",
    petName: "Oscar",
    petType: "Cat",
    breed: "British Shorthair",
    age: "2 years",
    status: "Available",
    fee: 3200,
    date: "2023-05-18",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-019",
    petName: "Buddy",
    petType: "Dog",
    breed: "Jack Russell Terrier",
    age: "4 years",
    status: "Available",
    fee: 2500,
    date: "2023-05-19",
    image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "ADT-020",
    petName: "Lily",
    petType: "Cat",
    breed: "Domestic Shorthair",
    age: "2 years",
    status: "Available",
    fee: 1200,
    date: "2023-05-20",
    image: "https://img.freepik.com/premium-photo/funny-cat-oriental-basket-inside-easter-holiday_231786-3715.jpg"
  }

];

const Adoptions: React.FC = () => {
  const [adoptions, setAdoptions] = useState(mockAdoptions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdoption, setSelectedAdoption] = useState<any>(null);
  const [newAdoption, setNewAdoption] = useState({
    petName: "",
    petType: "Dog",
    breed: "",
    age: "",
    status: "Available",
    fee: 0,
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const filteredAdoptions = adoptions.filter(
    (adoption) =>
      adoption.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adoption.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adoption.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adoption.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddAdoption = () => {
    const newId = `ADT-${String(adoptions.length + 1).padStart(3, "0")}`;
    const currentDate = new Date().toISOString().split("T")[0];
    
    const adoptionToAdd = {
      ...newAdoption,
      id: newId,
      date: currentDate,
      image: newAdoption.image || "https://placekitten.com/100/100",
    };
    
    setAdoptions([...adoptions, adoptionToAdd]);
    setNewAdoption({
      petName: "",
      petType: "Dog",
      breed: "",
      age: "",
      status: "Available",
      fee: 0,
      image: "",
    });
    
    toast({
      title: "Adoption Added",
      description: `Pet ${adoptionToAdd.petName} has been added for adoption`,
    });
  };

  const handleUpdateAdoption = () => {
    if (!selectedAdoption) return;
    
    const updatedAdoptions = adoptions.map((adoption) =>
      adoption.id === selectedAdoption.id ? selectedAdoption : adoption
    );
    
    setAdoptions(updatedAdoptions);
    setSelectedAdoption(null);
    setIsEditing(false);
    
    toast({
      title: "Adoption Updated",
      description: `Pet ${selectedAdoption.petName}'s information has been updated`,
    });
  };

  const handleDeleteAdoption = (id: string) => {
    const updatedAdoptions = adoptions.filter((adoption) => adoption.id !== id);
    setAdoptions(updatedAdoptions);
    
    toast({
      title: "Adoption Removed",
      description: "The pet has been removed from adoption listings",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "Adopted":
        return <Badge className="bg-blue-500">Adopted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Adoption Management</h1>
        <p className="text-gray-500">Manage pet adoptions and their status.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search pets..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus size={18} className="mr-2" />
              Add New Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Pet for Adoption</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="petName">Pet Name</Label>
                  <Input
                    id="petName"
                    value={newAdoption.petName}
                    onChange={(e) => setNewAdoption({ ...newAdoption, petName: e.target.value })}
                    placeholder="Enter pet name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="petType">Pet Type</Label>
                  <Select
                    value={newAdoption.petType}
                    onValueChange={(value) => setNewAdoption({ ...newAdoption, petType: value })}
                  >
                    <SelectTrigger id="petType">
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Bird">Bird</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    value={newAdoption.breed}
                    onChange={(e) => setNewAdoption({ ...newAdoption, breed: e.target.value })}
                    placeholder="Enter breed"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    value={newAdoption.age}
                    onChange={(e) => setNewAdoption({ ...newAdoption, age: e.target.value })}
                    placeholder="e.g. 2 years"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newAdoption.status}
                    onValueChange={(value) => setNewAdoption({ ...newAdoption, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Adopted">Adopted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fee">Adoption Fee (₹)</Label>
                  <Input
                    id="fee"
                    type="number"
                    value={newAdoption.fee.toString()}
                    onChange={(e) => setNewAdoption({ ...newAdoption, fee: parseInt(e.target.value) || 0 })}
                    placeholder="Enter fee amount"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="image">Pet Image URL</Label>
                <Input
                  id="image"
                  value={newAdoption.image}
                  onChange={(e) => setNewAdoption({ ...newAdoption, image: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" onClick={handleAddAdoption}>Add Pet</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Pet Adoptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Listed Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdoptions.length > 0 ? (
                  filteredAdoptions.map((adoption) => (
                    <TableRow key={adoption.id}>
                      <TableCell className="font-medium">{adoption.id}</TableCell>
                      <TableCell>
                        <img
                          src={adoption.image}
                          alt={adoption.petName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>{adoption.petName}</TableCell>
                      <TableCell>{adoption.petType}</TableCell>
                      <TableCell>{adoption.breed}</TableCell>
                      <TableCell>{adoption.age}</TableCell>
                      <TableCell>{getStatusBadge(adoption.status)}</TableCell>
                      <TableCell>{formatIndianRupees(adoption.fee)}</TableCell>
                      <TableCell>{adoption.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedAdoption(adoption);
                                  setIsEditing(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {selectedAdoption && isEditing && (
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Pet Adoption</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="edit-petName">Pet Name</Label>
                                      <Input
                                        id="edit-petName"
                                        value={selectedAdoption.petName}
                                        onChange={(e) => setSelectedAdoption({ ...selectedAdoption, petName: e.target.value })}
                                      />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="edit-petType">Pet Type</Label>
                                      <Select
                                        value={selectedAdoption.petType}
                                        onValueChange={(value) => setSelectedAdoption({ ...selectedAdoption, petType: value })}
                                      >
                                        <SelectTrigger id="edit-petType">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Dog">Dog</SelectItem>
                                          <SelectItem value="Cat">Cat</SelectItem>
                                          <SelectItem value="Bird">Bird</SelectItem>
                                          <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="edit-breed">Breed</Label>
                                      <Input
                                        id="edit-breed"
                                        value={selectedAdoption.breed}
                                        onChange={(e) => setSelectedAdoption({ ...selectedAdoption, breed: e.target.value })}
                                      />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="edit-age">Age</Label>
                                      <Input
                                        id="edit-age"
                                        value={selectedAdoption.age}
                                        onChange={(e) => setSelectedAdoption({ ...selectedAdoption, age: e.target.value })}
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="edit-status">Status</Label>
                                      <Select
                                        value={selectedAdoption.status}
                                        onValueChange={(value) => setSelectedAdoption({ ...selectedAdoption, status: value })}
                                      >
                                        <SelectTrigger id="edit-status">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Available">Available</SelectItem>
                                          <SelectItem value="Pending">Pending</SelectItem>
                                          <SelectItem value="Adopted">Adopted</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="edit-fee">Adoption Fee (₹)</Label>
                                      <Input
                                        id="edit-fee"
                                        type="number"
                                        value={selectedAdoption.fee.toString()}
                                        onChange={(e) => setSelectedAdoption({ ...selectedAdoption, fee: parseInt(e.target.value) || 0 })}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-image">Pet Image URL</Label>
                                    <Input
                                      id="edit-image"
                                      value={selectedAdoption.image}
                                      onChange={(e) => setSelectedAdoption({ ...selectedAdoption, image: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <DialogClose asChild>
                                    <Button type="button" onClick={handleUpdateAdoption}>
                                      Update
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>

                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:border-red-200"
                            onClick={() => handleDeleteAdoption(adoption.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setSelectedAdoption(adoption)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {selectedAdoption && !isEditing && (
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Pet Details</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col items-center py-4">
                                  <img
                                    src={selectedAdoption.image}
                                    alt={selectedAdoption.petName}
                                    className="h-32 w-32 rounded-full object-cover mb-4"
                                  />
                                  <h3 className="text-xl font-bold">{selectedAdoption.petName}</h3>
                                  <p className="text-gray-500">{selectedAdoption.breed} {selectedAdoption.petType}</p>

                                  <div className="grid grid-cols-2 gap-4 w-full mt-4">
                                    <div className="border rounded p-3">
                                      <p className="text-sm text-gray-500">Age</p>
                                      <p className="font-medium">{selectedAdoption.age}</p>
                                    </div>
                                    <div className="border rounded p-3">
                                      <p className="text-sm text-gray-500">Status</p>
                                      <div>{getStatusBadge(selectedAdoption.status)}</div>
                                    </div>
                                    <div className="border rounded p-3">
                                      <p className="text-sm text-gray-500">Adoption Fee</p>
                                      <p className="font-medium">{formatIndianRupees(selectedAdoption.fee)}</p>
                                    </div>
                                    <div className="border rounded p-3">
                                      <p className="text-sm text-gray-500">Listed Date</p>
                                      <p className="font-medium">{selectedAdoption.date}</p>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button type="button">Close</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-6 text-gray-500">
                      No adoption entries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Adoptions;
