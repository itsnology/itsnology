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
   const [filteredProducts, setFilteredProducts] = useState([]);
   const [addProduct, setAddProduct] = useState(false);

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

   const typeId = categoryData.find(
      (category) => category.name === selectedType
   )?._id;

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

   // Call fetchCategories when your component mounts
   useEffect(() => {
      fetchCategories();
   }, []);

   const handleCategoryChange = (category) => {
      setSelectedCategory(category);
   };

   const handleTypeChange = (type) => {
      setSelectedType(type);
   };

   const handleSearch = () => {
      fetchCardProducts();
   };

   let isSocialMedia = true
      ? selectedCategory === "وسائل التواصل الاجتماعي"
      : false;

   const handleDelete = (productId) => {
      // Delete the product with the given ID
   };

   const handleEdit = (productId) => {
      // Edit the product with the given ID
   };

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
                     {categoryData
                        .filter(
                           (category) =>
                              category.isSocialMedia === isSocialMedia
                        )
                        .map((category) => (
                           <option value={category.name} key={category._id}>
                              {category.name}
                           </option>
                        ))}
                  </select>
               </div>
            </div>
            <div className="my-4">
               <div className="flex justify-between">
                  <button
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                     onClick={handleSearch}
                  >
                     بحث
                  </button>
                  <button
                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                     onClick={() => setAddProduct(true)}
                  >
                     إضافة
                  </button>
               </div>
               {filteredProducts.length === 0 ? (
                  <div>لا يوجد منتجات</div>
               ) : (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                     {filteredProducts.map((product) => (
                        <div
                           key={product._id}
                           className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                           <div
                              style={{
                                 backgroundImage: `url(/uploads/${product.image})`,
                                 height: "200px",
                                 width: "200px",
                                 backgroundSize: "cover",
                              }}
                           ></div>
                           <div className="p-4">
                              <h2 className="font-bold text-2xl mb-2">
                                 {product.name}
                              </h2>
                              <p className="text-gray-700 text-base">
                                 {product.categoryName}
                              </p>
                              <div className="flex justify-between mt-4">
                                 <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(product._id)}
                                 >
                                    حذف
                                 </button>
                                 <button
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleEdit(product._id)}
                                 >
                                    تعديل
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
               {selectedCategory === "" && addProduct ? (
                  <div>لا يوجد منتجات</div>
               ) : (
                  <>
                     {isSocialMedia && selectedType !== "" && addProduct ? (
                        <SocialMedia
                           productName={selectedProduct}
                           type={selectedCategory}
                           categoryId={
                              categoryData.find(
                                 (category) => category.name === selectedType
                              )?.id
                           }
                           categoryName={selectedType}
                        />
                     ) : selectedType !== "" && addProduct ? (
                        <CardService
                           productName={selectedProduct}
                           categoryId={
                              categoryData.find(
                                 (category) => category.name === selectedType
                              )?._id
                           }
                           categoryName={selectedType}
                        />
                     ) : null}
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default Page;
