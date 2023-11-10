"use client";
import React, { useState } from "react";
import { IconX } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";

const Popup = ({ onClose, style, product, Token, onCardCodeSent }) => {
  const [buttonClicked, setButtonClicked] = useState(false); // Set initial state to false

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const productname = product.name;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setButtonClicked(true);

    e.preventDefault();
    const emailData = {
      name: formData.name,
      email: formData.email,
      product: product,
      Token: Token,

      // Send the selected product data
    };
    try {
      const response = await fetch("/api/Codes/SendCodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        onClose();
        onCardCodeSent();
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 ">
      <div
        className="fixed bottom-20 right-10 bg-white md:w-1/2 lg:w-1/4 w-full  p-4 border shadow-lg rounded-t-lg popup-transition "
        style={style}
      >
        <div className="contact-form">
          <div className="chat-header flex justify-between items-center">
            <span className="text-xl font-semibold">شراء {productname} </span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <IconX />
            </button>
          </div>
          <form onSubmit={handleSubmit} method="POST" className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                الإسم:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border  rounded-full focus:outline-blue-400 "
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                الإيميل:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="test@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-full focus:outline-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
              disabled={buttonClicked}
            >
              {buttonClicked ? "إنتظر قليلا..." : "ارسال"}
            </button>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
