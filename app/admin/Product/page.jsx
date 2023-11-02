"use client";
import React, { useState } from "react";
import SideBar from "@components/sidebar";
import SocialMedia from "@components/adminComponents/socialmedia";
import CardService from "@components/adminComponents/cardservice";

const products = [
   {
      name: "زيادة الإعجابات على إنستغرام",
      category: "وسائل التواصل الاجتماعي",
      type: "خدمات إنستغرام",
   },
   {
      name: "تصميم بطاقة العمل",
      category: "بطاقة المنتج",
      type: "خدمات التصميم",
   },
   {
      name: "حملة إعلانية على فيسبوك",
      category: "وسائل التواصل الاجتماعي",
      type: "خدمات فيسبوك",
   },
   {
      name: "تيشيرت مخصص",
      category: "بطاقة المنتج",
      type: "الملابس",
   },
   {
      name: "متابعون على تويتر",
      category: "وسائل التواصل الاجتماعي",
      type: "خدمات تويتر",
   },
];

const Page = () => {
   const [selectedCategory, setSelectedCategory] = useState("");
   const [selectedType, setSelectedType] = useState("");
   const [selectedProduct, setSelectedProduct] = useState("");

   const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      setSelectedType("");
   };

   const handleTypeChange = (type) => {
      setSelectedType(type);
   };

   const filteredProducts = products.filter((product) => {
      if (selectedCategory === "" && selectedType === "") {
         return true;
      } else if (selectedCategory === "" && selectedType !== "") {
         return product.type === selectedType;
      } else if (selectedCategory !== "" && selectedType === "") {
         return product.category === selectedCategory;
      } else {
         return (
            product.category === selectedCategory &&
            product.type === selectedType
         );
      }
   });

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
                     <option value="الكل">الكل</option>
                     <option value="خدمات إنستغرام">خدمات إنستغرام</option>
                     <option value="خدمات التصميم">خدمات التصميم</option>
                     <option value="خدمات فيسبوك">خدمات فيسبوك</option>
                     <option value="الملابس">الملابس</option>
                     <option value="خدمات تويتر">خدمات تويتر</option>
                  </select>
               </div>
               {/* <div className="my-4">
               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  بحث
               </button>
            </div> */}
            </div>
            <div className="my-4">
               {selectedCategory == "وسائل التواصل الاجتماعي" ? (
                  <SocialMedia
                     productName={selectedProduct}
                     type={selectedCategory}
                     category={selectedType}
                  />
               ) : selectedCategory == "" ? (
                  <div>لا يوجد منتجات</div>
               ) : (
                  <CardService
                     productName={selectedProduct}
                     type={selectedCategory}
                     category={selectedType}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default Page;
