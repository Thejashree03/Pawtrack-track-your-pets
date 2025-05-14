
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"; // Add Badge import
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Home, Plus, Edit, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface AddressManagerProps {
  className?: string;
  onSelectAddress?: (address: Address) => void;
  showSelect?: boolean;
}

const AddressManager: React.FC<AddressManagerProps> = ({ 
  className,
  onSelectAddress,
  showSelect = false
}) => {
  const { user } = useAuth();

  // Mock addresses for the user
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr_1",
      name: "Home Address",
      addressLine1: "123 Main Street",
      addressLine2: "Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
      isDefault: true
    },
    {
      id: "addr_2",
      name: "Office Address",
      addressLine1: "456 Business Park",
      addressLine2: "Building C, Floor 5",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400051",
      country: "India",
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.addressLine1 || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAddressItem: Address = {
      ...newAddress,
      id: `addr_${Date.now()}`,
      isDefault: addresses.length === 0 // Make first address default
    };

    setAddresses([...addresses, newAddressItem]);
    toast.success("Address added successfully");
    setIsAddingNew(false);
    resetNewAddress();
  };

  const handleUpdateAddress = () => {
    if (!editingAddress) return;

    const updatedAddresses = addresses.map(addr => 
      addr.id === editingAddress.id ? editingAddress : addr
    );
    
    setAddresses(updatedAddresses);
    toast.success("Address updated successfully");
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    const deletedAddress = addresses.find(addr => addr.id === id);
    const isDefault = deletedAddress?.isDefault || false;
    
    const filteredAddresses = addresses.filter(addr => addr.id !== id);
    
    // If we deleted the default address, make the first one default
    if (isDefault && filteredAddresses.length > 0) {
      filteredAddresses[0].isDefault = true;
    }
    
    setAddresses(filteredAddresses);
    toast.success("Address removed successfully");
  };

  const handleSetAsDefault = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    setAddresses(updatedAddresses);
    toast.success("Default address updated");
  };

  const resetNewAddress = () => {
    setNewAddress({
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    });
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Addresses</h2>
        <Dialog onOpenChange={(open) => {
          if (open) {
            setIsAddingNew(true);
            resetNewAddress();
          } else {
            setIsAddingNew(false);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add New Address</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="name">Address Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Home, Office, etc."
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="addressLine1">Address Line 1*</Label>
                <Input
                  id="addressLine1"
                  placeholder="Street address, building name"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({...newAddress, addressLine1: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  placeholder="Apartment, suite, unit, etc."
                  value={newAddress.addressLine2 || ''}
                  onChange={(e) => setNewAddress({...newAddress, addressLine2: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="city">City*</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="state">State*</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="postalCode">Postal Code*</Label>
                  <Input
                    id="postalCode"
                    placeholder="Postal Code"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="country">Country*</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                    disabled
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddAddress}>Save Address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <Card key={address.id} className={`overflow-hidden ${address.isDefault ? 'border-green-500 border-2' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex gap-2 items-center">
                    <Home className="h-5 w-5" />
                    {address.name}
                  </CardTitle>
                  {address.isDefault && (
                    <Badge className="bg-green-500">Default</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{address.addressLine1}</p>
                {address.addressLine2 && <p className="text-sm">{address.addressLine2}</p>}
                <p className="text-sm">{address.city}, {address.state} {address.postalCode}</p>
                <p className="text-sm">{address.country}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  {!address.isDefault && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSetAsDefault(address.id)}
                      className="text-sm"
                    >
                      <Check className="h-4 w-4 mr-1" /> Set as default
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  {showSelect && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => onSelectAddress && onSelectAddress(address)}
                    >
                      Select
                    </Button>
                  )}
                  <Dialog onOpenChange={(open) => {
                    if (open) {
                      setEditingAddress(address);
                    } else if (!open && editingAddress?.id === address.id) {
                      setEditingAddress(null);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Address</DialogTitle>
                      </DialogHeader>
                      {editingAddress && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="edit-name">Address Name</Label>
                            <Input
                              id="edit-name"
                              value={editingAddress.name}
                              onChange={(e) => setEditingAddress({...editingAddress, name: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="edit-line1">Address Line 1</Label>
                            <Input
                              id="edit-line1"
                              value={editingAddress.addressLine1}
                              onChange={(e) => setEditingAddress({...editingAddress, addressLine1: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="edit-line2">Address Line 2</Label>
                            <Input
                              id="edit-line2"
                              value={editingAddress.addressLine2 || ''}
                              onChange={(e) => setEditingAddress({...editingAddress, addressLine2: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-1 gap-2">
                              <Label htmlFor="edit-city">City</Label>
                              <Input
                                id="edit-city"
                                value={editingAddress.city}
                                onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <Label htmlFor="edit-state">State</Label>
                              <Input
                                id="edit-state"
                                value={editingAddress.state}
                                onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-1 gap-2">
                              <Label htmlFor="edit-postal">Postal Code</Label>
                              <Input
                                id="edit-postal"
                                value={editingAddress.postalCode}
                                onChange={(e) => setEditingAddress({...editingAddress, postalCode: e.target.value})}
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <Label htmlFor="edit-country">Country</Label>
                              <Input
                                id="edit-country"
                                value={editingAddress.country}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleUpdateAddress}>Update</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteAddress(address.id)}
                    disabled={addresses.length === 1} // Prevent deleting the last address
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">You don't have any saved addresses.</p>
            <Dialog onOpenChange={(open) => {
              if (open) {
                setIsAddingNew(true);
                resetNewAddress();
              } else {
                setIsAddingNew(false);
              }
            }}>
              <DialogTrigger asChild>
                <Button>Add Your First Address</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                {/* Same dialog content as above */}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManager;
