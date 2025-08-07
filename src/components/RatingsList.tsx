import React from "react";

interface Rating {
  user: string;
  comment: string;
  rating: number;
}

interface RatingsListProps {
  ratings: Rating[];
}

const RatingsList: React.FC<RatingsListProps> = ({ ratings }) => (
  <div className="space-y-4">
    {ratings.map((r, i) => (
      <div key={i} className="bg-white rounded shadow p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-blue-700">{r.user}</span>
          <span className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
        </div>
        <div className="text-gray-700">{r.comment}</div>
      </div>
    ))}
  </div>
);

export default RatingsList;
