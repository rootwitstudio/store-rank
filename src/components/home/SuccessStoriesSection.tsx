"use client";
import { CheckCircle, ThumbsUp, Quote } from "lucide-react";

interface SuccessStory {
  id: string;
  name: string;
  location: string;
  story: string;
  outcome: string;
  avatar: string;
  verified: boolean;
}

interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
}

export function SuccessStoriesSection({ stories }: SuccessStoriesSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Success Stories</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Real stories from our community about how StoreRankly helped them shop smarter and safer</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0">
                  {story.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="font-semibold">{story.name}</h3>
                    {story.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{story.location}</p>
                </div>
              </div>

              <div className="mb-4">
                <Quote className="h-5 w-5 text-gray-400 mb-2" />
                <p className="text-gray-700 italic">&ldquo;{story.story}&rdquo;</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {story.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 