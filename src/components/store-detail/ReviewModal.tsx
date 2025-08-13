"use client";

import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReviewStore, Review } from "@/stores/reviewStore";
import { useAuthStore } from "@/stores/authStore";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  review?: Review;
  storeName?: string;
  storeId?: string;
  onRefresh?: () => void;
}

export function ReviewModal({
  isOpen,
  onClose,
  isEdit = false,
  review,
  storeName,
  storeId,
  onRefresh,
}: ReviewModalProps) {
  const [rating, setRating] = useState(isEdit ? review?.rating || 0 : 0);
  const [comment, setComment] = useState(isEdit ? review?.comment || "" : "");
  const [title, setTitle] = useState(isEdit ? review?.title || "" : "");
  const [dateOfPurchase, setDateOfPurchase] = useState(
    isEdit
      ? review?.dateOfPurchase
        ? new Date(review.dateOfPurchase).toISOString().split("T")[0]
        : ""
      : ""
  );
  const [orderNumber, setOrderNumber] = useState(
    isEdit ? review?.orderNumber || "" : ""
  );
  const [attachments, setAttachments] = useState(
    isEdit ? review?.attachments.join(", ") || "" : ""
  );
  const [purchaseProof, setPurchaseProof] = useState(
    isEdit ? review?.purchaseProof || "" : ""
  );

  // Track initial values for edit mode to detect changes
  const [initialValues, setInitialValues] = useState<any>({});

  const { submitReview, updateReview, createReview, editReview } =
    useReviewStore();
  const { accessToken } = useAuthStore();

  // Auto-populate title based on comment
  useEffect(() => {
    if (comment.trim()) {
      const words = comment.trim().split(" ");
      const titleWords = words.slice(0, 5).join(" ");
      setTitle(titleWords + (words.length > 5 ? "..." : ""));
    }
  }, [comment]);

  // Set initial values when in edit mode
  useEffect(() => {
    if (isEdit && review) {
      const initial = {
        rating: review.rating,
        comment: review.comment,
        title: review.title,
        dateOfPurchase: review.dateOfPurchase
          ? new Date(review.dateOfPurchase).toISOString().split("T")[0]
          : "",
        orderNumber: review.orderNumber,
        attachments: review.attachments.join(", "),
        purchaseProof: review.purchaseProof,
      };
      setInitialValues(initial);

      setRating(initial.rating);
      setComment(initial.comment);
      setTitle(initial.title);
      setDateOfPurchase(initial.dateOfPurchase);
      setOrderNumber(initial.orderNumber);
      setAttachments(initial.attachments);
      setPurchaseProof(initial.purchaseProof);
    }
  }, [isEdit, review]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      if (!isEdit) {
        setRating(0);
        setComment("");
        setTitle("");
        setDateOfPurchase("");
        setOrderNumber("");
        setAttachments("");
        setPurchaseProof("");
      }
    }
  }, [isOpen, isEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && review) {
      // For edit mode, only send changed fields
      const currentValues = {
        rating,
        comment,
        title,
        dateOfPurchase,
        orderNumber,
        attachments,
        purchaseProof,
      };

      const changedFields: any = {};

      if (currentValues.rating !== initialValues.rating) {
        changedFields.rating = rating;
      }
      if (currentValues.comment !== initialValues.comment) {
        changedFields.comment = comment;
      }
      if (currentValues.title !== initialValues.title) {
        changedFields.title = title;
      }
      if (currentValues.dateOfPurchase !== initialValues.dateOfPurchase) {
        changedFields.dateOfPurchase = dateOfPurchase
          ? new Date(dateOfPurchase + "T00:00:00.000Z").toISOString()
          : "";
      }
      if (currentValues.orderNumber !== initialValues.orderNumber) {
        changedFields.orderNumber = orderNumber;
      }
      if (currentValues.attachments !== initialValues.attachments) {
        changedFields.attachments = attachments
          ? attachments
              .split(", ")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
      }
      if (currentValues.purchaseProof !== initialValues.purchaseProof) {
        changedFields.purchaseProof = purchaseProof;
      }

      const success = await updateReview(
        review.id,
        changedFields,
        accessToken || ""
      );
      if (success) {
        onClose();
        onRefresh?.();
      }
    } else {
      // For create mode, send all fields
      const dateISO = dateOfPurchase
        ? new Date(dateOfPurchase + "T00:00:00.000Z").toISOString()
        : "";

      const reviewData = {
        storeId: storeId!,
        title,
        comment,
        rating,
        dateOfPurchase: dateISO,
        orderNumber,
        attachments: attachments
          ? attachments
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        purchaseProof,
      };

      console.log("Creating review with data:", reviewData);

      const success = await submitReview(reviewData, accessToken || "");
      if (success) {
        // Reset form
        setRating(0);
        setComment("");
        setTitle("");
        setDateOfPurchase("");
        setOrderNumber("");
        setAttachments("");
        setPurchaseProof("");
        onClose();
        onRefresh?.();
      }
    }
  };

  const currentState = isEdit ? editReview : createReview;
  const displayStoreName = isEdit ? review?.store?.name : storeName;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
      <Card className="w-full h-full sm:w-full sm:max-w-2xl sm:h-[90vh] flex flex-col shadow-2xl border-0 sm:rounded-lg">
        <CardHeader className="pb-4 shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">
              {isEdit
                ? "Edit Your Review"
                : `Write a Review for ${displayStoreName}`}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Overall Rating *
              </Label>
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
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0 && `${rating} star${rating !== 1 ? "s" : ""}`}
                </span>
              </div>
            </div>

            {/* Review Detail (Comment) */}
            <div>
              <Label
                htmlFor="review-comment"
                className="text-sm font-medium mb-2 block"
              >
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
              <Label
                htmlFor="review-title"
                className="text-sm font-medium mb-2 block"
              >
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

            {/* Purchase Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="date-of-purchase"
                  className="text-sm font-medium mb-2 block"
                >
                  Date of Purchase *
                </Label>
                <Input
                  id="date-of-purchase"
                  type="date"
                  value={dateOfPurchase}
                  onChange={(e) => setDateOfPurchase(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="order-number"
                  className="text-sm font-medium mb-2 block"
                >
                  Order Number *
                </Label>
                <Input
                  id="order-number"
                  placeholder="Your order number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Attachments and Purchase Proof */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="attachments"
                  className="text-sm font-medium mb-2 block"
                >
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
              <div>
                <Label
                  htmlFor="purchase-proof"
                  className="text-sm font-medium mb-2 block"
                >
                  Purchase Proof (Optional)
                </Label>
                <Input
                  id="purchase-proof"
                  placeholder="Purchase proof reference"
                  value={purchaseProof}
                  onChange={(e) => setPurchaseProof(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Error Display */}
            {currentState.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{currentState.error}</p>
              </div>
            )}

            {/* Guidelines - Only show for create mode */}
            {!isEdit && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 text-sm">
                  Review Guidelines
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Be honest and specific about your experience</li>
                  <li>• Focus on the product or service quality</li>
                  <li>• Avoid personal attacks or inappropriate language</li>
                  <li>
                    • Include relevant details that would help other buyers
                  </li>
                </ul>
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
                disabled={
                  rating === 0 ||
                  !title.trim() ||
                  !comment.trim() ||
                  !dateOfPurchase ||
                  !orderNumber.trim() ||
                  currentState.loading
                }
                onClick={handleSubmit}
              >
                {currentState.loading
                  ? isEdit
                    ? "Updating..."
                    : "Submitting..."
                  : isEdit
                  ? "Update Review"
                  : "Submit Review"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
