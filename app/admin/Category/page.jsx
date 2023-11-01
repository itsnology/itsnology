"use client";
import React, { useState } from "react";
import SideBar from "@components/sidebar";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    toast.success("Message sent successfully");
  };

  const [formData, setFormData] = useState({
    name: "",
    logoFile: null, // Add logoFile state
    bannerFile: null, // Add bannerFile state
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include the formData state in your fetch request, which can be handled by your server.

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          // Your headers
        },
        body: JSON.stringify(formData), // Include the formData in the request
      });

      if (response.ok) {
        showSuccess();
        console.log("Email sent successfully");
        setTimeout(() => {
          setFormData({
            name: "",
            logoFile: null, // Reset the logoFile state
            bannerFile: null, // Reset the bannerFile state
          });
        }, 300);
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  return (
    <div className="flex md:flex-row ">
      <SideBar />
      <div className="flex mx-auto mt-28 lg:ms-96 flex-col">
        <div className="flex-col flex ">
          <div className="justify-center flex">
            {" "}
            <p className="text-6xl font-semibold text-sky-950 mb-4">
              {" "}
              إدارة الخدمات
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
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
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 mt-4 lg:mt-6 text-white px-4 py-2 rounded-full focus:outline-none"
            >
              إضافة
            </button>
            <Toaster />
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
                      {category.categoryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.categoryBanner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.categoryLogo}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <a
                        href="javascript:void()"
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
                      </a>
                      <button
                        href="javascript:void()"
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
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
