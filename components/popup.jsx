"use client";
import React, { useState } from "react";
import { IconBrandWechat } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const chatPopupStyle = {
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
  };

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
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        // Optionally, you can reset the form data here
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 p-4">
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-3 rounded-full focus:outline-none"
      >
        <IconBrandWechat />
      </button>
      <div
        className="fixed bottom-0 right-0 bg-white md:w-1/2 lg:w-1/4 w-full  p-4 border shadow-lg rounded-t-lg popup-transition"
        style={chatPopupStyle}
      >
        <div className="contact-form">
          <div className="chat-header flex justify-between items-center">
            <span className="text-xl font-semibold">
              للتواصل مع الدعم الفني
            </span>
            <button
              onClick={togglePopup}
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
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                الموضوع:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-full focus:outline-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm mb-1 font-medium text-gray-700"
              >
                الرسالة:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
            >
              ارسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
