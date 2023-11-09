"use client";
import React, { useState, useEffect } from "react";
import PaymentForm from "@components/PaymentForm";

import Link from "next/link";
import Image from "next/image";
import Skeleton from "@components/skeleton";
import Navbar from "@components/navbar";
import { useParams, useSearchParams } from "next/navigation";
import CardsPopUp from "@components/CardsPopUp";
import ReviewPopUp from "@components/ReviewPopUp";
import Login from "@components/login";
const Service = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const chatPopupStyle = {
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    zIndex: isOpen ? 100 : -1,
  };

  const [token, setToken] = useState(null);
  useEffect(() => {
    const user = window.sessionStorage.getItem("Token");
    setToken(user);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const params = useParams();
  const searchParams = useSearchParams();

  const typeId = searchParams.get("id");

  const fetchCardProducts = async () => {
    try {
      const response = await fetch(`/api/cards/${typeId}`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();

        // Filter out products with empty CardCodes
        const filteredData = data.filter(
          (item) => item.cardCodes && item.cardCodes.length > 0
        );
        setFilteredProducts(filteredData);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCardProducts();
  }, [typeId]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //? heandel

  const handleSendClick = (product) => {
    if (token) {
      setSelectedProduct(product);
      togglePopup(); // Open the popup
    } else {
      document.getElementById("loginpage").classList.add("flex");
      document.getElementById("loginpage").classList.remove("hidden");
      console.log(document.getElementById("loginpage"));
    }
  };
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const handleCardCodeSent = () => {
    // Card code sent, close card popup, and show review popup
    togglePopup(); // Close card popup
    setSelectedProduct(null);
    setShowReviewPopup(true); // Show review popup
  };
  const ReviewPopupStyle = {
    transform: showReviewPopup ? "translateX(0)" : "translateX(100%)",
    zIndex: showReviewPopup ? 100 : -1,
  };
  return (
    <div className=" mb-16">
      <Navbar />
      <Login />
      <h1
        className="text-4xl font-bold  mt-16 mb-4 text-center gradientx h-14"
        id="menu"
      >
        {filteredProducts[0]?.categoryName}
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[...Array(4)].map((_, index) => (
            <div className="h-screen" key={index}>
              <Skeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-4">
          {filteredProducts.map((item) => (
            <div
              className="flex flex-col justify-between h-full p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl"
              key={item._id}
            >
              <div
                style={{
                  backgroundImage: `url(/uploads/${item.image})`,
                  backgroundSize: "cover",
                  borderRadius: "5px",
                }}
                className="rounded-lg hover:scale-110 transition-all h-[200px] h-sm-[270px] h-md-[200px] h-lg-[270px]"
              ></div>
              <h1 className="text-xl font-bold mt-4 text-blue-700">
                {item.name}
              </h1>
              <h1 className="text-xl font-bold mt-4 text-green-600 ">
                {item.price}
              </h1>
              <button
                onClick={() => handleSendClick(item)}
                className="py-2 px-8 sm:px-6 mt-4 text-blue-700 bg-transparent border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300"
              >
                اشتري الآن
              </button>{" "}
              {isOpen && selectedProduct && (
                // <PaymentForm
                //   style={chatPopupStyle}
                //   onClose={() => togglePopup()}
                // />
                <CardsPopUp
                  onClose={() => {
                    togglePopup();
                    setSelectedProduct(null);
                  }}
                  style={chatPopupStyle}
                  product={selectedProduct}
                  Token={token}
                  onCardCodeSent={handleCardCodeSent} // Pass a function to notify card code sent
                />
              )}
            </div>
          ))}
        </div>
      )}
      {showReviewPopup && (
        <ReviewPopUp
          onClose={() => setShowReviewPopup(false)}
          style={ReviewPopupStyle}
        />
      )}
    </div>
  );
};

export default Service;
