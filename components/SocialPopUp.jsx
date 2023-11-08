"use client";
import React, { useState } from "react";
import { IconBrandWechat } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const Popup = ({ onClose, style, product, Token, selectedOption }) => {
   const showSucces = () => {
      toast.success("Message sent successfully");
   };
   console.log("option : ", selectedOption);
   console.log("product", product);
   console.log("token", Token);
   const [isOpen, setIsOpen] = useState(false);
   const [formData, setFormData] = useState({
      email: "",
      link: "",
      selectedOption: selectedOption,
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
         link: formData.link,
         email: formData.email,
         product: product,
         Token: Token,
         selectedOption: selectedOption,

         // Send the selected product data
      };
      try {
         const response = await fetch("/api/orderSocial", {
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
                  email: "",
                  link: "",
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
                  <span className="text-xl font-semibold">
                     شراء {productname}{" "}
                  </span>
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
                        htmlFor="email"
                        className="block text-sm mb-2 font-medium text-gray-700"
                     >
                        الايميل:
                     </label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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
                        رابط حسابك / رابط المنشور:
                     </label>
                     <input
                        type="text"
                        id="link"
                        name="link"
                        placeholder="test@gmail.com"
                        title="لزيادة المتابعين يرجى وضع رابط الحساب لزيادة اللايكات و التعليقات يرجى وضع رابط المنشور"
                        value={formData.link}
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
