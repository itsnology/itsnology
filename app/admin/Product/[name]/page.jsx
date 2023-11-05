"use client";
import React, { useState, useEffect } from "react";
import SideBar from "@components/sidebar";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
   const [formData, setFormData] = useState({
      name: "",
      logoFile: null,
      bannerFile: null,
      isSocialMedia: false,
      editingIndex: undefined,
   });

   //! fetch All categories

   const [categoryData, setCategoryData] = useState([]);

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

   // Now, categoryData should be an array of categories

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

   //! Add a category

   const handleAddCategory = async () => {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("logoFile", formData.logoFile);
      data.append("bannerFile", formData.bannerFile);
      data.append("isSocialMedia", formData.isSocialMedia);

      try {
         const response = await fetch("/api/category/addCategory", {
            method: "POST",
            body: data,
         });

         if (response.status === 200) {
            showSuccess();
         } else {
            console.error("فشل إضافة الخدمة");
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   //! Edit a category
   const useSearchParam = useSearchParams();
   const catid = useSearchParam.get("id");

   const router = useRouter();

   const EditSubmit = async (e) => {
      // Add your logic for handling form submission here
      const data = new FormData();
      data.append("name", formData.name);
      data.append("logoFile", formData.logoFile);
      data.append("bannerFile", formData.bannerFile);
      data.append("isSocialMedia", formData.isSocialMedia);

      if (!formData.editingIndex) return alert("No editing index");
      try {
         const res = await fetch(`/api/category/editCat/${catid}`, {
            method: "PATCH",
            body: data,
         });

         if (res.ok) {
            router.push("/admin/Category");
         }
      } catch (error) {
         console.log(error);
      }
   };

   //!delete buttons

   const deletePrompt = async (category) => {
      try {
         const confirm = await Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من التراجع عن هذا!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "نعم، احذفه!",
         });

         if (confirm.isConfirmed) {
            const response = await fetch(
               `/api/category/editCat/${category._id}`,
               {
                  method: "DELETE",
               }
            );

            if (response.ok) {
               const filteredCategories = categoryData.filter(
                  (item) => item._id !== category._id
               );
               setCategoryData(filteredCategories);
               Swal.fire("تم الحذف!", "تم حذف الفئة الخاصة بك.", "success");
            } else {
               throw new Error("فشل في حذف الفئة.");
            }
         }
      } catch (error) {
         console.error(error);
         Swal.fire("خطأ", "حدث خطأ أثناء حذف الفئة.", "error");
      }
   };
   //! Edit button

   const handleEditCategory = (categoryId) => {
      router.push(`/admin/Category?id=${categoryId}`);
      const category = categoryData.find((cat) => cat._id === categoryId);
      setFormData({
         name: category.name,
         logoFile: category.logoFile,
         bannerFile: category.bannerFile,
         isSocialMedia: category.isSocialMedia,
         editingIndex: categoryId,
      });
   };

   const handleCancelEdit = () => {
      router.push("/admin/Category");
      setFormData({
         name: "",
         logoFile: null,
         bannerFile: null,
         isSocialMedia: false,
         editingIndex: undefined,
      });
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
                  encType="multipart/form-data"
                  onSubmit={(e) => {
                     e.preventDefault();
                     if (formData.editingIndex !== undefined) {
                        EditSubmit();
                     } else {
                        handleAddCategory();
                     }
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
                        required
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
                        required
                        className="w-64 p-2 border rounded-full focus:outline-blue-400"
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none me-2"
                     >
                        {formData.editingIndex !== undefined
                           ? "تعديل"
                           : "إضافة"}
                     </button>
                     {formData.editingIndex !== undefined && (
                        <button
                           type="button"
                           className="bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none"
                           onClick={handleCancelEdit}
                        >
                           إلغاء التعديل
                        </button>
                     )}
                     <Toaster />
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
                                 {category.editingIndex === idx ? (
                                    <input
                                       type="text"
                                       placeholder="  إسم الخدمة"
                                       name="name"
                                       value={formData.name}
                                       onChange={handleInputChange}
                                       className="w-40 p-2 border rounded-full focus:outline-blue-400"
                                    />
                                 ) : (
                                    category.name
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {category.editingIndex === idx ? (
                                    <input
                                       type="file"
                                       name="لوغو الخدمة"
                                       onChange={handleLogoUpload}
                                       className="w-52 p-2 border rounded-full focus:outline-blue-400"
                                    />
                                 ) : (
                                    <div
                                       style={{
                                          backgroundImage: `url(/uploads/${category.logoFile})`,
                                          height: "100px",
                                          width: "100px",
                                          backgroundSize: "cover",
                                       }}
                                    ></div>
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 {category.editingIndex === idx ? (
                                    <input
                                       type="file"
                                       name="بانر الخدمة"
                                       onChange={handleBannerUpload}
                                       className="w-52 p-2 border rounded-full focus:outline-blue-400"
                                    />
                                 ) : (
                                    <div
                                       style={{
                                          backgroundImage: `url(/uploads/${category.bannerFile})`,
                                          height: "100px",
                                          width: "100px",
                                          backgroundSize: "cover",
                                       }}
                                    ></div>
                                 )}
                              </td>
                              <td className="text-right px-6 whitespace-nowrap">
                                 {category.editingIndex === idx ? (
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
                                             handleEditCategory(category._id)
                                          }
                                          className="bg-blue-500 text-white px-4 py-2 rounded-full me-2 focus:outline-none"
                                       >
                                          Edit
                                       </button>
                                       <button
                                          type="button"
                                          onClick={() => deletePrompt(category)}
                                          className="bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none"
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
