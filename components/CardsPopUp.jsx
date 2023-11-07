"use client";
import React, { useState } from "react";
import { IconBrandWechat } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const Popup = ({ onClose, style, product }) => {
  const showSucces = () => {
    toast.success("Message sent successfully");
  };
  const [isOpen, setIsOpen] = useState(false);
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
    e.preventDefault();
    const emailData = {
      name: formData.name,
      email: formData.email,
      product: product,

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
        showSucces();
        console.log("Email sent successfully");
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
          });
        }, 500);
        onClose();
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
            >
              ارسال
            </button>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
