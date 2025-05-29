"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { PopOverCard } from "../_components/Popover";
import { ReviewProps } from "@/lib/type";
import { CiUser } from "react-icons/ci";

interface Props {
  reviews?: ReviewProps[];
}

const Review: React.FC<Props> = ({ reviews }) => {
  const avgRate =
    (reviews &&
      reviews.length > 0 &&
      reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length) ||
    0;
  const avgRating = Math.floor(Math.ceil(avgRate));
  return (
    <div className="w-full relative mx-auto">
      <div className="w-full relative py-10">
        <h4 className="text-center">Customer Reviews</h4>
        <div className=" w-full relative flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <article className="flex flex-col items-start">
              <span className="text-sm font-semibold text-head flex items-center">
                Average Rating:&nbsp;{avgRating}
              </span>
              <div className="flex gap-1">
                {[...Array(avgRating)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-md ${
                      index < avgRating ? "text-[#339999]" : "text-[#ccc]"
                    }`}
                  />
                ))}
              </div>
            </article>
          </div>
          {/* component for add review */}
          <PopOverCard />
        </div>
      </div>
      <div className="w-full relative flex flex-col gap-8 py-6 h-auto">
        {reviews && reviews.length > 0 ? (
          reviews.map((item, key) => {
            return (
              <div className="w-full relative flex flex-col" key={key}>
                <div className="bg-gray-200 w-full h-[0.5px]" />
                <div className="flex items-center justify-between w-full relative pt-5">
                  <div className="flex items-start justify-start gap-1">
                    {[...Array(item?.rating)].map((_, i) => (
                      <FaStar key={i} className="text-md text-prdct" />
                    ))}
                  </div>
                  {item?.createdAt && (
                    <p className="text-[#333]">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="py-2 flex items-center gap-1">
                  <CiUser size={30} className="bg-gray-200 text-prdct" />
                  {item?.userName}
                </div>
                <p className="py-1 relative w-full">{item?.reviewText}</p>
              </div>
            );
          })
        ) : (
          <p className="text-center">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Review;
