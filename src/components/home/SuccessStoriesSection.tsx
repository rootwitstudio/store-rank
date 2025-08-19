"use client";
import { useState, useEffect } from "react";
import { CheckCircle, ThumbsUp, Quote, MessageSquare } from "lucide-react";
import Link from "next/link";
import { SuccessStoryForm } from "../success-stories/SuccessStoryForm";
import { Modal } from "../ui/Modal";
import { SuccessStoriesAPI, SuccessStory } from "@/lib/api/success-stories";

interface SuccessStoriesSectionProps {
  stories?: SuccessStory[]; // Optional prop for initial data
}

export function SuccessStoriesSection({
  stories: initialStories,
}: SuccessStoriesSectionProps) {
  const [stories, setStories] = useState<SuccessStory[]>(initialStories || []);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialStories);

  // Fetch featured stories from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const featuredStories = await SuccessStoriesAPI.getFeaturedStories(6);
        setStories(featuredStories);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
        // Fallback to empty array if API fails
        setStories([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialStories) {
      fetchStories();
    }
  }, [initialStories]);

  const handleSubmitStory = async (
    storyData: Omit<
      SuccessStory,
      "id" | "verified" | "date" | "createdAt" | "updatedAt"
    >
  ) => {
    setIsSubmitting(true);

    try {
      const newStory = await SuccessStoriesAPI.createStory(storyData);
      setStories([newStory, ...stories]);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to submit story:", error);
      alert("Failed to submit your story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading success stories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 gap-4 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
              Success Stories & Testimonials
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Real experiences from our community about how Trustnbuy helped
              them shop smarter and safer
            </p>
          </div>
          <Link
            href="/success-stories"
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group whitespace-nowrap self-start sm:self-auto"
          >
            View all
            <svg
              className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No success stories yet. Be the first to share your experience!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Share Your Experience
            </button>
          </div>
        ) : (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="flex-shrink-0 w-[280px] h-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0">
                        {story.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-1">
                          <h5 className="font-semibold truncate max-w-[120px]">
                            {story.name}
                          </h5>
                        </div>
                        <p className="text-sm text-gray-500 truncate max-w-[120px]">
                          {story.location}
                        </p>
                        {story.designation && (
                          <p className="text-xs text-blue-600 font-medium mt-1 truncate max-w-[120px]">
                            {story.designation}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <Quote className="h-5 w-5 text-gray-400 mb-2" />
                      <p className="text-gray-700 italic line-clamp-3 min-h-[60px]">
                        &ldquo;{story.story}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {story.outcome}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0">
                      {story.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <h5 className="font-semibold truncate max-w-[120px]">
                          {story.name}
                        </h5>
                      </div>
                      <p className="text-sm text-gray-500 truncate max-w-[120px]">
                        {story.location}
                      </p>
                      {story.designation && (
                        <p className="text-xs text-blue-600 font-medium mt-1 truncate max-w-[120px]">
                          {story.designation}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Quote className="h-5 w-5 text-gray-400 mb-2" />
                    <p className="text-gray-700 italic line-clamp-3 min-h-[60px]">
                      &ldquo;{story.story}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {story.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Share Your Experience
              </button>
            </div>
          </>
        )}
      </div>

      {/* Success Story Form Modal */}
      <Modal isOpen={showForm} onClose={handleCloseModal} title="">
        <div className="p-4 md:p-6">
          <SuccessStoryForm
            onSubmit={handleSubmitStory}
            onCancel={handleCloseModal}
            showForm={true}
            onToggleForm={() => {}} // Not needed in modal
            isSubmitting={isSubmitting}
          />
        </div>
      </Modal>
    </section>
  );
}
