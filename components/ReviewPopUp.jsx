import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IconX } from "@tabler/icons-react";
import StarRatings from "react-star-ratings";

const ReviewPopUp = ({ onClose, style }) => {
  const showSucces = () => {
    toast.success("Review sent successfully");
  };
  //   const togglePopup = () => {
  //     setIsOpen(!isOpen);
  //   };

  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);

    // Update the formData state with the new rating
    setFormData({
      ...formData,
      RatingStars: newRating,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    RatingStars: 0,
    Review: "",
  });
  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/Rating/SendRating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSucces();
        console.log("Email sent successfully");
        onClose();
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="fixed top-0 right-0 lg:top-36 lg:right-96 bg-white w-full md:w-1/2 lg:w-1/4 p-4 border shadow-lg rounded-t-lg popup-transition"
      style={style}
    >
      <div className="review-popup-content">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <IconX />
        </button>
        <form onSubmit={handleSubmit} method="POST" className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm mb-2 font-medium text-gray-700"
            >
              إسم المستخدم:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-full focus:outline-blue-400 "
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm mb-2 font-medium text-gray-700"
            >
              تقييم الخدمة:
            </label>
            <StarRatings
              rating={rating} // Add a 'rating' state variable for this
              starRatedColor="orange"
              changeRating={handleRatingChange} // Add a function to handle rating changes
              numberOfStars={5}
              starDimension="30px"
              starSpacing="5px"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="messageText"
              className="block text-sm mb-1 font-medium text-gray-700"
            >
              أضف تعليقا على خدمتنا:
            </label>
            <textarea
              id="Review"
              name="Review"
              value={formData.Review}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
          >
            ارسال
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default ReviewPopUp;
