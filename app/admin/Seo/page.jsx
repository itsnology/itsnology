"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@components/sidebar";
import { IconX } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [keywords, setKeywords] = useState([]); // To store the uploaded keywords

  const showSuccess = () => {
    toast.success("Keyword added successfully");
  };
  const showDelete = () => {
    toast.success("Keyword Deleted successfully", {
      icon: "👏",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/Seo/addKeyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Inside the handleSubmit function
      if (response.ok) {
        showSuccess();

        // Update the keywords list with the newly added keyword
        const newKeyword = {
          id: response.id, // Replace 'response.id' with the actual ID if available
          name: formData.name,
        };
        setKeywords([...keywords, newKeyword]);

        // Clear the form input
        setFormData({ name: "" });
        window.location.reload();
      } else {
        console.error("Failed to add Keyword");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch existing keywords when the component mounts
    const fetchKeywords = async () => {
      try {
        const response = await fetch("/api/Seo/getKeyword", {
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          // Ensure data is an array and then extract the "name" and "id" fields
          if (Array.isArray(data)) {
            const keywordData = data.map((keyword) => ({
              id: keyword._id, // Store the ID of the keyword
              name: keyword.name,
            }));
            setKeywords(keywordData);
          } else {
            console.error("Fetched data is not an array");
          }
        } else {
          console.error("Failed to fetch Keywords");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchKeywords();
  }, []);

  const handleDeleteKeyword = async (index, id) => {
    try {
      const response = await fetch("/api/Seo/deleteKeyword", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Pass the keyword ID to delete
      });

      if (response.ok) {
        showDelete();
        const updatedKeywords = [...keywords];
        updatedKeywords.splice(index, 1);
        setKeywords(updatedKeywords);
      } else {
        console.error("Failed to delete the keyword");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex md:flex-row">
      <SideBar />
      <div className="flex flex-col mr-8">
        <div className="justify-center flex lg:mt-16 md:mt-16 mb-20 mt-20 lg:mr-96 md:mr-44">
          <p className="text-6xl font-semibold text-sky-950">إدارة ال Seo</p>
        </div>
        <div className="flex flex-col">
          <form method="POST" className="flex flex-row">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                الكلمة المفتاحية:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                className="w-full p-2 border rounded-full focus:outline-blue-400"
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 mt-6 mr-3 font-medium hover:bg-slate-700 rounded-full bg-slate-800 text-cyan-50"
            >
              إضافة
            </button>
            <Toaster />
          </form>
          <div className="flex flex-wrap mt-12">
            {keywords.map((keyword, index) => (
              <div className="relative mb-5 ml-6" key={index}>
                <p className="text-gray-600 font-medium p-4 rounded-md bg-gray-200 relative">
                  {keyword.name}
                </p>
                <IconX
                  className="w-4 h-4 absolute top-1 right-1 text-gray-700 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDeleteKeyword(index, keyword.id)} // Pass the 'id' parameter
                />
                <Toaster />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
