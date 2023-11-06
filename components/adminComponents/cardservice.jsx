"use client";
import { useRouter } from "next/navigation";
import { root } from "postcss";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const CardService = ({
   categoryName,
   categoryId,
   productName,
   editing,
   filteredProduct,
}) => {
   const [codes, setCodes] = useState([] || filteredProduct.cardCodes);
   const [count, setCount] = useState(0);
   const [photo, setPhoto] = useState(null);
   const [isEditing, setIsEditing] = useState(editing); // add state for editing

   const router = useRouter();

   const [formData, setFormData] = useState({
      category: categoryId || filteredProduct?.category,
      categoryName: categoryName || filteredProduct?.categoryName,
      name: productName || filteredProduct?.name,
      price: "" || filteredProduct?.price,
      cardCodes: [] || filteredProduct?.cardCodes,
      image: null,
   });

   console.log("formData", formData);

   const handleAddProduct = async () => {
      const data = new FormData();
      data.append("category", categoryId);
      data.append("categoryName", categoryName);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("cardCodes", JSON.stringify(codes));
      data.append("image", formData.image);

      const showSuccess = () => {
         toast.success("تمت إضافة الخدمة بنجاح");
      };

      try {
         const response = await fetch("/api/cards/addCard", {
            method: "POST",
            body: data,
         });

         if (response.status === 200) {
            showSuccess();
            window.location.reload();
         } else {
            console.error("فشل إضافة المنتج");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   const handleEditProduct = async () => {
      // add function for editing product

      const data = new FormData();
      data.append("category", categoryId);
      data.append("categoryName", categoryName);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("cardCodes", JSON.stringify(codes)); // Store the array as a JSON string
      data.append("image", formData.image);

      const showSuccess = () => {
         toast.success("تم تعديل الخدمة بنجاح");
      };

      try {
         const response = await fetch(
            `/api/cards/editCat/${filteredProduct._id}`,
            {
               // use categoryId for editing
               method: "PATCH", // use PATCH method for editing
               body: data,
            }
         );

         if (response.status === 200) {
            showSuccess();
            router.push("/admin/Product");
         } else {
            console.error("فشل تعديل المنتج");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   const handleNameChange = (e) => {
      setFormData({
         ...formData,
         name: e.target.value,
      });
   };

   const handlePriceChange = (e) => {
      setFormData({
         ...formData,
         price: e.target.value,
      });
   };

   const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      setFormData({
         ...formData,
         image: file,
      });
   };

   const handleCodeChange = (e, index) => {
      const newCodes = [...codes];
      newCodes[index] = e.target.value;
      setCodes(newCodes);
      setFormData({
         ...formData,
         cardCodes: newCodes,
      });
   };

   const handleAddCode = () => {
      setCodes([...codes, ""]);
      setCount(count + 1); // increment count when a code is added
      setFormData({
         ...formData,
         cardCodes: [...formData.cardCodes, ""], // Update cardCodes in formData
      });
   };

   const handleDeleteCode = (index) => {
      const list = [...codes];
      list.splice(index, 1);
      setCodes(list);
      setCount(count - 1); // decrement count when a code is deleted
      setFormData({
         ...formData,
         cardCodes: list,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (isEditing) {
         // check if editing
         handleEditProduct();
      } else {
         handleAddProduct();
      }
   };

   // const category = filteredProduct.find((cat) => cat._id === categoryId);

   // if (filteredProduct && isEditing) {
   //    setFormData({
   //       name: filteredProduct.name,
   //       cardCodes: filteredProduct.cardCodes,
   //       price: filteredProduct.price,
   //       image: filteredProduct.image,
   //    });
   // }

   const handleCancelEdit = () => {
      setIsEditing(false);
      router.push("/admin/Product");
   };

   return (
      <div className="flex flex-col  justify-center py-2">
         <h1 className="text-2xl font-bold mb-4">
            {isEditing ? "تعديل" : "إضافة"} منتج لخدمات لـ{" "}
            {formData.categoryName}{" "}
            {/* change heading based on editing state */}
         </h1>
         <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0  ">
                  <label
                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="name"
                  >
                     اسم المنتج
                  </label>
                  <div className="flex">
                     <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mx-4"
                        id="name"
                        type="text"
                        placeholder="اسم المنتج"
                        value={formData.name}
                        onChange={handleNameChange}
                        required
                     />

                     <p className="appearance-none block   bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {count}كود
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="price"
                  >
                     السعر
                  </label>
                  <input
                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     id="price"
                     type="number"
                     placeholder="سعر البطاقة"
                     value={formData.price}
                     onChange={handlePriceChange}
                     required
                  />
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="photo"
                  >
                     صورة
                  </label>
                  <input
                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     id="photo"
                     type="file"
                     placeholder="صورة البطاقة"
                     onChange={handlePhotoChange}
                     required
                  />
               </div>
            </div>
            {codes.map((code, index) => (
               <div key={index} className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                     <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor={`code-${index}`}
                     >
                        الكود {index + 1}
                     </label>
                     <div className="flex">
                        <input
                           className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mx-4"
                           id={`code-${index}`}
                           type="text"
                           placeholder={`الكود ${index + 1}`}
                           value={code}
                           onChange={(e) => handleCodeChange(e, index)}
                        />
                        <button
                           type="button"
                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                           onClick={() => handleDeleteCode(index)}
                        >
                           حذف
                        </button>
                     </div>
                  </div>
               </div>
            ))}
            <div className="flex justify-center">
               <button
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddCode} // call the function when the button is clicked
               >
                  إضافة كود
               </button>
            </div>
            <div className="flex justify-center mt-6">
               <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
               >
                  {isEditing ? "تعديل" : "إضافة"} المنتج{" "}
                  {/* change button text based on editing state */}
               </button>
               {isEditing && ( // show cancel button only when editing
                  <button
                     type="button"
                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                     onClick={handleCancelEdit}
                  >
                     إلغاء التعديل
                  </button>
               )}
            </div>
            <Toaster />
         </form>
      </div>
   );
};

export default CardService;
