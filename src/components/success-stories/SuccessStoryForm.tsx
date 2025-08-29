"use client";
import { useState } from "react";
import {
  CheckCircle,
  ThumbsUp,
  Quote,
  Send,
  User,
  MapPin,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { SuccessStory } from "@/types/success-stories";

interface SuccessStoryFormProps {
  onSubmit: (
    story: Omit<
      SuccessStory,
      "id" | "verified" | "date" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;
  onCancel?: () => void;
  showForm: boolean;
  onToggleForm: (show: boolean) => void;
  isSubmitting?: boolean;
}

// Outcome suggestions for both success stories and testimonials
const outcomeSuggestions = [
  "Saved money",
  "Avoided scam",
  "Found better deal",
  "Discovered new store",
  "Built trust",
  "Improved shopping experience",
  "Found local business",
  "Verified store legitimacy",
  "Better customer service",
  "Faster delivery",
  "Quality products",
  "Secure payment",
  "Easy returns",
  "Great reviews",
  "Community recommendation",
  "Excellent experience",
  "Highly recommended",
  "Exceeded expectations",
  "Reliable service",
  "Trustworthy platform",
];

// Designation suggestions
const designationSuggestions = [
  "CEO",
  "Founder",
  "Manager",
  "Director",
  "Customer",
  "Business Owner",
  "Entrepreneur",
  "Professional",
  "Student",
  "Parent",
  "Shopper",
  "Reviewer",
];

export function SuccessStoryForm({
  onSubmit,
  onCancel,
  showForm,
  onToggleForm,
  isSubmitting = false,
}: SuccessStoryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    designation: "",
    story: "",
    outcome: "",
  });
  const [showOutcomeSuggestions, setShowOutcomeSuggestions] = useState(false);
  const [showDesignationSuggestions, setShowDesignationSuggestions] =
    useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStory = {
      name: formData.name,
      location: formData.location,
      designation: formData.designation || undefined,
      story: formData.story,
      outcome: formData.outcome,
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      rating: 5, // Default rating
    };

    await onSubmit(newStory);

    // Reset form
    setFormData({
      name: "",
      location: "",
      designation: "",
      story: "",
      outcome: "",
    });
    onToggleForm(false);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      location: "",
      designation: "",
      story: "",
      outcome: "",
    });
    onCancel?.();
    onToggleForm(false);
  };

  const handleOutcomeSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, outcome: suggestion });
    setShowOutcomeSuggestions(false);
  };

  const handleDesignationSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, designation: suggestion });
    setShowDesignationSuggestions(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Share Your Experience
        </h2>
        <p className="text-gray-600">
          Tell us about your success story or testimonial about how Trustnbuy
          helped you shop smarter and safer
        </p>
      </div>

      {!showForm ? (
        <div className="text-center">
          <button
            onClick={() => onToggleForm(true)}
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Share Your Experience
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="City, State"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="h-4 w-4 inline mr-1" />
              Your Role/Designation (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                onFocus={() => setShowDesignationSuggestions(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., CEO, Manager, Customer"
              />

              {/* Designation Suggestions */}
              {showDesignationSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-2 px-2">
                      Common roles:
                    </p>
                    <div className="grid grid-cols-1 gap-1">
                      {designationSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() =>
                            handleDesignationSuggestionClick(suggestion)
                          }
                          className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded-md transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Quote className="h-4 w-4 inline mr-1" />
              Your Story or Testimonial
            </label>
            <textarea
              required
              rows={4}
              value={formData.story}
              onChange={(e) =>
                setFormData({ ...formData, story: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Share your experience with Trustnbuy - whether it's a success story about avoiding scams, finding great deals, or a testimonial about the platform's reliability..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ThumbsUp className="h-4 w-4 inline mr-1" />
              Key Takeaway or Outcome
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.outcome}
                onChange={(e) =>
                  setFormData({ ...formData, outcome: e.target.value })
                }
                onFocus={() => setShowOutcomeSuggestions(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Saved $200, Avoided scam, Highly recommended"
              />

              {/* Outcome Suggestions */}
              {showOutcomeSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-2 px-2">
                      Popular outcomes:
                    </p>
                    <div className="grid grid-cols-1 gap-1">
                      {outcomeSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() =>
                            handleOutcomeSuggestionClick(suggestion)
                          }
                          className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded-md transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Experience
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
