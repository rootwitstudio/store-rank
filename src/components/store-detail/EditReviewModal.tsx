"use client";

import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReviewStore, Review } from "@/stores/reviewStore";

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review;
}

export function EditReviewModal({ isOpen, onClose, review }: EditReviewModalProps) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [title, setTitle] = useState(review.title);
  const [attachments, setAttachments] = useState(review.attachments.join(', '));

  const { updateReview, editReview } = useReviewStore();

  // Auto-populate title based on comment
  useEffect(() => {
    if (comment.trim()) {
      const words = comment.trim().split(' ');
      const titleWords = words.slice(0, 5).join(' '); // Take first 5 words
      setTitle(titleWords + (words.length > 5 ? '...' : ''));
    }
  }, [comment]);

  // Reset form when review changes
  useEffect(() => {
    setRating(review.rating);
    setComment(review.comment);
    setTitle(review.title);
    setAttachments(review.attachments.join(', '));
  }, [review]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get auth token
    const token = localStorage.getItem('authToken') || '';
    
    const reviewData = {
      title,
      comment,
      rating,
      attachments: attachments ? attachments.split(', ').map(s => s.trim()).filter(Boolean) : [],
    };

    const success = await updateReview(review.id, reviewData, token);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">Edit Your Review</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Overall Rating *</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-colors p-1"
                  >
                    <Star
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${
                        star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0 && `${rating} star${rating !== 1 ? 's' : ''}`}
                </span>
              </div>
            </div>

            {/* Review Detail (Comment) - First */}
            <div>
              <Label htmlFor="review-comment" className="text-sm font-medium mb-2 block">
                Review Detail *
              </Label>
              <Textarea
                id="review-comment"
                placeholder="Share details about your experience with this store. What did you like? What could be improved?"
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full resize-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                {comment.length}/500 characters
              </div>
            </div>

            {/* Title - Auto-populated */}
            <div>
              <Label htmlFor="review-title" className="text-sm font-medium mb-2 block">
                Review Title *
              </Label>
              <Input
                id="review-title"
                placeholder="Auto-generated from your review detail"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Attachments */}
            <div>
              <Label htmlFor="attachments" className="text-sm font-medium mb-2 block">
                Attachments (Optional)
              </Label>
              <Input
                id="attachments"
                placeholder="Attachment URLs separated by commas"
                value={attachments}
                onChange={(e) => setAttachments(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Error Display */}
            {editReview.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{editReview.error}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                type="button" 
                onClick={onClose} 
                variant="outline" 
                className="flex-1 order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 order-1 sm:order-2" 
                disabled={rating === 0 || !title.trim() || !comment.trim() || editReview.loading}
              >
                {editReview.loading ? 'Updating...' : 'Update Review'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 