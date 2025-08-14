import React from "react";

interface CompanyRankingsProps {
  rankings: string[];
}

const CompanyRankings: React.FC<CompanyRankingsProps> = ({ rankings }) => {
  if (!rankings || rankings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mb-4 md:mb-6">
      {rankings.map((ranking, index) => (
        <div
          key={index}
          className="inline-block bg-blue-50 text-blue-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium mr-2 mb-2"
        >
          {ranking}
        </div>
      ))}
    </div>
  );
};

export default CompanyRankings;
