import React from "react";
import { FaStar } from "react-icons/fa";

const CourseCard = ({ title, thumbnail, category, price, id }) => {
  return (
    <div
      className="max-w-xs w-full bg-white rounded-xl
      overflow-hidden  hover:shadow-md transition-all
      duration-300 border border-gray-200"
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-35 object-cover"
      />

      {/* Content */}
      <div className="p-3 space-y-1.5">
        {/* Title */}
        <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
          {title}
        </h2>

        {/* Category */}
        <span
          className="inline-block px-2 py-0.5 bg-gray-100 rounded-full
          text-gray-700 capitalize text-xs"
        >
          {category}
        </span>

        {/* Price + Rating */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <span className="font-semibold text-gray-800">{price}</span>
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-500 text-sm" />
            5
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
