"use client";

import { StarRating } from "../page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, PencilLine, ShieldCheck } from "lucide-react"; // Icons for buttons and badge
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import { use } from "react";

// Using the same mock data as the parent page
const mockStores = [
  {
    id: "1",
    name: "Amazon",
    desc: "World's largest online marketplace with millions of products.",
    tags: ["Free Shipping", "Eco-friendly"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Electronics",
    logo: null,
    rating: 4.5,
    totalRating: 820,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.amazon.com",
  },
  {
    id: "2",
    name: "eBay",
    desc: "Global online marketplace for buying and selling goods.",
    tags: ["Discounts", "Online Only"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Electronics",
    logo: null,
    rating: 4.2,
    totalRating: 110,
    verified: false,
    claimed: false,
    country: "United Kingdom",
    link: "https://www.ebay.com",
  },
  {
    id: "3",
    name: "Flipkart",
    desc: "India's leading e-commerce marketplace.",
    tags: ["Local"],
    categoryId: "222f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Home",
    logo: null,
    rating: 4.8,
    totalRating: 90,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://www.flipkart.com",
  },
  {
    id: "4",
    name: "Zalando",
    desc: "Europe's leading online fashion platform.",
    tags: ["Free Shipping", "Discounts"],
    categoryId: "333f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Food",
    logo: null,
    rating: 4.0,
    totalRating: 79,
    verified: false,
    claimed: true,
    country: "Germany",
    link: "https://www.zalando.com",
  },
];

// Helper component for the rating breakdown bars
function RatingBar({
  rating,
  count,
  total,
}: {
  rating: number;
  count: number;
  total: number;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center text-sm">
      <span className="w-8 text-gray-700">{rating}-star</span>
      <div className="w-full h-2 bg-gray-200 rounded-full mx-2">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor:
              rating >= 4 ? "#4ade80" : rating >= 3 ? "#facc15" : "#f87171", // Simple color logic based on rating
          }}
        ></div>
      </div>
      <span className="w-10 text-right text-gray-600">{count}</span>
    </div>
  );
}

export default function StoreDetailPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const router = useRouter();
  const { storeId } = use(params);
  const mockStore = mockStores.find((store) => store.id === storeId);

  if (!mockStore) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Store not found</h1>
            <Button onClick={() => router.push("/stores")}>
              Back to Stores
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Mock review counts for the rating breakdown (using fixed values)
  const mockRatingCounts = {
    5: Math.round(mockStore.rating * 20), // 20% of total reviews
    4: Math.round((5 - mockStore.rating) * 20), // 20% of total reviews
    3: 15, // Fixed value
    2: 10, // Fixed value
    1: 5, // Fixed value
  };
  const totalMockReviews = Object.values(mockRatingCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // Mock data for review summary tags
  const mockReviewTags = [
    { text: "Great hospitality", count: 6 },
    { text: "Quiet area", count: 3 },
    { text: "Clean", count: 1 },
    { text: "Great communication", count: 1 },
    { text: "Well equipped", count: 1 },
    { text: "Spacious", count: 1 },
    { text: "Accurate photos", count: 1 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Store Details and Reviews */}
        <div className="lg:col-span-2">
          {/* Store Summary Section */}
          <div className="bg-white p-6 rounded-lg mb-8 shadow-xxs">
            <div className="flex items-start mb-4">
              {/* Placeholder for Logo */}
              <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 font-bold text-xl mr-6 flex-shrink-0">
                {mockStore.name.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <h1 className="text-2xl font-bold mr-3">{mockStore.name}</h1>
                  {/* Claimed Profile Badge */}
                  {mockStore.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ShieldCheck
                        className="-ml-0.5 mr-1 h-3 w-3"
                        aria-hidden="true"
                      />
                      Claimed profile
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {mockStore.desc} &bull; {mockStore.rating} rating
                </p>{" "}
                {/* Using desc as temp website/url placeholder */}
                <p className="text-sm text-blue-600 mb-4">
                  {mockStore.category}
                </p>
                {/* Review Actions */}
                <div className="flex space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <PencilLine className="mr-2 h-4 w-4" /> Write a review
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 py-2 rounded-md flex items-center border-gray-300"
                  >
                    Visit website <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            {/* Trustpilot Statement */}
            {/* <div className="flex items-center p-3 bg-yellow-50 rounded-md text-yellow-800 text-sm mt-4">
              <ShieldCheck className="h-5 w-5 mr-3 text-yellow-600 flex-shrink-0" />
              <p>
                Companies on Trustpilot can't offer incentives or pay to hide
                any reviews.
              </p>
            </div> */}
          </div>

          {/* Review Summary Tags */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-xxs">
            <div className="flex flex-wrap gap-2">
              {mockReviewTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag.text} &bull; {tag.count}
                </span>
              ))}
            </div>
          </div>

          {/* See what reviewers are saying Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">
              See what reviewers are saying
            </h2>
            {/* Placeholder for individual reviews - loop through review data here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Example Review Placeholder */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-xxs">
                <div className="flex items-start mb-3">
                  {/* Reviewer Avatar Placeholder */}
                  <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-semibold text-sm mr-3 flex-shrink-0">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Sandeep</div>
                    <div className="text-xs text-gray-500">
                      1 year on Airbnb
                    </div>{" "}
                    {/* Placeholder */}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <StarRating rating={5} /> {/* Placeholder Rating */}
                  <span className="ml-2">&bull; 2 weeks ago</span>{" "}
                  {/* Placeholder */}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  We had a wonderful time! The room was incredibly spacious and
                  thoughtfully designed, offering plenty of comfort and unwind.
                  One of the highlights was the beautiful balcony ...
                </p>
                <button
                  className="text-blue-600 hover:underline text-sm mt-2 p-0"
                  style={{
                    lineHeight: "inherit",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  See more
                </button>
              </div>
              {/* Example Review Placeholder 2 */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-xxs">
                <div className="flex items-start mb-3">
                  {/* Reviewer Avatar Placeholder */}
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 flex-shrink-0">
                    R
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Rajat</div>
                    <div className="text-xs text-gray-500">
                      2 years on Airbnb
                    </div>{" "}
                    {/* Placeholder */}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <StarRating rating={5} /> {/* Placeholder Rating */}
                  <span className="ml-2">&bull; 2 days ago</span>{" "}
                  {/* Placeholder */}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  I had a fantastic stay here, felt just like at home. thanks to
                  the exceptional hospitality and serene environment. Mr Pratik
                  was incredibly responsive and very helpful. Enjoyed...
                </p>
                <button
                  className="text-blue-600 hover:underline text-sm mt-2 p-0"
                  style={{
                    lineHeight: "inherit",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  See more
                </button>
              </div>
              {/* Example Review Placeholder 3 */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-xxs">
                <div className="flex items-start mb-3">
                  {/* Reviewer Avatar Placeholder */}
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm mr-3 flex-shrink-0">
                    C
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Chaitanya</div>
                    <div className="text-xs text-gray-500">
                      3 years on Airbnb
                    </div>{" "}
                    {/* Placeholder */}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <StarRating rating={5} /> {/* Placeholder Rating */}
                  <span className="ml-2">&bull; 1 week ago</span>{" "}
                  {/* Placeholder */}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  Staying at your home was an absolute delight! It was truly the
                  best experience we've had your hospitality, and the comfort of
                  your space made us feel like part of the ...
                </p>
                <button
                  className="text-blue-600 hover:underline text-sm mt-2 p-0"
                  style={{
                    lineHeight: "inherit",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  See more
                </button>
              </div>
              {/* Example Review Placeholder 4 */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-xxs">
                <div className="flex items-start mb-3">
                  {/* Reviewer Avatar Placeholder */}
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-semibold text-sm mr-3 flex-shrink-0">
                    D
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Dinesh</div>
                    <div className="text-xs text-gray-500">
                      8 months on Airbnb
                    </div>{" "}
                    {/* Placeholder */}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <StarRating rating={5} /> {/* Placeholder Rating */}
                  <span className="ml-2">&bull; 1 week ago</span>{" "}
                  {/* Placeholder */}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  hello there!This was hands down the most peaceful and
                  beautiful Stay I have ever stayed! You can just book this
                  place just for their lovely Iced Coffee! ...
                </p>
                <button
                  className="text-blue-600 hover:underline text-sm mt-2 p-0"
                  style={{
                    lineHeight: "inherit",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  See more
                </button>
              </div>
              {/* Example Review Placeholder 5 */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-xxs">
                <div className="flex items-start mb-3">
                  {/* Reviewer Avatar Placeholder */}
                  <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-semibold text-sm mr-3 flex-shrink-0">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Mani</div>
                    <div className="text-xs text-gray-500">
                      6 years on Airbnb
                    </div>{" "}
                    {/* Placeholder */}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <StarRating rating={5} /> {/* Placeholder Rating */}
                  <span className="ml-2">&bull; 1 week ago</span>{" "}
                  {/* Placeholder */}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  First of all thank you so much diyaa and prathik for giving us
                  a wonderful experience. We never thought that a random stay
                  would feel like home!! I have never shared my review on any
                  ...
                </p>
                <button
                  className="text-blue-600 hover:underline text-sm mt-2 p-0"
                  style={{
                    lineHeight: "inherit",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  See more
                </button>
              </div>
              {/* Example Review Placeholder 6 */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-xxs">
                <div className="flex items-start mb-3">
                  {/* Reviewer Avatar Placeholder */}
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-semibold text-sm mr-3 flex-shrink-0">
                    G
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Gopi</div>
                    <div className="text-xs text-gray-500">
                      7 months on Airbnb
                    </div>{" "}
                    {/* Placeholder */}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <StarRating rating={5} /> {/* Placeholder Rating */}
                  <span className="ml-2">&bull; 1 week ago</span>{" "}
                  {/* Placeholder */}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">
                  Already missing the place ❤️ Great stay!! I must recommend for
                  everyone who likes a homely feel stay. Peaceful and calm
                  society ❤️. For those who are cofee lover...
                </p>
                <button
                  className="text-blue-600 hover:underline text-sm mt-2 p-0"
                  style={{
                    lineHeight: "inherit",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  See more
                </button>
              </div>
              {/* Add more review placeholders or map through actual review data */}
            </div>
          </div>
        </div>

        {/* Right Column - Overall Rating and Breakdown */}
        <div className="lg:col-span-1">
          {/* Overall Rating and Category Breakdown (Top Section) */}
          <div className="bg-white rounded-lg p-6 mb-8 text-center shadow-xxs">
            {/* Placeholder for Laurels */}
            <div className="flex items-center justify-center text-yellow-500 text-5xl mb-4">
              {/* Replace with actual laurel icons if available */}
              ✨✨
            </div>
            <div className="text-8xl font-bold mb-2 leading-none">
              {mockStore.rating.toFixed(1)}
            </div>
            <div className="text-2xl font-semibold mb-1">Guest favourite</div>{" "}
            {/* Placeholder Text */}
            <div className="text-md text-gray-600 mb-8 px-4 max-w-md mx-auto">
              This store is in the <span className="font-semibold">top 5%</span>{" "}
              of eligible listings based on ratings, reviews and reliability.
            </div>
            {/* Category Rating Breakdown (Horizontal) */}
            {/* <div className="flex justify-around border-t border-b border-gray-200 py-4 mb-6">
              
            </div> */}
          </div>

          {/* Replied to Negative Reviews Note */}
          {/* <div className="bg-white rounded-lg p-6 mb-6 flex items-start shadow-md">
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 mr-3 text-gray-500"
            >
              <path
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.91 11.64a3.87 3.87 0 0 1-.29-1.48 3.92 3.92 0 0 1 4.14-3.84 3.94 3.94 0 0 1 3.75 2.25 3.9 3.9 0 0 1 .09 2.19c-.21.74-.61 1.43-1.17 2a4.25 4.25 0 0 1-.87.74c-.22.14-.4.26-.53.34-.12.09-.21.14-.24.17-.04.03-.06.05-.07.06l-.01.01a.1.1 0 0 1-.07.02.08.08 0 0 1-.07-.02c-.03-.03-.05-.05-.07-.07a.09.09 0 0 1-.04-.06c-.01-.01-.01-.02-.02-.03-.02-.02-.03-.04-.04-.06-.07-.12-.16-.24-.29-.36-.21-.18-.43-.36-.67-.54a6.13 6.13 0 0 0-.73-.55 4.77 4.77 0 0 0-.84-.68ZM8.01 8.73a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm7.98 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
                fill="currentColor"
              ></path>
            </svg>
            <div>
              <p className="text-sm text-gray-700">
                Replied to 44% of negative reviews
              </p>
              <p className="text-xs text-gray-500">
                Typically takes over 1 month to reply
              </p>
            </div>
          </div> */}

          {/* How company uses Trustpilot link */}
          {/* <div className="text-center lg:text-left">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              How this company uses Trustpilot{" "}
              <ExternalLink className="inline-block h-3 w-3 ml-1" />
            </a>
          </div> */}
        </div>
      </main>

      {/* Placeholder for Footer */}
      {/* <footer className="border-t py-4 text-center text-sm text-muted-foreground">Footer</footer> */}
    </div>
  );
}
