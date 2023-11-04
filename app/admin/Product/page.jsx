"use client";
import React, { useState, useEffect } from "react";
import SideBar from "@components/sidebar";
import SocialMedia from "@components/adminComponents/socialmedia";
import CardService from "@components/adminComponents/cardservice";

const Page = () => {
   const [categoryData, setCategoryData] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [selectedType, setSelectedType] = useState("");
   const [selectedProduct, setSelectedProduct] = useState("");

   const fetchCategories = async () => {
      try {
         const response = await fetch("/api/category", { cach: "no-store" });
         if (response.ok) {
            const data = await response.json();

            setCategoryData(data); // Assuming the response has a "categories" field
         } else {
            console.error("Failed to fetch categories");
         }
      } catch (error) {
         console.error("Error fetching categories:", error);
      }
   };

   // Call fetchCategories when your component mounts
   useEffect(() => {
      fetchCategories();
   }, []);

   const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      setSelectedType("");
   };
   console.log("Categorie sgeged fetched:", categoryData);

   const handleTypeChange = (type) => {
      setSelectedType(type);
   };

   let isSocialMedia = true
      ? selectedCategory === "وسائل التواصل الاجتماعي"
      : false;

   return (
      <div className="flex md:flex-row">
         <SideBar />
         <div className=" flex flex-col mr-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto mt-28  flex-row  justify-center my-4 ">
               <div className="mx-4">
                  <label htmlFor="productName" className="text-right block">
                     اسم المنتج:
                  </label>
                  <input
                     type="text"
                     id="productName"
                     name="productName"
                     className="ml-2 border rounded py-2 px-3 text-right w-64"
                     value={selectedProduct}
                     onChange={(e) => setSelectedProduct(e.target.value)}
                  />
               </div>
               <div className="mx-4">
                  <label htmlFor="category" className="text-right block">
                     الفئة:
                  </label>
                  <select
                     id="category"
                     name="category"
                     className="ml-2 border rounded py-2 px-3 text-right"
                     value={selectedCategory}
                     onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                     <option value="" disabled></option>
                     <option value="وسائل التواصل الاجتماعي">
                        وسائل التواصل الاجتماعي
                     </option>
                     <option value="بطاقة المنتج">بطاقة المنتج</option>
                  </select>
               </div>
               <div className="mx-4">
                  <label htmlFor="type" className="text-right block">
                     النوع:
                  </label>
                  <select
                     id="type"
                     name="type"
                     className="ml-2 border rounded py-2 px-3 text-right"
                     value={selectedType}
                     onChange={(e) => handleTypeChange(e.target.value)}
                  >
                     <option value="" disabled></option>
                     {categoryData.map((category) => (
                        <option value={category.name} id={category._id}>
                           {category.name}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
            <div className="my-4">
               {isSocialMedia ? (
                  <SocialMedia
                     productName={selectedProduct}
                     type={selectedCategory}
                     categoryId={
                        categoryData.find(
                           (category) => category.name === selectedCategory
                        )?.id
                     }
                     categoryName={selectedCategory}
                  />
               ) : selectedCategory === "" ? (
                  <div>لا يوجد منتجات</div>
               ) : (
                  <CardService
                     productName={selectedProduct}
                     type={selectedType}
                     categoryId={
                        categoryData.find(
                           (category) => category.name === selectedCategory
                        )?.id
                     }
                     categoryName={selectedCategory}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default Page;
