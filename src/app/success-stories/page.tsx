"use client";
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import {
  SuccessStoryForm,
  SuccessStoriesGrid,
  SuccessStoriesCTA,
} from "@/components/success-stories";
import { Modal } from "@/components/ui/Modal";
import { successStoriesApi } from "@/lib/api";
import { SuccessStory } from "@/types/success-stories";

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalStories, setTotalStories] = useState(0);

  // Fetch stories from API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const response = await successStoriesApi.getAll({
          limit: 20,
          offset: (currentPage - 1) * 20,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (currentPage === 1) {
          setStories(response.stories || response);
        } else {
          setStories((prev) => [...prev, ...(response.stories || response)]);
        }

        // Handle pagination - check if we have more data
        const fetchedStories = response.stories || response;
        setHasMore(fetchedStories.length === 20); // If we got 20, there might be more
        setTotalStories(
          response.total || stories.length + fetchedStories.length
        );
      } catch (error) {
        console.error("Failed to fetch stories:", error);
        setStories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [currentPage]);

  const handleSubmitStory = async (
    storyData: Omit<
      SuccessStory,
      "id" | "verified" | "date" | "createdAt" | "updatedAt"
    >
  ) => {
    setIsSubmitting(true);

    try {
      const newStory = await successStoriesApi.create(storyData);
      setStories([newStory, ...stories]);
      setTotalStories((prev) => prev + 1);
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

  const loadMoreStories = () => {
    if (hasMore && !isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Success Stories & Testimonials
              </h1>
              <p className="text-gray-600 text-lg">
                Real experiences from our community about how Trustnbuy helped
                them shop smarter
              </p>
            </div>
            <Link
              href="/"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Share Story Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Share Your Experience
          </button>
        </div>

        {/* Stories Grid */}
        <div className="mb-8">
          {isLoading && stories.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading success stories...</p>
            </div>
          ) : stories.length === 0 ? (
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
              <SuccessStoriesGrid
                stories={stories}
                title={`Community Experiences (${totalStories} total)`}
                showTitle={true}
              />

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMoreStories}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      "Load More Stories"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Call to Action */}
        {/* <SuccessStoriesCTA onShareStory={() => setShowForm(true)} /> */}
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
    </div>
  );
}
