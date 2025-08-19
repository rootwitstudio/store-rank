"use client";
import { MessageSquare } from "lucide-react";

interface SuccessStoriesCTAProps {
  onShareStory: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export function SuccessStoriesCTA({
  onShareStory,
  title = "Join Our Community of Smart Shoppers",
  description = "Share your experience and help others make informed shopping decisions. Your story or testimonial could save someone from a scam or help them find their new favorite store.",
  buttonText = "Share Your Experience",
}: SuccessStoriesCTAProps) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center text-white">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-orange-100 mb-6 max-w-2xl mx-auto">{description}</p>
      <button
        onClick={onShareStory}
        className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        {buttonText}
      </button>
    </div>
  );
}
