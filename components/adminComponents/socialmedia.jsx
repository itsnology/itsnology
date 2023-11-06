"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const SocialMedia = ({
   categoryName,
   categoryId,
   productName,
   editing,
   filteredProduct,
}) => {
   const [count, setCount] = useState(0);

   const [isEditing, setIsEditing] = useState(editing); // add state for editing
   const [options, setOptions] = useState([{ name: "", price: "" }]);

   const router = useRouter();

   const [formData, setFormData] = useState({
      category: categoryId || filteredProduct?.category,
      categoryName: categoryName || filteredProduct?.categoryName,
      name: productName || filteredProduct?.name,
      options: filteredProduct?.options || [],
      description: filteredProduct?.description || "", // add description field to formData
      image: null,
   });

   console.log("formData", formData);

   useEffect(() => {
      if (filteredProduct) {
         setOptions(filteredProduct.options);
      }
   }, [filteredProduct]);

   useEffect(() => {
      setCount(options.length);
   }, [options]);

   const handleAddProduct = async () => {
      const data = new FormData();
      data.append("category", categoryId);
      data.append("categoryName", categoryName);
      data.append("name", formData.name);
      data.append("description", formData.description); // add description to form data

      data.append("image", formData.image);
      data.append("options", JSON.stringify(options));

      const showSuccess = () => {
         toast.success("تمت إضافة الخدمة بنجاح");
      };

      try {
         const response = await fetch("/api/social/addCard", {
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
      data.append("description", formData.description); // add description to form data

      data.append("image", formData.image);
      data.append("options", JSON.stringify(options));

      const showSuccess = () => {
         toast.success("تم تعديل الخدمة بنجاح");
         window.location.reload();
      };

      try {
         const response = await fetch(
            `/api/social/editCat/${filteredProduct._id}`,
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

   const handleDescriptionChange = (e) => {
      // add function to handle description change
      setFormData({
         ...formData,
         description: e.target.value,
      });
   };

   const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      setFormData({
         ...formData,
         image: file,
      });
   };

   const handleOptionChange = (index, event) => {
      const newOptions = [...options];
      newOptions[index][event.target.name] = event.target.value;
      setOptions(newOptions);
   };

   const handleAddOption = () => {
      setOptions([...options, { name: "", price: "" }]);
   };

   const handleRemoveOption = (index) => {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
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
                        {count} خيار
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6"></div>
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
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="description"
                  >
                     وصف المنتج
                  </label>
                  <textarea
                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     id="description"
                     type="text"
                     placeholder="وصف المنتج"
                     value={formData.description}
                     onChange={handleDescriptionChange}
                     required
                  />
               </div>
            </div>
            {options.map((option, index) => (
               <div key={index} className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-1/2 px-3">
                     <input
                        className="ml-2 border rounded py-2 px-3 text-right w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        name="name"
                        type="text"
                        placeholder="أدخل اسم الخيار"
                        value={option.name}
                        onChange={(event) => handleOptionChange(index, event)}
                        required // make input required
                     />
                  </div>
                  <div className="w-1/2 px-3">
                     <input
                        className="ml-2 border rounded py-2 px-3 text-right w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        name="price"
                        type="text"
                        placeholder="أدخل سعر الخيار"
                        value={option.price}
                        onChange={(event) => handleOptionChange(index, event)}
                        required // make input required
                     />
                  </div>
                  <div className="w-1/2 px-3">
                     <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        onClick={() => handleRemoveOption(index)}
                     >
                        حذف
                     </button>
                  </div>
               </div>
            ))}
            <div className="flex justify-center">
               <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  onClick={handleAddOption}
               >
                  إضافة خيار
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

export default SocialMedia;
