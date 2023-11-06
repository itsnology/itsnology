"use client";
import React, { useState, useEffect } from "react";
import SideBar from "@components/sidebar";
import { IconStarFilled } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [ReviewsData, setReviewsData] = useState([]);

  console.log(ReviewsData);

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const handleDeleteReview = (review) => {
    setReviewToDelete(review);
    setShowConfirmationPopup(true);
  };
  const showDelete = () => {
    toast.success("Review Deleted successfully", {
      icon: "👏",
    });
  };
  const confirmDelete = async () => {
    try {
      const response = await fetch("/api/Rating/DeleteRating", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: reviewToDelete }), // Pass the review ID to delete
      });

      if (response.ok) {
        showDelete();
        const updatedReviews = ReviewsData.filter(
          (review) => review.id !== reviewToDelete.id
        );
        setReviewsData(updatedReviews);
        window.location.reload();
      } else {
        console.error("Failed to delete the review");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setShowConfirmationPopup(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/Rating/GetRating", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();

          setReviewsData(data);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex md:flex-row">
      <SideBar />
      <div className="flex flex-col mr-8">
        <div className="justify-center flex lg:mt-16 md:mt-16 mb-20 mt-20 lg:mr-96 md:mr-44">
          <p className="text-6xl font-semibold text-sky-950">إدارة التقييمات</p>
        </div>
        <div className="flex flex-wrap">
          {ReviewsData.map((review, index) => (
            <div
              key={index}
              className=" relative ml-6 mb-6 h-56 w-48 p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl px-8 py-4 "
            >
              <div className="flex items-center flex-col">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {review.name}
                  </h2>
                  <div className="flex items-center mb-4" dir="ltr">
                    {[...Array(review.RatingStars)].map((_, index) => (
                      <IconStarFilled
                        key={index}
                        className="w-5 h-5 text-orange-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 h-32 w-36 overflow-auto ">
                  {review.Review}
                </p>
              </div>
              <IconX
                onClick={() => handleDeleteReview(review._id)}
                className="w-4 h-4 absolute top-1 right-1 text-gray-700 hover:text-red-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {showConfirmationPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border shadow-lg rounded-lg">
          <p>هل أنت متأكد أنك تريد حذف هذا التقييم؟</p>
          <button
            onClick={() => confirmDelete()}
            className="ml-2 mt-3 py-1 px-5 bg-red-700 text-gray-100"
          >
            Yes
          </button>
          <Toaster />
          <button
            onClick={() => setShowConfirmationPopup(false)}
            className="ml-2 mt-3 py-1 px-4 bg-blue-700 text-gray-100"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
