"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@components/navbar";
import Login from "@components/login";
import { useParams, useSearchParams } from "next/navigation";
import SocialPopUp from "@components/SocialPopUp";
import { GoSell } from "@tap-payments/gosell";
import PaymentForm from "@components/PaymentForm";
const Productidea = () => {
   const [isOpen, setIsOpen] = useState(false);
   const searchParams = useSearchParams();
   const typeId = searchParams.get("id");
   const [dataFromChild, setDataFromChild] = useState(null);

   useEffect(() => {
      GoSell.showResult({
         callback: (response) => {
            console.log("callback", response);
            setDataFromChild(response);
         },
      });
   }, []);

   console.log("dataFromChild", dataFromChild);

   console.log(dataFromChild);
   const togglePopup = () => {
      setIsOpen(!isOpen);
   };
   const chatPopupStyle = {
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      zIndex: isOpen ? 100 : -1,
   };
   const [token, setToken] = useState(null);

   useEffect(() => {
      const user = JSON.parse(window.sessionStorage.getItem("Token"));
      setToken(user);
      console.log("user name: ", user.email);
   }, []);

   const [filteredProduct, setFilteredProduct] = useState([
      {
         options: [],
      },
   ]);
   console.log(filteredProduct);

   const params = useParams();

   const fetchSocialProduct = async () => {
      try {
         const response = await fetch(`/api/social/${typeId}`, {
            cache: "no-store",
         });
         if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Filter out products with empty CardCodes
            const filteredData = data.filter((item) => item.options.length > 0);

            // Filter the product with the same id as params.id
            const product = filteredData.find((item) => item._id === params.id);
            setFilteredProduct(product);
         } else {
            console.error("Failed to fetch categories");
         }
      } catch (error) {
         console.error("Error fetching categories:", error);
      }
   };

   useEffect(() => {
      fetchSocialProduct();
   }, []);

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

   const [selectedProduct, setSelectedProduct] = useState(null);
   const [selectedOption, setSelectedOption] = useState(null);

   const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
   };

   return (
      <>
         <Navbar />
         <Login />
         <GoSell />
         <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white rounded-lg shadow-lg overflow-hidden p-4 md:p-32 ">
            <div className="md:w-5/12 sm:pl-16 w-full">
               <div
                  style={{
                     backgroundImage: `url(/uploads/${filteredProduct.image})`,
                     backgroundSize: "cover",
                     borderRadius: "5px",

                     height: "500px",
                  }}
               ></div>
            </div>
            <div className="p-6 md:w-7/12 ">
               <h2 className="text-4xl font-bold mb-4  text-blue-700">
                  {filteredProduct.name}
               </h2>
               <p className="text-gray-700 text-base mb-4 min-h-[11rem]  ">
                  {filteredProduct.description}
               </p>
               <form>
                  <div className="mb-4">
                     <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="username"
                     >
                        اسم المستخدم على وسائل التواصل الاجتماعي
                     </label>
                     <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="رابط المنشور / رابط الحساب"
                     />
                  </div>
                  <div className="mb-4">
                     <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="options"
                     >
                        الخيارات
                     </label>

                     <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="options"
                        onChange={handleOptionChange}
                     >
                        <option disabled>اختر الخيار</option>{" "}
                        {filteredProduct.options?.map((option, index) => (
                           <option key={index} value={option.name}>
                              {option.name} - {option.price} ريال القطري
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="flex items-center justify-center">
                     <button
                        className="py-2 px-8 sm:px-6 mt-4 text-blue-700 bg-transparent border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300"
                        type="button"
                        onClick={() => handleSendClick(filteredProduct)}
                     >
                        اشتري الآن
                     </button>
                  </div>
               </form>
               {isOpen && selectedProduct && (
                  // <SocialPopUp
                  //    onClose={() => {
                  //       togglePopup();
                  //       setSelectedProduct(null);
                  //    }}
                  //    style={chatPopupStyle}
                  //    product={selectedProduct}
                  //    Token={token}
                  //    selectedOption={selectedOption}
                  // />

                  <PaymentForm
                     style={chatPopupStyle}
                     onClose={() => togglePopup()}
                     product={filteredProduct}
                     price={
                        filteredProduct.options.find(
                           (option) => option.name === selectedOption
                        )?.price
                     }
                  />
               )}
            </div>
         </div>
      </>
   );
};

export default Productidea;
