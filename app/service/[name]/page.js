"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@components/skeleton";
import Navbar from "@components/navbar";
import { useParams, useSearchParams } from "next/navigation";
import CardsPopUp from "@components/CardsPopUp";
const Service = () => {
   const [isOpen, setIsOpen] = useState(false);

   const togglePopup = () => {
      setIsOpen(!isOpen);
   };

   const chatPopupStyle = {
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      zIndex: isOpen ? 100 : -1,
   };

   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
   console.log(filteredProducts);
   const params = useParams();
   const searchParams = useSearchParams();

   const typeId = searchParams.get("id");

   const fetchCardProducts = async () => {
      try {
         const response = await fetch(`/api/cards/${typeId}`, {
            cach: "no-store",
         });
         if (response.ok) {
            const data = await response.json();

            setFilteredProducts(data); // Assuming the response has a "categories" field
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

   const handleSendClick = (product) => {
      setSelectedProduct(product);
      togglePopup(); // Open the popup
   };

   return (
      <div className=" mb-16">
         <Navbar />
         <h1
            className="text-4xl font-bold  mt-16 mb-4 text-center gradientx h-14"
            id="menu"
         >
            {filteredProducts[0]?.categoryName}
         </h1>

         {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
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
                     className="flex flex-col  justify-between h-full p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl  "
                     key={item._id}
                  >
                     <div
                        style={{
                           backgroundImage: `url(/uploads/${item.image})`,

                           backgroundSize: "cover",
                           borderRadius: "5px",
                        }}
                        className="rounded-lg hover:scale-110 transition-all h-[200px] h-sm-[270px] h-md-[200px] h-lg-[270px] "
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
                        <CardsPopUp
                           onClose={() => {
                              togglePopup();
                              setSelectedProduct(null);
                           }}
                           style={chatPopupStyle}
                           product={selectedProduct}
                        />
                     )}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Service;
