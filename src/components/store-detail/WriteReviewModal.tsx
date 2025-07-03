"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
}

export function WriteReviewModal({ isOpen, onClose, storeName }: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log({ rating, title, content, pros, cons });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">Write a Review for {storeName}</CardTitle>
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

            {/* Title */}
            <div>
              <Label htmlFor="review-title" className="text-sm font-medium mb-2 block">
                Review Title *
              </Label>
              <Input
                id="review-title"
                placeholder="Summarize your experience in a few words"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="review-content" className="text-sm font-medium mb-2 block">
                Your Review *
              </Label>
              <Textarea
                id="review-content"
                placeholder="Share details about your experience with this store. What did you like? What could be improved?"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full resize-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                {content.length}/500 characters
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pros" className="text-sm font-medium mb-2 block text-green-700">
                  What did you like? (Optional)
                </Label>
                <Textarea
                  id="pros"
                  placeholder="List the positive aspects..."
                  rows={3}
                  value={pros}
                  onChange={(e) => setPros(e.target.value)}
                  className="w-full resize-none"
                />
              </div>
              <div>
                <Label htmlFor="cons" className="text-sm font-medium mb-2 block text-red-700">
                  What could be improved? (Optional)
                </Label>
                <Textarea
                  id="cons"
                  placeholder="List areas for improvement..."
                  rows={3}
                  value={cons}
                  onChange={(e) => setCons(e.target.value)}
                  className="w-full resize-none"
                />
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 text-sm">Review Guidelines</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Be honest and specific about your experience</li>
                <li>• Focus on the product or service quality</li>
                <li>• Avoid personal attacks or inappropriate language</li>
                <li>• Include relevant details that would help other buyers</li>
              </ul>
            </div>

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
                disabled={rating === 0 || !title.trim() || !content.trim()}
              >
                Submit Review
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}