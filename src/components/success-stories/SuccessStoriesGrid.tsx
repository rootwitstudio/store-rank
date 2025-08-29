"use client";
import { CheckCircle, ThumbsUp, Quote } from "lucide-react";
import { SuccessStory } from "@/types/success-stories";

interface SuccessStoriesGridProps {
  stories: SuccessStory[];
  title?: string;
  showTitle?: boolean;
}

export function SuccessStoriesGrid({
  stories,
  title = "Community Success Stories",
  showTitle = true,
}: SuccessStoriesGridProps) {
  return (
    <div>
      {showTitle && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-[320px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0 overflow-hidden">
                  {story.avatar ? (
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling!.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      story.avatar ? "hidden" : ""
                    }`}
                  >
                    {story.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <h3 className="font-semibold truncate">{story.name}</h3>
                    {story.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {story.location}
                  </p>
                  {story.designation && (
                    <p className="text-xs text-blue-600 font-medium mt-1">
                      {story.designation}
                    </p>
                  )}
                  {(story.date || story.createdAt) && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(
                        story.date || story.createdAt!
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <Quote className="h-5 w-5 text-gray-400 mb-2" />
                <p className="text-gray-700 italic line-clamp-4">
                  &ldquo;{story.story}&rdquo;
                </p>
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

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0 overflow-hidden">
                {story.avatar ? (
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling!.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    story.avatar ? "hidden" : ""
                  }`}
                >
                  {story.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <h3 className="font-semibold truncate">{story.name}</h3>
                  {story.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {story.location}
                </p>
                {story.designation && (
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    {story.designation}
                  </p>
                )}
                {(story.date || story.createdAt) && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(
                      story.date || story.createdAt!
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <Quote className="h-5 w-5 text-gray-400 mb-2" />
              <p className="text-gray-700 italic line-clamp-4">
                &ldquo;{story.story}&rdquo;
              </p>
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
  );
}
