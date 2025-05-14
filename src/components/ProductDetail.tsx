
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Edit2, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
}

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
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
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({
    username: '',
    rating: 5,
    comment: ''
  });
  
  // Mock customer reviews - we'll add state to make this dynamic
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, username: 'PetLover123', rating: 5, comment: 'My dog loves this! Great quality product.' },
    { id: 2, username: 'CatMom', rating: 4, comment: 'Good value for money, my cat is very happy.' },
    { id: 3, username: 'DogDad42', rating: 5, comment: 'Excellent product, highly recommend!' },
  ]);

  const handleAddReview = () => {
    if (!newReview.username || !newReview.comment) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (isEditing && editingReviewId) {
      // Update existing review
      const updatedReviews = reviews.map(review => 
        review.id === editingReviewId ? 
          { ...review, username: newReview.username, rating: newReview.rating, comment: newReview.comment } : 
          review
      );
      
      setReviews(updatedReviews);
      toast.success('Review updated successfully!');
    } else {
      // Add new review
      const reviewToAdd = {
        id: reviews.length + 1,
        username: newReview.username,
        rating: newReview.rating,
        comment: newReview.comment
      };
      
      setReviews([...reviews, reviewToAdd]);
      toast.success('Review added successfully!');
    }
    
    // Reset form
    setNewReview({ username: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    setIsEditing(false);
    setEditingReviewId(null);
  };

  const handleEditReview = (review: Review) => {
    setNewReview({
      username: review.username,
      rating: review.rating,
      comment: review.comment
    });
    setIsEditing(true);
    setEditingReviewId(review.id);
    setShowReviewForm(true);
  };

  const handleDeleteReview = (reviewId: number) => {
    const filteredReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(filteredReviews);
    toast.success('Review deleted successfully!');
  };

  const cancelReviewForm = () => {
    setNewReview({ username: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    setIsEditing(false);
    setEditingReviewId(null);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="rounded-lg overflow-hidden h-64 md:h-80">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-pawtrack-orange">₹{product.price}</p>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
              {product.category}
            </span>
            
            {product.brand && (
              <p className="mt-4"><span className="font-semibold">Brand:</span> {product.brand || 'PawTrack Premium'}</p>
            )}
            
            {product.manufacturingDate && (
              <p className="mt-1"><span className="font-semibold">Manufacturing Date:</span> {product.manufacturingDate || '01/01/2025'}</p>
            )}
            
            {product.expiryDate && (
              <p className="mt-1"><span className="font-semibold">Expiry Date:</span> {product.expiryDate || '01/01/2027'}</p>
            )}
            
            <p className="mt-4">{product.description}</p>
            
            <div className="mt-6">
              <Button 
                className={`w-full ${!product.inStock ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} text-white`}
                onClick={() => {
                  if (product.inStock) {
                    addToCart(product);
                  }
                }}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Customer Reviews</h3>
            <Button 
              variant="outline" 
              onClick={() => {
                if (showReviewForm && isEditing) {
                  cancelReviewForm();
                } else {
                  setShowReviewForm(!showReviewForm);
                  if (isEditing) {
                    setIsEditing(false);
                    setNewReview({ username: '', rating: 5, comment: '' });
                  }
                }
              }}
              size="sm"
            >
              {showReviewForm ? (isEditing ? 'Cancel Edit' : 'Cancel') : 'Add Review'}
            </Button>
          </div>
          
          {showReviewForm && (
            <div className="p-4 bg-gray-50 rounded-lg mb-6 border">
              <h4 className="font-medium mb-3">{isEditing ? 'Edit Review' : 'Write a Review'}</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Your Name</Label>
                  <Input 
                    id="username"
                    value={newReview.username}
                    onChange={(e) => setNewReview({...newReview, username: e.target.value})}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`h-6 w-6 ${star <= newReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="comment">Your Review</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Share your experience with this product..."
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddReview} className="bg-black hover:bg-gray-800 text-white">
                    {isEditing ? 'Update Review' : 'Submit Review'}
                  </Button>
                  {isEditing && (
                    <Button onClick={cancelReviewForm} variant="outline">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.username}</span>
                  <div className="flex items-center">
                    <div className="flex mr-3">
                      {Array(review.rating).fill(0).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      {Array(5 - review.rating).fill(0).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleEditReview(review)}
                      >
                        <Edit2 className="h-4 w-4 text-gray-500 hover:text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
