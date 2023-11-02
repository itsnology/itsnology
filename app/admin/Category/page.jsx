"use client";
import React, { useState } from "react";
import SideBar from "@components/sidebar";

import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    logoFile: null,
    bannerFile: null,
    isSocialMedia: false,
  });

   const [categoryData, setCategoryData] = useState([
      {
         categoryName: " خدمات الانستغرام ",
         categoryBanner: " بانر الانستغرام ",
         categoryLogo: " لوغو الانستغرام",
      },
      {
         categoryName: "Category 2",
         categoryBanner: "Banner 2",
         categoryLogo: "Logo 2",
      },
      // Add more category data as needed
   ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

   const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      setFormData({
         ...formData,
         logoFile: file,
      });
   };

   const handleBannerUpload = (e) => {
      const file = e.target.files[0];
      setFormData({
         ...formData,
         bannerFile: file,
      });
   };

   const showSuccess = () => {
      toast.success("تمت إضافة الخدمة بنجاح");
   };

  const handleAddCategory = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("logoFile", formData.logoFile);
    data.append("bannerFile", formData.bannerFile);
    data.append("isSocialMedia", formData.isSocialMedia);
    console.log(data);

      try {
         const response = await fetch("/api/addCategory", {
            method: "POST",
            body: data,
         });

      if (response.ok) {
        showSuccess();
        const newCategory = await response.json();
        setCategoryData([...categoryData, newCategory]);
        setFormData({
          name: "",
          logoFile: null,
          bannerFile: null,
        });
      } else {
        console.error("فشل إضافة الخدمة");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

   const handleEditCategory = (categoryIndex) => {
      // Set the category you want to edit
      const editingCategory = categoryData[categoryIndex];
      setFormData({
         name: editingCategory.categoryName,
         logoFile: null,
         bannerFile: null,
         editingIndex: categoryIndex,
      });
   };

   const handleSaveChanges = () => {
      // Implement the logic for saving the edited category here
      if (formData.editingIndex !== undefined) {
         const updatedCategories = [...categoryData];
         const updatedCategoryIndex = formData.editingIndex;

         updatedCategories[updatedCategoryIndex] = {
            categoryName: formData.name,
            categoryBanner: "Updated Banner", // Update with your logic
            categoryLogo: "Updated Logo", // Update with your logic
         };
         setCategoryData(updatedCategories);
      }

      // Reset the form
      setFormData({
         name: "",
         logoFile: null,
         bannerFile: null,
      });
   };

   const handleDiscardChanges = () => {
      // Reset the form
      setFormData({
         name: "",
         logoFile: null,
         bannerFile: null,
      });
   };

   const handleDeleteCategory = (categoryIndex) => {
      // Implement the logic for deleting the category at the specified index
      const updatedCategories = [...categoryData];
      updatedCategories.splice(categoryIndex, 1);
      setCategoryData(updatedCategories);
   };

   return (
      <div className="flex md:flex-row ">
         <SideBar />
         <div className="flex mx-auto mt-28 lg:ms-8 flex-col">
            <div className="flex-col flex ">
               <div className="justify-center flex">
                  {" "}
                  <p className="text-6xl font-semibold text-sky-950 mb-4">
                     {" "}
                     إدارة الخدمات
                  </p>
               </div>

               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleSaveChanges();
                  }}
                  method="POST"
                  className="mt-4 flex items-center flex-col lg:flex-row"
               >
                  <div className="me-2 mb-1">
                     <label
                        htmlFor="name"
                        className="block text-sm mb-2 font-medium text-gray-700"
                     >
                        إسم الخدمة
                     </label>
                     <input
                        type="text"
                        id="name"
                        placeholder="  إسم الخدمة"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-64 p-2 border rounded-full focus:outline-blue-400"
                        required
                        disabled={formData.editingIndex !== undefined}
                     />
                  </div>

                  <div className="me-2 mb-1">
                     <label
                        htmlFor="logo"
                        className="block text-sm mb-2 font-medium text-gray-700"
                     >
                        لوغو الخدمة
                     </label>
                     <input
                        type="file"
                        id="logo"
                        name="لوغو الخدمة"
                        onChange={handleLogoUpload}
                        className="w-64 p-2 border rounded-full focus:outline-blue-400"
                        disabled={formData.editingIndex !== undefined}
                     />
                  </div>

            <div className="me-2 mb-1">
              <label
                htmlFor="banner"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                بانر الخدمة
              </label>
              <input
                type="file"
                id="banner"
                name="بانر الخدمة"
                onChange={handleBannerUpload}
                className="w-64 p-2 border rounded-full focus:outline-blue-400"
                disabled={formData.editingIndex !== undefined}
              />
            </div>
            <div className="me-2 ms-2 mb-5">
              <label
                htmlFor="isSocialMedia"
                className="block text-sm mb-5 font-medium text-gray-700"
              >
                خدمة سوشل ميديا؟
              </label>
              <input
                type="checkbox"
                id="isSocialMedia"
                name="isSocialMedia"
                checked={formData.isSocialMedia}
                onChange={handleInputChange}
                className="rounded-full mx-auto flex w-6 h-6 focus:outline-blue-400"
              />
            </div>

                  <div className="flex mt-4">
                     <button
                        type="submit"
                        onClick={handleAddCategory}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none me-2"
                     >
                        إضافة
                     </button>
                  </div>
               </form>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
               <div className="items-start justify-between md:flex">
                  <div className="max-w-xl mt-4">
                     <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        الخدمات المتوفرة
                     </h3>
                  </div>
               </div>
               <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                  <table className="w-full table-auto text-sm text-right">
                     <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                           <th className="py-3 px-6">إسم الخدمة</th>
                           <th className="py-3 px-6"> بانر الخدمة</th>
                           <th className="py-3 px-6">لوغو الخدمة</th>
                           <th className="py-3 px-6"></th>
                        </tr>
                     </thead>
                     <tbody className="text-gray-600 divide-y">
                        {categoryData.map((category, idx) => (
                           <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {formData.editingIndex === idx ? (
                                    <input
                                       type="text"
                                       placeholder="  إسم الخدمة"
                                       name="name"
                                       value={formData.name}
                                       onChange={handleInputChange}
                                       className="w-40 p-2 border rounded-full focus:outline-blue-400"
                                    />
                                 ) : (
                                    category.categoryName
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {formData.editingIndex === idx ? (
                                    <input
                                       type="file"
                                       name="لوغو الخدمة"
                                       onChange={handleLogoUpload}
                                       className="w-52 p-2 border rounded-full focus:outline-blue-400"
                                    />
                                 ) : (
                                    category.categoryBanner
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {formData.editingIndex === idx ? (
                                    <input
                                       type="file"
                                       name="بانر الخدمة"
                                       onChange={handleBannerUpload}
                                       className="w-52 p-2 border rounded-full focus:outline-blue-400"
                                    />
                                 ) : (
                                    category.categoryLogo
                                 )}
                              </td>
                              <td className="text-right px-6 whitespace-nowrap">
                                 {formData.editingIndex === idx ? (
                                    <>
                                       <button
                                          type="button"
                                          onClick={handleSaveChanges}
                                          className="bg-green-500 text-white px-4 py-2 rounded-full me-2 focus:outline-none"
                                       >
                                          Save Changes
                                       </button>
                                       <button
                                          type="button"
                                          onClick={handleDiscardChanges}
                                          className="bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none"
                                       >
                                          Discard Changes
                                       </button>
                                    </>
                                 ) : (
                                    <>
                                       <button
                                          type="button"
                                          onClick={() =>
                                             handleEditCategory(idx)
                                          }
                                          className="bg-blue-500 text-white px-4 py-2 rounded-full me-2 focus:outline-none"
                                          disabled={
                                             formData.editingIndex !== undefined
                                          }
                                       >
                                          Edit
                                       </button>
                                       <button
                                          type="button"
                                          onClick={() =>
                                             handleDeleteCategory(idx)
                                          }
                                          className="bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none"
                                          disabled={
                                             formData.editingIndex !== undefined
                                          }
                                       >
                                          Delete
                                       </button>
                                    </>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Page;
